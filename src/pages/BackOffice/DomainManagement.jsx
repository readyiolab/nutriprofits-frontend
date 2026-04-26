import React from "react";
import {
  Loader2,
  Globe,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Copy,
  ExternalLink,
  Trash2,
  RefreshCw,
  Check,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import api from "@/config/apiConfig";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { useFetch } from "@/hooks";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useDomainVerification } from "@/contexts/DomainVerificationContext";

const DomainManagement = () => {
  const [saving, setSaving] = React.useState(false);
  const [setupDomainOpen, setSetupDomainOpen] = React.useState(false);
  const [removeDomainOpen, setRemoveDomainOpen] = React.useState(false);
  const [checkingDomain, setCheckingDomain] = React.useState(false);
  const [customDomainInput, setCustomDomainInput] = React.useState("");
  const [showDetailedGuide, setShowDetailedGuide] = React.useState(false);

  const {
    domainVerification,
    setDomainVerification,
    setShowBanner,
    refetchDomainStatus,
  } = useDomainVerification();

  const [settings, setSettings] = React.useState({
    subdomain: "",
    domain_type: "subdomain",
    primary_domain: "",
    custom_domain: null,
    custom_domain_status: "not_started",
    subdomain_url: "",
    custom_domain_url: null,
    active_url: "",
  });

  const SERVER_IP = "139.59.8.68";
  const TARGET_DOMAIN = "igrowbig.com";

  const backofficeId = React.useMemo(
    () => localStorage.getItem("backofficeId") || "1",
    []
  );

  const {
    data: fetchedProfile,
    loading,
    refetch: refetchProfile,
  } = useFetch(
    `/backoffice/profile`,
    { immediate: true, showToast: false }
  );

  const refetchSettings = refetchProfile;

  React.useEffect(() => {
    if (fetchedProfile) {
      setSettings((prev) => ({ ...prev, ...fetchedProfile }));
    }
  }, [fetchedProfile]);

  const handleSetupDomain = async () => {
    if (!customDomainInput.trim()) {
      toast.error("Please enter a domain name");
      return;
    }
    try {
      setSaving(true);
      const response = await api.post(`/domain/setup`, {
        domain: customDomainInput.trim(),
      });
      const result = response.data;
      if (result.success) {
        toast.success("Domain setup initiated! Check your email for DNS instructions.");
        setDomainVerification(result.data || result.verification);
        setShowBanner(true);
        setSetupDomainOpen(false);
        setCustomDomainInput("");
        refetchSettings();
      } else {
        toast.error(result.message || "Failed to setup domain");
      }
    } catch (error) {
      console.error("Error setting up domain:", error);
      toast.error("Failed to setup domain");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveDomain = async () => {
    try {
      setSaving(true);
      const response = await api.delete(`/domain/remove`);
      const result = response.data;
      if (result.success) {
        toast.success("Custom domain removed successfully!");
        setDomainVerification(null);
        setShowBanner(false);
        setRemoveDomainOpen(false);
        refetchSettings();
      } else {
        toast.error(result.message || "Failed to remove domain");
      }
    } catch (error) {
      console.error("Error removing domain:", error);
      toast.error("Failed to remove domain");
    } finally {
      setSaving(false);
    }
  };

  const handleCheckDomain = async () => {
    setCheckingDomain(true);
    await refetchDomainStatus();
    await refetchSettings();
    setCheckingDomain(false);
    toast.success("Domain status updated");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  // Helper to get verification token from various possible property names
  const getVerificationToken = () => {
    if (!domainVerification) return null;
    // Check multiple possible property names where token might be stored
    return domainVerification.token || 
           domainVerification.verification_token || 
           domainVerification.verificationToken ||
           domainVerification.dns_token ||
           domainVerification.data?.token ||
           domainVerification.value ||
           null;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 shadow-none font-medium px-2.5 py-0.5">
            <CheckCircle className="h-3.5 w-3.5 mr-1.5" /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-50 text-amber-700 border-amber-100 hover:bg-amber-50 shadow-none font-medium px-2.5 py-0.5">
            <Clock className="h-3.5 w-3.5 mr-1.5" /> Pending Verification
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-50 shadow-none font-medium px-2.5 py-0.5">
            <XCircle className="h-3.5 w-3.5 mr-1.5" /> Setup Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-slate-50 text-slate-600 border-slate-100 hover:bg-slate-50 shadow-none font-medium px-2.5 py-0.5">
            <AlertCircle className="h-3.5 w-3.5 mr-1.5" /> Not Started
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-[#0f766e]" />
        <p className="text-slate-500 font-medium animate-pulse">Loading domain settings...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 transition-all duration-500 font-t2-body">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight font-t2-heading">Domains</h1>
          <p className="text-slate-500 mt-1.5 text-lg">Manage how customers find your store online.</p>
        </div>
        <div className="flex items-center gap-3">
           {!settings.custom_domain && (
             <Button
                onClick={() => setSetupDomainOpen(true)}
                className="bg-[#0f766e] hover:bg-[#0d6d66] text-white shadow-sm px-6 rounded-lg font-semibold"
              >
                <Globe className="h-4 w-4 mr-2" />
                Connect existing domain
              </Button>
           )}
        </div>
      </div>

      {/* Primary Domain Section */}
      <Card className="border-slate-200 shadow-sm overflow-hidden bg-white">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 text-[#0f766e]">
              <Globe className="h-5 w-5" />
              <CardTitle className="text-base font-bold">Primary domain</CardTitle>
            </div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full uppercase tracking-widest">
                  {settings.domain_type === "custom_domain" ? "Custom" : "Standard"}
               </span>
               {settings.domain_type === "custom_domain" && getStatusBadge(settings.custom_domain_status)}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                 <h2 className="text-2xl font-bold text-slate-900 truncate max-w-md">
                   {settings.active_url.replace('https://', '').replace('/', '')}
                 </h2>
                 <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(settings.active_url)}
                    className="h-8 w-8 text-slate-400 hover:text-[#0f766e] hover:bg-slate-100 transition-colors rounded-lg"
                    title="Copy domain"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
              </div>
              <p className="text-slate-500 text-sm">Customers will see this domain in the browser address bar.</p>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <Button
                variant="outline"
                onClick={() => window.open(settings.active_url, "_blank")}
                className="flex-1 md:flex-none h-11 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
              >
                <ExternalLink className="h-4 w-4 mr-2 text-slate-400" />
                Visit Store
              </Button>
              <Button
                variant="outline"
                className="flex-1 md:flex-none h-11 border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold rounded-lg"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-4 w-4 mr-2 text-slate-400" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Domain Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        
        {/* Subdomain Card */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1 font-t2-heading">Base Domain</h3>
          <Card className="border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow duration-300 h-full overflow-hidden rounded-xl">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-[#0f766e]/5 rounded-xl border border-[#0f766e]/10">
                  <Globe className="h-6 w-6 text-[#0f766e]" />
                </div>
                <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 px-2.5 py-1 rounded-full uppercase tracking-widest">
                  Active
                </span>
              </div>
              
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subdomain URL</p>
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                   <code className="text-sm font-mono font-bold text-slate-700 break-all select-all">
                    {settings.subdomain}
                  </code>
                  <button 
                    onClick={() => copyToClipboard(settings.subdomain)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#0f766e]"
                    title="Copy subdomain"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed font-t2-body">
                This secure subdomain is provided by <span className="text-[#0f766e] font-semibold">NutriProfits</span> at no extra cost. It's always ready to use.
              </p>

              <Button
                variant="outline"
                onClick={() => window.open(`https://${settings.subdomain}`, "_blank")}
                className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-lg shadow-sm"
              >
                <ExternalLink className="h-4 w-4 mr-2 text-slate-400" />
                Open Subdomain
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Custom Domain Card */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 px-1 font-t2-heading">Custom Domain</h3>
          <Card className={`border-slate-200 shadow-sm bg-white hover:shadow-md transition-shadow duration-300 h-full rounded-xl flex flex-col ${!settings.custom_domain ? 'border-dashed border-2' : ''}`}>
            <CardContent className="p-6 h-full flex flex-col justify-between space-y-6">
              {!settings.custom_domain ? (
                <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 flex-1">
                  <div className="p-5 bg-indigo-50/50 rounded-full border border-indigo-100/50">
                    <Globe className="h-10 w-10 text-indigo-600 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-slate-900 font-t2-heading">Personalize your brand</h4>
                    <p className="text-sm text-slate-500 max-w-xs mx-auto font-t2-body">
                      Connect your own domain to build credibility and professional brand presence.
                    </p>
                  </div>
                  <Button
                    onClick={() => setSetupDomainOpen(true)}
                    className="w-full h-11 bg-[#0f766e] hover:bg-[#0d6d66] text-white shadow-lg shadow-emerald-50 transition-all active:scale-95 font-bold rounded-lg"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    Connect domain
                  </Button>
                </div>
              ) : (
                <div className="space-y-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between">
                    <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                      <Globe className="h-6 w-6 text-indigo-600" />
                    </div>
                    {getStatusBadge(settings.custom_domain_status)}
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Linked Domain</p>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 group">
                      <p className="text-sm font-mono font-bold text-slate-700 break-all select-all">
                        {settings.custom_domain}
                      </p>
                      <button 
                        onClick={() => copyToClipboard(settings.custom_domain)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#0f766e]"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
                    <Button
                      onClick={handleCheckDomain}
                      disabled={checkingDomain}
                      variant="outline"
                      className="h-11 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-lg shadow-sm"
                    >
                      {checkingDomain ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <RefreshCw className="h-4 w-4 mr-2 text-slate-400" />
                      )}
                      Sync Status
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setRemoveDomainOpen(true)}
                      className="h-11 border-rose-100 text-rose-600 hover:bg-rose-50 hover:border-rose-200 font-bold rounded-lg"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Verification Steps - Compact & Elegant Design */}
      {settings.custom_domain && settings.custom_domain_status !== "verified" && domainVerification && (
        <Card className="border-amber-200 shadow-sm bg-amber-50/30 mt-6 overflow-hidden rounded-xl">
          <div className="bg-amber-100/50 px-6 py-4 flex items-center justify-between border-b border-amber-200/50">
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-amber-600 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-amber-900">Verification Pending for {settings.custom_domain}</h3>
                <p className="text-xs text-amber-700">Add these DNS records to your provider to complete setup. Propagation takes 5-15 mins.</p>
              </div>
            </div>
            <Button
              onClick={handleCheckDomain}
              disabled={checkingDomain}
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white shadow-sm h-8 px-4 font-semibold"
            >
              {checkingDomain ? <Loader2 className="h-3 w-3 mr-1.5 animate-spin" /> : <Check className="h-3 w-3 mr-1.5" />}
              Verify Now
            </Button>
          </div>
          <CardContent className="p-0">
            <div className="divide-y divide-amber-100/50">
              {/* Record 1: TXT */}
              <div className="flex flex-col md:flex-row md:items-center py-4 px-6 hover:bg-white/50 transition-colors">
                <div className="w-56 mb-3 md:mb-0">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">TXT Record</span>
                  <p className="text-xs text-amber-600/80 mt-0.5">Required for ownership</p>
                </div>
                <div className="flex-1 flex gap-6">
                  <div className="w-1/3">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Name</span>
                    <code className="text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">_igrowbig-verification</code>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Value</span>
                    <div className="flex items-center gap-2 group max-w-full">
                      <code className="text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm truncate">{getVerificationToken() || "Loading..."}</code>
                      <button onClick={() => copyToClipboard(getVerificationToken() || "")} className="text-slate-400 hover:text-amber-600 transition-colors flex-shrink-0" title="Copy to clipboard">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Record 2: CNAME */}
              <div className="flex flex-col md:flex-row md:items-center py-4 px-6 hover:bg-white/50 transition-colors">
                <div className="w-56 mb-3 md:mb-0">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-widest">CNAME Record</span>
                  <p className="text-xs text-amber-600/80 mt-0.5">Points your domain to us</p>
                </div>
                <div className="flex-1 flex gap-6">
                  <div className="w-1/3">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Name</span>
                    <code className="text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm">@ or www</code>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block mb-1.5 font-semibold">Target</span>
                    <div className="flex items-center gap-2 group max-w-full">
                      <code className="text-xs font-mono font-medium text-slate-700 bg-white border border-slate-200 px-2 py-1 rounded shadow-sm truncate">igrowbig.com</code>
                      <button onClick={() => copyToClipboard("igrowbig.com")} className="text-slate-400 hover:text-amber-600 transition-colors flex-shrink-0" title="Copy to clipboard">
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success State */}
      {settings.custom_domain && settings.custom_domain_status === "verified" && (
        <Card className="border-emerald-100 shadow-xl shadow-emerald-50 bg-white relative overflow-hidden rounded-2xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-50 rounded-full -mr-24 -mt-24 opacity-60" />
          <CardHeader className="p-8 pb-4">
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shadow-inner">
                  <CheckCircle className="h-7 w-7 stroke-[2.5px]" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-900 font-t2-heading tracking-tight">Your domain is live!</CardTitle>
                  {domainVerification?.verified_at && (
                    <p className="text-slate-400 text-xs font-medium mt-0.5">
                      Successfully verified on {new Date(domainVerification.verified_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-50 shadow-none font-bold px-4 py-1.5 rounded-full uppercase tracking-widest text-[10px]">
                Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 pt-4 relative z-10">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between gap-4">
               <div className="space-y-1">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Global URL</p>
                 <p className="text-lg font-mono font-bold text-[#0f766e]">{settings.custom_domain}</p>
               </div>
               <Button
                  onClick={() => window.open(`https://${settings.custom_domain}`, "_blank")}
                  className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 h-11 px-6 rounded-xl font-bold shadow-sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2 text-slate-400" />
                  View Site
               </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Setup and Remove Dialogs */}

      {/* Setup Domain Dialog */}
      <Dialog open={setupDomainOpen} onOpenChange={setSetupDomainOpen}>
        <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden border-none shadow-2xl rounded-3xl">
          <DialogHeader className="p-8 bg-slate-50/50 border-b border-slate-100 text-left space-y-2">
            <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight font-t2-heading">Add a custom domain</DialogTitle>
            <DialogDescription className="text-slate-500 font-t2-body text-base">
              Establish your professional brand with a unique web address.
            </DialogDescription>
          </DialogHeader>
          <div className="p-8 space-y-6">
            <div className="space-y-3 font-t2-body">
              <Label htmlFor="custom_domain" className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Domain name</Label>
              <div className="relative group">
                <Input
                  id="custom_domain"
                  placeholder="e.g. yourstore.com"
                  value={customDomainInput}
                  onChange={(e) => setCustomDomainInput(e.target.value)}
                  className="h-14 text-lg font-mono border-slate-200 focus:ring-[#0f766e] group-hover:border-slate-300 transition-all rounded-2xl pl-12 shadow-sm"
                />
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-hover:text-[#0f766e] transition-colors" />
              </div>
              <p className="text-[10px] text-slate-400 font-medium pl-1">Don't include http:// or https://</p>
            </div>
            
            <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 flex gap-4 shadow-sm shadow-amber-50">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center border border-amber-200 shadow-sm flex-shrink-0">
                <AlertCircle className="h-6 w-6 text-amber-500" />
              </div>
              <div className="space-y-1.5 pt-0.5">
                <p className="text-sm font-bold text-amber-900">Immediate Verification</p>
                <p className="text-xs text-amber-800/70 leading-relaxed font-t2-body">
                  Once added, we'll provide a secret DNS token. You'll need access to your registrar's dashboard to complete setup.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter className="p-8 pt-2 flex items-center justify-end gap-3">
            <Button variant="ghost" onClick={() => setSetupDomainOpen(false)} className="text-slate-400 hover:text-slate-600 h-12 px-6 rounded-xl font-bold">Discard</Button>
            <Button
              onClick={handleSetupDomain}
              disabled={saving}
              className="bg-[#0f766e] hover:bg-[#0d6d66] text-white h-12 px-10 rounded-xl shadow-lg shadow-emerald-50 transition-all active:scale-95 font-bold"
            >
              {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Next Step"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Domain Dialog */}
      <Dialog open={removeDomainOpen} onOpenChange={setRemoveDomainOpen}>
        <DialogContent className="sm:max-w-[420px] p-0 border-none shadow-2xl rounded-3xl overflow-hidden">
          <div className="p-10 text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-rose-50 rounded-full flex items-center justify-center text-rose-500 mb-2 border border-rose-100/50 shadow-inner">
              <Trash2 className="h-12 w-12 stroke-[1.5px]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 font-t2-heading tracking-tight">Remove domain?</h3>
              <p className="text-slate-500 font-t2-body leading-relaxed text-sm">
                This will disconnect <span className="font-bold text-slate-700">{settings.custom_domain}</span>. Your store will revert to its original subdomain.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 w-full pt-2">
              <Button
                onClick={handleRemoveDomain}
                disabled={saving}
                className="w-full h-14 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl active:scale-95 transition-all shadow-lg shadow-rose-100"
              >
                {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : "Delete Domain Connection"}
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setRemoveDomainOpen(false)} 
                className="w-full h-12 text-slate-400 font-bold hover:text-slate-600 transition-colors"
              >
                Go back
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detailed DNS Setup Guide Dialog */}
      <Dialog open={showDetailedGuide} onOpenChange={setShowDetailedGuide}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] p-0 overflow-hidden border-none shadow-2xl rounded-3xl flex flex-col">
          <DialogHeader className="p-8 bg-slate-50/50 border-b border-slate-100 text-left space-y-2">
            <div className="flex items-center gap-3 text-[#0f766e]">
              <div className="p-2 bg-emerald-50 rounded-lg">
                <Globe className="h-6 w-6" />
              </div>
              <DialogTitle className="text-2xl font-bold text-slate-900 tracking-tight font-t2-heading">Detailed DNS Setup Guide</DialogTitle>
            </div>
            <DialogDescription className="text-slate-500 font-t2-body text-base">
              Follow these provider-specific steps to link your domain.
            </DialogDescription>
          </DialogHeader>

          <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
            {/* Verification details recap */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Type</p>
                <p className="text-sm font-bold text-slate-700">TXT Record</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Host</p>
                <p className="text-sm font-mono font-bold text-slate-700">_igrowbig-verification</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value</p>
                <p className="text-xs font-mono font-bold text-[#0f766e] truncate">{getVerificationToken() || "[Verification Token]"}</p>
              </div>
            </div>

            {/* Provider-Specific Guides */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-lg mb-4">Provider-Specific Instructions</h3>
              <div className="space-y-4">
                {[
                  { name: "GoDaddy", steps: ["Login → Domain Portfolio", "Select domain → Edit DNS", "Add TXT record: host '_igrowbig-verification', value '[token]'", "Save & wait 10 mins"] },
                  { name: "Namecheap", steps: ["Login → Dashboard → Domain List", "Manage → Advanced DNS tab", "Add TXT Record: host '_igrowbig-verification', value '[token]'", "Click green checkmark to save"] },
                  { name: "Cloudflare", steps: ["Select domain → DNS section", "Add record → Type 'TXT'", "Name: '_igrowbig-verification', Content: '[token]'", "Proxy status: Off (gray cloud)"] },
                  { name: "Google Domains", steps: ["Select domain → DNS menu", "Custom records → Create new record", "Host: '_igrowbig-verification', Type: 'TXT', Data: '[token]'", "Click 'Add'"] }
                ].map((prov, idx) => (
                  <details key={idx} className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-[#0f766e]/30 transition-all shadow-sm">
                    <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-slate-700 hover:bg-slate-50 transition-colors select-none">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-open:bg-[#0f766e] group-open:text-white transition-colors text-xs">
                           {idx + 1}
                         </div>
                         {prov.name}
                      </div>
                      <ChevronDown className="h-5 w-5 text-slate-400 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="px-5 pb-6 pt-2 animate-in slide-in-from-top-1 duration-300">
                      <ol className="space-y-3 font-t2-body">
                        {prov.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-500">
                            <span className="text-[#0f766e] font-bold">•</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </details>
                ))}
              </div>
            </div>
            {/* Common Issues */}
            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-px bg-slate-200" /> Need Help?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <div className="p-5 bg-rose-50 rounded-2xl border border-rose-100 space-y-2">
                   <p className="text-sm font-bold text-rose-900">Record not saving?</p>
                   <p className="text-xs text-rose-800/70 leading-relaxed font-t2-body">Make sure to click the "Save" or checkmark icon. Some providers require explicit confirmation for DNS changes.</p>
                 </div>
                 <div className="p-5 bg-amber-50 rounded-2xl border border-amber-100 space-y-2">
                   <p className="text-sm font-bold text-amber-900">Propagation Time</p>
                   <p className="text-xs text-amber-800/70 leading-relaxed font-t2-body">DNS updates usually take 15-60 minutes, but can take up to 48 hours for global synchronization.</p>
                 </div>
              </div>
            </div>
          </div>

          <DialogFooter className="p-8 pt-4 bg-slate-50/50 border-t border-slate-100">
            <Button 
                onClick={() => setShowDetailedGuide(false)} 
                className="w-full h-12 bg-[#0f766e] hover:bg-[#0d6d66] text-white font-bold rounded-xl shadow-lg shadow-emerald-50 transition-all active:scale-95"
            >
              Done, I've updated my records
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainManagement;
