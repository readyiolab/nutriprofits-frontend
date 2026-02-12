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
  Info,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFetch } from "@/hooks";
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
    data: fetchedSettings,
    loading,
    refetch: refetchSettings,
  } = useFetch(
    `http://localhost:3001/api/backoffice/${backofficeId}/settings`,
    { immediate: true, showToast: false }
  );

  React.useEffect(() => {
    if (fetchedSettings && typeof fetchedSettings === "object") {
      const settingsData = fetchedSettings.settings || fetchedSettings;
      setSettings((prev) => ({ ...prev, ...settingsData }));
    }
  }, [fetchedSettings]);

  const handleSetupDomain = async () => {
    if (!customDomainInput.trim()) {
      toast.error("Please enter a domain name");
      return;
    }
    try {
      setSaving(true);
      const response = await fetch(
        `http://localhost:3001/api/backoffice/${backofficeId}/domain`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ customDomain: customDomainInput }),
        }
      );
      const result = await response.json();
      if (result.success) {
        toast.success("Domain setup initiated! Check your email for DNS instructions.");
        setDomainVerification(result.verification);
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
      const response = await fetch(
        `http://localhost:3001/api/backoffice/${backofficeId}/domain`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const result = await response.json();
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

  const getStatusBadge = (status) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-700">
            <CheckCircle className="h-3 w-3 mr-1" /> Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="h-3 w-3 mr-1" /> Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <AlertCircle className="h-3 w-3 mr-1" /> Not Started
          </Badge>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Domain Management</h1>
        <p className="text-gray-600 mt-1">Manage your subdomain and custom domain</p>
      </div>

      {/* Active Domain Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" />
              <div>
                <CardTitle>Currently Active Domain</CardTitle>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-700">
              {settings.domain_type === "custom_domain" ? "Custom Domain" : "Subdomain"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
            <Globe className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <code className="flex-1 text-sm font-mono font-semibold text-gray-900">
              {settings.active_url}
            </code>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(settings.active_url)}
              className="text-blue-600 hover:text-blue-700"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(settings.active_url, "_blank")}
              className="text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Subdomain Card */}
        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Your Subdomain
              </CardTitle>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                Always Active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-blue-200">
              <p className="text-xs text-gray-500 mb-2">Subdomain</p>
              <code className="text-sm font-mono font-bold text-gray-900 break-all">
                {settings.subdomain}
              </code>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Your subdomain is always available and working, even when using a custom domain. No additional setup required.
            </p>
            <Button
              variant="outline"
              onClick={() => window.open(`https://${settings.subdomain}`, "_blank")}
              className="w-full text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Visit Subdomain
            </Button>
          </CardContent>
        </Card>

        {/* Custom Domain Card */}
        <Card className={!settings.custom_domain ? "border-green-200 bg-gradient-to-br from-green-50 to-green-100" : "border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100"}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-600" />
              {settings.custom_domain ? "Custom Domain" : "Add Custom Domain"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!settings.custom_domain ? (
              <>
                <div className="text-center py-2">
                  <p className="text-sm text-gray-700 font-medium mb-3">
                    ✨ Make your store more professional with a custom domain
                  </p>
                  <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                    Connect your own domain (e.g., mystore.com) instead of using a subdomain
                  </p>
                </div>
                <Button
                  onClick={() => setSetupDomainOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Setup Custom Domain
                </Button>
              </>
            ) : (
              <>
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <p className="text-xs text-gray-500 mb-2">Domain</p>
                  <p className="text-sm font-mono font-bold text-gray-900 break-all mb-3">
                    {settings.custom_domain}
                  </p>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(settings.custom_domain_status)}
                  </div>
                </div>

                <Button
                  onClick={handleCheckDomain}
                  disabled={checkingDomain}
                  variant="outline"
                  className="w-full border-indigo-300 text-indigo-600 hover:bg-indigo-50"
                >
                  {checkingDomain ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Check Verification Status
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setRemoveDomainOpen(true)}
                  className="w-full text-red-600 border-red-300 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Domain
                </Button>
              </>
            )}
          </CardContent>
        </Card>

      </div>

      {/* Verification Steps - Only show if custom domain exists and not verified */}
      {settings.custom_domain && settings.custom_domain_status !== "verified" && domainVerification && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              Domain Verification in Progress
            </CardTitle>
            <CardDescription>
              Follow the steps below to complete your domain setup
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 font-semibold text-sm flex-shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">
                    Verify Domain Ownership
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Add this TXT record to your domain's DNS settings:
                  </p>
                  <div className="bg-white p-3 rounded border border-yellow-200 space-y-2 text-xs font-mono">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">Type:</span>
                      <code className="text-gray-900">TXT</code>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">Host:</span>
                      <div className="flex items-center justify-between gap-1">
                        <code className="text-gray-900">_igrowbig-verification</code>
                        <button
                          onClick={() => copyToClipboard("_igrowbig-verification")}
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="text-gray-500">Value:</span>
                      <div className="flex items-center justify-between gap-1">
                        <code className="text-gray-900 break-all">{domainVerification?.token || "Loading..."}</code>
                        <button
                          onClick={() => copyToClipboard(domainVerification?.token || "")}
                          className="text-yellow-600 hover:text-yellow-700 flex-shrink-0"
                        >
                          <Copy className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 - Provider Instructions */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">
                    Update DNS Records
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    Choose your domain registrar and follow the instructions:
                  </p>
                  <Tabs defaultValue="godaddy" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="godaddy" className="text-xs">GoDaddy</TabsTrigger>
                      <TabsTrigger value="namecheap" className="text-xs">Namecheap</TabsTrigger>
                      <TabsTrigger value="cloudflare" className="text-xs">Cloudflare</TabsTrigger>
                      <TabsTrigger value="google" className="text-xs">Google</TabsTrigger>
                    </TabsList>
                    
                    {/* GoDaddy */}
                    <TabsContent value="godaddy" className="space-y-2 mt-3">
                      <div className="bg-white p-3 rounded border border-indigo-200 space-y-2">
                        <p className="text-xs font-semibold text-gray-900">GoDaddy DNS Setup:</p>
                        <ol className="text-xs text-gray-600 space-y-1 ml-3 list-decimal">
                          <li>Go to <strong>GoDaddy.com</strong> and sign in</li>
                          <li>Navigate to <strong>Manage DNS</strong> for {settings.custom_domain}</li>
                          <li>Add a new <strong>TXT record</strong> with Host: <code className="bg-gray-100 px-1 rounded">_igrowbig-verification</code></li>
                          <li>Set Value to the token above</li>
                          <li>Save changes (takes 24-48 hours to propagate)</li>
                        </ol>
                      </div>
                    </TabsContent>

                    {/* Namecheap */}
                    <TabsContent value="namecheap" className="space-y-2 mt-3">
                      <div className="bg-white p-3 rounded border border-indigo-200 space-y-2">
                        <p className="text-xs font-semibold text-gray-900">Namecheap DNS Setup:</p>
                        <ol className="text-xs text-gray-600 space-y-1 ml-3 list-decimal">
                          <li>Login to <strong>Namecheap</strong></li>
                          <li>Go to <strong>Dashboard</strong> → <strong>Manage Domain</strong></li>
                          <li>Click <strong>Advanced DNS</strong> tab</li>
                          <li>Add <strong>TXT Record</strong>: Host <code className="bg-gray-100 px-1 rounded">_igrowbig-verification</code></li>
                          <li>Paste the token as the value</li>
                          <li>Click the green checkmark to save</li>
                        </ol>
                      </div>
                    </TabsContent>

                    {/* Cloudflare */}
                    <TabsContent value="cloudflare" className="space-y-2 mt-3">
                      <div className="bg-white p-3 rounded border border-indigo-200 space-y-2">
                        <p className="text-xs font-semibold text-gray-900">Cloudflare DNS Setup:</p>
                        <ol className="text-xs text-gray-600 space-y-1 ml-3 list-decimal">
                          <li>Login to <strong>Cloudflare</strong></li>
                          <li>Select your domain</li>
                          <li>Go to <strong>DNS</strong> section</li>
                          <li>Add new <strong>TXT</strong> record</li>
                          <li>Name: <code className="bg-gray-100 px-1 rounded">_igrowbig-verification</code></li>
                          <li>Content: Paste the token above</li>
                          <li>Save and wait for DNS propagation</li>
                        </ol>
                      </div>
                    </TabsContent>

                    {/* Google Domains */}
                    <TabsContent value="google" className="space-y-2 mt-3">
                      <div className="bg-white p-3 rounded border border-indigo-200 space-y-2">
                        <p className="text-xs font-semibold text-gray-900">Google Domains DNS Setup:</p>
                        <ol className="text-xs text-gray-600 space-y-1 ml-3 list-decimal">
                          <li>Go to <strong>domains.google.com</strong></li>
                          <li>Select your domain</li>
                          <li>Go to <strong>DNS</strong> on the left menu</li>
                          <li>Scroll to <strong>Custom Records</strong></li>
                          <li>Add <strong>TXT</strong> record with Name <code className="bg-gray-100 px-1 rounded">_igrowbig-verification</code></li>
                          <li>Add the token as the value</li>
                          <li>Click Create and wait for propagation</li>
                        </ol>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 font-semibold text-sm flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-gray-900 mb-2">
                    Verify & Complete
                  </h4>
                  <p className="text-xs text-gray-600 mb-3">
                    After DNS records are updated, click the button below to verify:
                  </p>
                  <Button
                    onClick={handleCheckDomain}
                    disabled={checkingDomain}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    {checkingDomain ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Verify Domain
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Success State */}
      {settings.custom_domain && settings.custom_domain_status === "verified" && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <CardTitle className="text-green-900">Domain Active & Working!</CardTitle>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Verified</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-800 mb-3">
              Your custom domain <strong>{settings.custom_domain}</strong> is now live and actively serving your store.
            </p>
            {domainVerification?.verified_at && (
              <p className="text-xs text-green-700">
                ✓ Verified on: {new Date(domainVerification.verified_at).toLocaleString()}
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Setup and Remove Dialogs */}

      {/* Setup Domain Dialog */}
      <Dialog open={setupDomainOpen} onOpenChange={setSetupDomainOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Setup Custom Domain</DialogTitle>
            <DialogDescription>
              Enter your custom domain name to begin verification
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="custom_domain">Domain Name</Label>
              <Input
                id="custom_domain"
                placeholder="example.com or www.example.com"
                value={customDomainInput}
                onChange={(e) => setCustomDomainInput(e.target.value)}
              />
              <p className="text-xs text-gray-500">Enter without http:// or https://</p>
            </div>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <p className="font-medium mb-2">Requirements:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Access to your domain's DNS settings</li>
                  <li>Email associated with this domain</li>
                  <li>15-60 minutes for verification</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSetupDomainOpen(false)}>Cancel</Button>
            <Button
              onClick={handleSetupDomain}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Setting up...
                </>
              ) : (
                <>Continue</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Remove Domain Dialog */}
      <Dialog open={removeDomainOpen} onOpenChange={setRemoveDomainOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Custom Domain</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove your custom domain?
            </DialogDescription>
          </DialogHeader>
          <Alert className="bg-red-50 border-red-200">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-700">
              <p className="font-medium mb-1">This action will:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Remove {settings.custom_domain}</li>
                <li>Revert to your subdomain: {settings.subdomain}</li>
                <li>Delete all DNS verification records</li>
              </ul>
            </AlertDescription>
          </Alert>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRemoveDomainOpen(false)}>Cancel</Button>
            <Button
              onClick={handleRemoveDomain}
              disabled={saving}
              className="bg-red-600 hover:bg-red-700"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove Domain
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detailed DNS Setup Guide Dialog */}
      <Dialog open={showDetailedGuide} onOpenChange={setShowDetailedGuide}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">Complete DNS Setup Guide</DialogTitle>
            <DialogDescription>
              Step-by-step instructions for common domain registrars
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* General Instructions */}
            <div className="space-y-3">
              <h3 className="font-medium text-lg">General Steps (Works for most providers)</h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">1</div>
                    <div>
                      <h4 className="font-semibold mb-1">Login to Your Domain Registrar</h4>
                      <p className="text-sm text-gray-700">
                        Go to the website where you purchased your domain (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">2</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Find DNS Management</h4>
                      <p className="text-sm text-gray-700 mb-2">Look for one of these sections:</p>
                      <ul className="text-xs space-y-1 text-gray-600">
                        <li>• "DNS Management" or "DNS Settings"</li>
                        <li>• "Manage DNS" or "DNS Records"</li>
                        <li>• "Advanced DNS" or "Zone Editor"</li>
                        <li>• "Domain Settings" → "DNS"</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">3</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Add the TXT Record (Verification)</h4>
                      <p className="text-sm text-gray-700 mb-2">Click "Add Record" and enter:</p>
                      <div className="bg-white p-3 rounded border space-y-2 text-sm">
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">Type:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded">TXT</code>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">Host:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded">_igrowbig-verification</code>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">Value:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all">
                            {domainVerification?.token || "your-verification-token"}
                          </code>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">TTL:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded">3600 (or 1 hour)</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">4</div>
                    <div>
                      <h4 className="font-semibold mb-1">Save & Wait for Verification</h4>
                      <p className="text-sm text-gray-700">
                        Click "Save" or "Add Record". Wait 5-60 minutes for verification. We'll email you when verified!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">5</div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">Add Pointing Record (After Verification)</h4>
                      <p className="text-sm text-gray-700 mb-2">Once verified, add ONE of these:</p>
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border">
                          <div className="font-semibold text-sm mb-2 text-green-700">Option A: CNAME (Easier)</div>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Type:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">CNAME</code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Host:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">@ (or leave blank)</code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Target:</span>
                              <code className="bg-blue-100 px-2 py-1 rounded font-semibold text-blue-700">{TARGET_DOMAIN}</code>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded border">
                          <div className="font-semibold text-sm mb-2">Option B: A Record</div>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Type:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">A</code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Host:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">@</code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">IP:</span>
                              <code className="bg-blue-100 px-2 py-1 rounded font-semibold text-blue-700">{SERVER_IP}</code>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Provider-Specific Guides */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-lg mb-4">Provider-Specific Instructions</h3>
              <div className="space-y-4">
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">GoDaddy</summary>
                  <div className="p-4 pt-0 text-sm space-y-2">
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to GoDaddy.com → My Products</li>
                      <li>Find your domain → click "DNS" or "Manage DNS"</li>
                      <li>Scroll to "Records" section</li>
                      <li>Click "Add" button</li>
                      <li>Select "TXT" from dropdown</li>
                      <li>Enter "_igrowbig-verification" in Name field</li>
                      <li>Paste verification token in Value field</li>
                      <li>Click "Save"</li>
                    </ol>
                  </div>
                </details>
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">Namecheap</summary>
                  <div className="p-4 pt-0 text-sm space-y-2">
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Login → Dashboard → Domain List</li>
                      <li>Click "Manage" next to your domain</li>
                      <li>Go to "Advanced DNS" tab</li>
                      <li>Click "Add New Record"</li>
                      <li>Type: TXT Record</li>
                      <li>Host: _igrowbig-verification</li>
                      <li>Value: [paste token]</li>
                      <li>Click green checkmark to save</li>
                    </ol>
                  </div>
                </details>
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">Cloudflare</summary>
                  <div className="p-4 pt-0 text-sm space-y-2">
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Login to Cloudflare dashboard</li>
                      <li>Select your domain</li>
                      <li>Click "DNS" in left sidebar</li>
                      <li>Click "Add record" button</li>
                      <li>Type: TXT</li>
                      <li>Name: _igrowbig-verification</li>
                      <li>Content: [paste token]</li>
                      <li>Proxy status: DNS only (gray cloud)</li>
                      <li>Click "Save"</li>
                    </ol>
                  </div>
                </details>
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">Google Domains</summary>
                  <div className="p-4 pt-0 text-sm space-y-2">
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to domains.google.com</li>
                      <li>Click on your domain</li>
                      <li>Go to "DNS" in left menu</li>
                      <li>Scroll to "Custom records"</li>
                      <li>Click "Create new record"</li>
                      <li>Host name: _igrowbig-verification</li>
                      <li>Type: TXT</li>
                      <li>Data: [paste token]</li>
                      <li>Click "Add"</li>
                    </ol>
                  </div>
                </details>
              </div>
            </div>

            {/* Common Issues */}
            <div className="border-t pt-6">
              <h3 className="font-medium text-lg mb-4">Common Issues & Solutions</h3>
              <div className="space-y-3">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">DNS not propagating?</AlertTitle>
                  <AlertDescription className="text-xs">
                    DNS changes can take 5 minutes to 48 hours. Check status at{" "}
                    <code className="bg-gray-100 px-1">whatsmydns.net</code>
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">Record not saving?</AlertTitle>
                  <AlertDescription className="text-xs">
                    Make sure to click "Save" or green checkmark. Some providers auto-save, others require explicit save.
                  </AlertDescription>
                </Alert>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">Wrong format error?</AlertTitle>
                  <AlertDescription className="text-xs">
                    Remove quotes around values. Some providers add them automatically, others reject them.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowDetailedGuide(false)} className="w-full sm:w-auto">
              Got it, thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DomainManagement;
