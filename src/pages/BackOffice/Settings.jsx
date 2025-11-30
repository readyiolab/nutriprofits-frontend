import React from "react";
import {
  Save,
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
  ChevronRight,
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
import { Toaster, toast } from "sonner";
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

const Settings = () => {
  const [saving, setSaving] = React.useState(false);
  const [setupDomainOpen, setSetupDomainOpen] = React.useState(false);
  const [removeDomainOpen, setRemoveDomainOpen] = React.useState(false);
  const [checkingDomain, setCheckingDomain] = React.useState(false);
  const [customDomainInput, setCustomDomainInput] = React.useState("");
  const [showDetailedGuide, setShowDetailedGuide] = React.useState(false);

  // Use global domain verification context
  const {
    domainVerification,
    setDomainVerification,
    setShowBanner,
    refetchDomainStatus,
  } = useDomainVerification();

  const [settings, setSettings] = React.useState({
    name: "",
    email: "",
    store_name: "",
    subdomain: "",
    template_id: "",
    subscription_plan: "",
    status: "",
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

  const backofficeId = React.useMemo(() => {
    return localStorage.getItem("backofficeId") || "1";
  }, []);

  // Fetch settings using custom hook
  const {
    data: fetchedSettings,
    loading,
    refetch: refetchSettings,
  } = useFetch(
    `http://localhost:3001/api/backoffice/${backofficeId}/settings`,
    { immediate: true, showToast: false }
  );

  // Update settings when fetched
  React.useEffect(() => {
    console.log("Fetched Settings:", fetchedSettings);
    if (fetchedSettings && typeof fetchedSettings === "object") {
      // API returns { success, message, settings: {...} }
      const settingsData = fetchedSettings.settings || fetchedSettings;
      setSettings((prevSettings) => ({
        ...prevSettings,
        ...settingsData,
      }));
    }
  }, [fetchedSettings]);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);

      const updateData = {
        name: settings.name,
        store_name: settings.store_name,
      };

      const response = await fetch(
        `http://localhost:3001/api/backoffice/${backofficeId}/settings`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in request
          body: JSON.stringify(updateData),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Settings saved successfully!");
        setSettings(result.settings);
        refetchSettings();
      } else {
        toast.error(result.message || "Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

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
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies in request
          body: JSON.stringify({ customDomain: customDomainInput }),
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success(
          "Domain setup initiated! Check your email for DNS instructions."
        );
        setDomainVerification(result.verification);
        setShowBanner(true); // Show banner when domain is set up
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
          credentials: "include", // Include cookies in request
        }
      );

      const result = await response.json();

      if (result.success) {
        toast.success("Custom domain removed successfully!");
        setDomainVerification(null);
        setShowBanner(false); // Hide banner when domain is removed
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
            <CheckCircle className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-700">
            <AlertCircle className="h-3 w-3 mr-1" />
            Not Started
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
      <Toaster position="top-right" />

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account and domain settings
        </p>
      </div>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your basic account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={settings.name ?? ""}
                onChange={(e) =>
                  setSettings({ ...settings, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={settings.email ?? ""}
                disabled
                className="bg-gray-50"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="store_name">Store Name</Label>
            <Input
              id="store_name"
              value={settings.store_name ?? ""}
              onChange={(e) =>
                setSettings({ ...settings, store_name: e.target.value })
              }
              placeholder="Enter your store name"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Subscription Plan</Label>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-700 text-sm py-1.5 px-3">
                  {settings.subscription_plan || "Free"}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Account Status</Label>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    settings.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }
                >
                  {settings.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t">
            <Button
              onClick={handleSaveSettings}
              disabled={saving}
              className="bg-blue-500 hover:bg-blue-700"
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Domain Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Domain Management
              </CardTitle>
              <CardDescription>
                Manage your subdomain and custom domain
              </CardDescription>
            </div>
            {settings.custom_domain && (
              <Button
                onClick={handleCheckDomain}
                disabled={checkingDomain}
                variant="outline"
                size="sm"
              >
                {checkingDomain ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Check Status
                  </>
                )}
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Active Domain */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Active Domain</Label>
              <Badge className="bg-purple-100 text-purple-700">
                {settings.domain_type === "custom_domain"
                  ? "Custom Domain"
                  : "Subdomain"}
              </Badge>
            </div>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Globe className="h-4 w-4 text-gray-500" />
              <code className="flex-1 text-sm font-mono">
                {settings.active_url}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(settings.active_url)}
              >
                <Copy className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(settings.active_url, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Subdomain Section */}
          <div className="space-y-3 p-4 border rounded-lg bg-blue-50">
            <div className="flex items-center justify-between">
              <Label className="font-semibold">Your Subdomain</Label>
              <Badge variant="outline" className="text-xs">
                Always Active
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <code className="bg-white px-3 py-1.5 rounded border">
                {settings.subdomain}
              </code>
            </div>
            <p className="text-xs text-gray-500">
              Your subdomain is always available even when using a custom domain
            </p>
          </div>

          {/* Custom Domain Setup */}
          {!settings.custom_domain ? (
            <Alert className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <Globe className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-900">
                Ready to use your own domain?
              </AlertTitle>
              <AlertDescription>
                <p className="mb-3 text-blue-800">
                  Connect your custom domain to make your store more
                  professional and memorable.
                </p>
                <Button
                  onClick={() => setSetupDomainOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Setup Custom Domain
                </Button>
              </AlertDescription>
            </Alert>
          ) : (
            <div className="space-y-4">
              {/* Custom Domain Info */}
              <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <Label className="font-semibold text-base text-blue-900">
                      Custom Domain
                    </Label>
                    <p className="text-sm text-black mt-1 font-bold">
                      {settings.custom_domain}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(settings.custom_domain_status)}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setRemoveDomainOpen(true)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Verification Status */}
                {domainVerification && (
                  <>
                    {/* Show detailed instructions if custom domain exists and is NOT verified */}
                    {settings.custom_domain &&
                      settings.custom_domain_status !== "verified" && (
                        <Alert className=" mt-4">
                          <Clock className="h-4 w-4 text-black" />
                          <AlertTitle className="text-black font-semibold">
                            Verification In Progress
                          </AlertTitle>
                          <AlertDescription className="text-black">
                            <p className="mb-4">
                              Your domain{" "}
                              <strong>{settings.custom_domain}</strong> is being
                              verified. Follow the steps below:
                            </p>

                            {/* STEP 1: Always show if not verified */}
                            <div className="bg-white rounded-lg border border-black p-4 mb-4">
                              <div className="flex items-center gap-2 mb-3">
                                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-black text-white text-xs font-bold">
                                  1
                                </div>
                                <h4 className="font-bold text-gray-900">
                                  Verify Domain Ownership (Required)
                                </h4>
                                <Badge className="bg-yellow-100 text-yellow-700 text-xs">
                                  {domainVerification?.token
                                    ? "In Progress"
                                    : "Not Started"}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-700 mb-3">
                                Add this TXT record to your domain's DNS
                                settings:
                              </p>

                              <div className="space-y-2 bg-gray-50 p-3 rounded border text-sm">
                                <div className="grid grid-cols-[100px_1fr] gap-2">
                                  <span className="font-semibold text-gray-600">
                                    Type:
                                  </span>
                                  <code className="bg-white px-2 py-1 rounded border">
                                    TXT
                                  </code>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                                  <span className="font-semibold text-gray-600">
                                    Host:
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <code className="bg-white px-2 py-1 rounded border">
                                      _igrowbig-verification
                                    </code>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        copyToClipboard(
                                          "_igrowbig-verification"
                                        )
                                      }
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                                  <span className="font-semibold text-gray-600">
                                    Value:
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <code className="bg-white px-2 py-1 rounded border break-all">
                                      {domainVerification?.token ||
                                        "Waiting for verification token..."}
                                    </code>
                                    {domainVerification?.token && (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          copyToClipboard(
                                            domainVerification.token
                                          )
                                        }
                                      >
                                        <Copy className="h-3 w-3" />
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {domainVerification?.token ? (
                                <p className="text-xs text-amber-700 mt-3">
                                  TXT record detected! Waiting for DNS
                                  propagation...
                                </p>
                              ) : (
                                <p className="text-xs text-gray-500 mt-3">
                                  Verification token will appear here after you
                                  start setup.
                                </p>
                              )}

                              <Button
                                onClick={() => setShowDetailedGuide(true)}
                                variant="outline"
                                size="sm"
                                className="mt-3 text-xs"
                              >
                                <Info className="h-3 w-3 mr-1" />
                                How to add DNS records?
                              </Button>
                            </div>

                            {/* Step 2: Show only after token exists (meaning ownership verified) */}
                            {domainVerification?.token && (
                              <div className="bg-white rounded-lg border border-green-200 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold">
                                    2
                                  </div>
                                  <h4 className="font-bold text-gray-900">
                                    Point Your Domain to Our Server
                                  </h4>
                                  <Badge className="bg-green-100 text-green-700 text-xs">
                                    Ready
                                  </Badge>
                                </div>

                                <p className="text-sm text-gray-700 mb-3">
                                  Now add <strong>one</strong> of these records
                                  to make your domain live:
                                </p>

                                {/* CNAME Option */}
                                <div className="bg-green-50 p-3 rounded border mb-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge className="bg-green-100 text-green-700 text-xs">
                                      Recommended
                                    </Badge>
                                    <span className="font-semibold text-sm">
                                      CNAME Record
                                    </span>
                                  </div>
                                  <div className="text-sm space-y-1">
                                    <div>
                                      <strong>Host:</strong> @
                                    </div>
                                    <div>
                                      <strong>Target:</strong>{" "}
                                      <code className="bg-white px-2 py-1 rounded border font-medium">
                                        {TARGET_DOMAIN}
                                      </code>
                                    </div>
                                  </div>
                                </div>

                                {/* A Record Option */}
                                <div className="bg-gray-50 p-3 rounded border">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Alternative
                                    </Badge>
                                    <span className="font-semibold text-sm">
                                      A Record
                                    </span>
                                  </div>
                                  <div className="text-sm space-y-1">
                                    <div>
                                      <strong>Host:</strong> @
                                    </div>
                                    <div>
                                      <strong>IP:</strong>{" "}
                                      <code className="bg-white px-2 py-1 rounded border font-medium">
                                        {SERVER_IP}
                                      </code>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 text-sm">
                              <p className="font-semibold text-blue-900 mb-2">
                                Expected Timeline:
                              </p>
                              <ul className="space-y-1 text-xs text-blue-800">
                                <li>• DNS changes: 5 mins – 48 hours</li>
                                <li>
                                  • We check every 5 minutes automatically
                                </li>
                                <li>
                                  • You’ll get an email when fully active!
                                </li>
                              </ul>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <Button
                                onClick={handleCheckDomain}
                                size="sm"
                                disabled={checkingDomain}
                              >
                                {checkingDomain ? (
                                  <>Checking...</>
                                ) : (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1" />
                                    Check Status Now
                                  </>
                                )}
                              </Button>
                            </div>
                          </AlertDescription>
                        </Alert>
                      )}

                    {/* Show success message only when fully verified */}
                    {settings.custom_domain_status === "verified" && (
                      <Alert className="bg-green-50 border-green-300 mt-4">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-900 font-semibold">
                          Domain Active & Working!
                        </AlertTitle>
                        <AlertDescription className="text-green-800">
                          <p>
                            Your custom domain{" "}
                            <strong>{settings.custom_domain}</strong> is now
                            live!
                          </p>
                          {domainVerification?.verified_at && (
                            <p>
                              {" "}
                              Verified on:{" "}
                              {new Date(
                                domainVerification.verified_at
                              ).toLocaleString()}
                            </p>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}

                    {domainVerification.status === "verified" && (
                      <Alert className="bg-green-50 border-green-300 mt-4">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertTitle className="text-green-900 font-semibold">
                          🎉 Domain Verified & Active!
                        </AlertTitle>
                        <AlertDescription className="text-green-800">
                          <p>
                            Your custom domain is now live and working
                            correctly.
                          </p>
                          {domainVerification?.verified_at && (
                            <p className="text-xs mt-2 text-green-700">
                              ✓ Verified on:{" "}
                              {new Date(
                                domainVerification.verified_at
                              ).toLocaleString()}
                            </p>
                          )}
                        </AlertDescription>
                      </Alert>
                    )}

                    {domainVerification.status === "failed" && (
                      <Alert className="bg-red-50 border-red-300 mt-4">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <AlertTitle className="text-red-900 font-semibold">
                          Verification Failed
                        </AlertTitle>
                        <AlertDescription className="text-red-800">
                          <p className="mb-2">
                            We couldn't verify your domain. Please check:
                          </p>
                          <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>DNS records are added correctly</li>
                            <li>
                              DNS has propagated (can take up to 48 hours)
                            </li>
                            <li>No typos in record values</li>
                          </ul>
                          <Button
                            onClick={handleCheckDomain}
                            size="sm"
                            className="mt-3 bg-red-600 hover:bg-red-700"
                          >
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Retry Verification
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

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
              <p className="text-xs text-gray-500">
                Enter without http:// or https://
              </p>
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
            <Button variant="outline" onClick={() => setSetupDomainOpen(false)}>
              Cancel
            </Button>
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
            <Button
              variant="outline"
              onClick={() => setRemoveDomainOpen(false)}
            >
              Cancel
            </Button>
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
            <DialogTitle className="text-xl">
               Complete DNS Setup Guide
            </DialogTitle>
            <DialogDescription>
              Step-by-step instructions for common domain registrars
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* General Instructions */}
            <div className="space-y-3">
              <h3 className="font-medium text-lg">
                 General Steps (Works for most providers)
              </h3>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Login to Your Domain Registrar
                      </h4>
                      <p className="text-sm text-gray-700">
                        Go to the website where you purchased your domain
                        (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">
                      2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">
                        Find DNS Management
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Look for one of these sections:
                      </p>
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
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">
                      3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">
                        Add the TXT Record (Verification)
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Click "Add Record" and enter:
                      </p>
                      <div className="bg-white p-3 rounded border space-y-2 text-sm">
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">Type:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            TXT
                          </code>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">Host:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            _igrowbig-verification
                          </code>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">Value:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded text-xs break-all">
                            {domainVerification?.token ||
                              "your-verification-token"}
                          </code>
                        </div>
                        <div className="grid grid-cols-[80px_1fr] gap-2">
                          <span className="font-semibold">TTL:</span>
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            3600 (or 1 hour)
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">
                        Save & Wait for Verification
                      </h4>
                      <p className="text-sm text-gray-700">
                        Click "Save" or "Add Record". Wait 5-60 minutes for
                        verification. We'll email you when verified!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold flex-shrink-0">
                      5
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">
                        Add Pointing Record (After Verification)
                      </h4>
                      <p className="text-sm text-gray-700 mb-2">
                        Once verified, add ONE of these:
                      </p>

                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border">
                          <div className="font-semibold text-sm mb-2 text-green-700">
                            ✓ Option A: CNAME (Easier)
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Type:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">
                                CNAME
                              </code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Host:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">
                                @ (or leave blank)
                              </code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Target:</span>
                              <code className="bg-blue-100 px-2 py-1 rounded font-semibold text-blue-700">
                                {TARGET_DOMAIN}
                              </code>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded border">
                          <div className="font-semibold text-sm mb-2">
                            Option B: A Record
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Type:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">
                                A
                              </code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">Host:</span>
                              <code className="bg-gray-100 px-2 py-1 rounded">
                                @
                              </code>
                            </div>
                            <div className="grid grid-cols-[80px_1fr] gap-2">
                              <span className="font-semibold">IP:</span>
                              <code className="bg-blue-100 px-2 py-1 rounded font-semibold text-blue-700">
                                {SERVER_IP}
                              </code>
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
              <h3 className="font-medium text-lg mb-4">
                 Provider-Specific Instructions
              </h3>

              <div className="space-y-4">
                {/* GoDaddy */}
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">
                    GoDaddy
                  </summary>
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

                {/* Namecheap */}
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">
                    Namecheap
                  </summary>
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

                {/* Cloudflare */}
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">
                    Cloudflare
                  </summary>
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

                {/* Google Domains */}
                <details className="bg-gray-50 border rounded-lg">
                  <summary className="cursor-pointer p-4 font-semibold hover:bg-gray-100">
                    Google Domains
                  </summary>
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
              <h3 className="font-medium text-lg mb-4">
                 Common Issues & Solutions
              </h3>

              <div className="space-y-3">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">
                    DNS not propagating?
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    DNS changes can take 5 minutes to 48 hours. Check status at{" "}
                    <code className="bg-gray-100 px-1">whatsmydns.net</code>
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">
                    Record not saving?
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    Make sure to click "Save" or green checkmark. Some providers
                    auto-save, others require explicit save.
                  </AlertDescription>
                </Alert>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="text-sm font-semibold">
                    Wrong format error?
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    Remove quotes around values. Some providers add them
                    automatically, others reject them.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => setShowDetailedGuide(false)}
              className="w-full sm:w-auto"
            >
              Got it, thanks!
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Settings;
