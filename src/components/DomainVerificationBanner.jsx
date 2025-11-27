import React, { useState } from 'react';
import { X, Clock, CheckCircle, XCircle, Copy, RefreshCw, Info, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useDomainVerification } from '@/contexts/DomainVerificationContext';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const DomainVerificationBanner = () => {
  const { domainVerification, showBanner, setShowBanner, refetchDomainStatus } = useDomainVerification();
  const [showDetailedGuide, setShowDetailedGuide] = useState(false);
  const [checkingDomain, setCheckingDomain] = useState(false);

  const SERVER_IP = '139.59.8.68';
  const TARGET_DOMAIN = 'igrowbig.com';

  if (!showBanner || !domainVerification) {
    return null;
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleCheckDomain = async () => {
    setCheckingDomain(true);
    await refetchDomainStatus();
    setCheckingDomain(false);
    toast.success('Domain status updated');
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };

  return (
    <>
      {/* Banner */}
      {domainVerification.status === 'pending' && (
        <Alert className="mx-4 mt-4 bg-yellow-50 border-yellow-300 relative">
          <button
            onClick={handleCloseBanner}
            className="absolute top-3 right-3 text-yellow-600 hover:text-yellow-700"
          >
            <X className="h-4 w-4" />
          </button>
          
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-900 font-semibold">
            ⏳ Domain Verification Pending
          </AlertTitle>
          <AlertDescription className="text-yellow-800 text-sm mt-2">
            <p className="mb-3">
              Your domain <strong>{domainVerification.domain}</strong> is pending verification. Follow the steps below to activate it.
            </p>
            
            <div className="space-y-4">
              {/* STEP 1: Verification */}
              <div className="bg-white rounded-lg border border-yellow-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-yellow-500 text-white text-xs font-bold">
                    1
                  </div>
                  <h4 className="font-bold text-gray-900">Verify Domain Ownership</h4>
                  <Badge className="bg-yellow-100 text-yellow-700 text-xs">Required First</Badge>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">
                  Add this TXT record to your DNS settings to prove you own the domain:
                </p>

                <div className="space-y-2 bg-gray-50 p-3 rounded border">
                  <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                    <span className="text-xs font-semibold text-gray-600">Record Type:</span>
                    <code className="bg-white px-2 py-1 rounded text-sm border">TXT</code>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                    <span className="text-xs font-semibold text-gray-600">Host/Name:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-white px-2 py-1 rounded text-xs border flex-1 break-all">
                        _igrowbig-verification
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard('_igrowbig-verification')}
                        className="flex-shrink-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 items-start">
                    <span className="text-xs font-semibold text-gray-600">Value:</span>
                    <div className="flex items-center gap-2">
                      <code className="bg-white px-2 py-1 rounded text-xs border flex-1 break-all">
                        {domainVerification?.token ?? 'Loading...'}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => domainVerification?.token && copyToClipboard(domainVerification.token)}
                        className="flex-shrink-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                    <span className="text-xs font-semibold text-gray-600">TTL:</span>
                    <code className="bg-white px-2 py-1 rounded text-sm border">3600</code>
                  </div>
                </div>

                <Button
                  onClick={() => setShowDetailedGuide(true)}
                  variant="outline"
                  size="sm"
                  className="mt-3 text-xs"
                >
                  <Info className="h-3 w-3 mr-1" />
                  How to add DNS records?
                </Button>

                <Button
                  onClick={handleCheckDomain}
                  disabled={checkingDomain}
                  size="sm"
                  className="mt-3 ml-2 text-xs bg-yellow-600 hover:bg-yellow-700"
                >
                  {checkingDomain ? (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3 w-3 mr-1" />
                      Check Now
                    </>
                  )}
                </Button>
              </div>

              {/* STEP 2: Point Domain */}
              <div className="bg-white rounded-lg border border-gray-300 p-4 opacity-60">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-xs font-bold">
                    2
                  </div>
                  <h4 className="font-bold text-gray-900">Point Your Domain</h4>
                  <Badge className="bg-gray-100 text-gray-600 text-xs">After Verification</Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  Once Step 1 is verified, add ONE of these records to point your domain:
                </p>

                <div className="space-y-3">
                  {/* Option A: CNAME */}
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-700 text-xs">Recommended</Badge>
                      <span className="font-semibold text-sm">Option A: CNAME Record</span>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">Record Type:</span>
                        <code className="bg-white px-2 py-1 rounded border">CNAME</code>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">Host/Name:</span>
                        <code className="bg-white px-2 py-1 rounded border">@ or www</code>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">Target/Value:</span>
                        <code className="bg-white px-2 py-1 rounded border font-semibold text-blue-600">{TARGET_DOMAIN}</code>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">TTL:</span>
                        <code className="bg-white px-2 py-1 rounded border">3600</code>
                      </div>
                    </div>
                  </div>

                  {/* Option B: A Record */}
                  <div className="bg-gray-50 p-3 rounded border">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">Alternative</Badge>
                      <span className="font-semibold text-sm">Option B: A Record</span>
                    </div>
                    <div className="space-y-2">
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">Record Type:</span>
                        <code className="bg-white px-2 py-1 rounded border">A</code>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">Host/Name:</span>
                        <code className="bg-white px-2 py-1 rounded border">@</code>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">IP Address:</span>
                        <code className="bg-white px-2 py-1 rounded border font-semibold text-blue-600">{SERVER_IP}</code>
                      </div>
                      <div className="grid grid-cols-[100px_1fr] gap-2 items-center text-sm">
                        <span className="text-gray-600">TTL:</span>
                        <code className="bg-white px-2 py-1 rounded border">3600</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-semibold text-sm text-blue-900 mb-2">⏱️ Expected Timeline:</p>
                <ul className="space-y-1 text-xs text-blue-800">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Step 1:</strong> DNS propagation takes 5-15 minutes (up to 48 hours)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Auto-verify:</strong> We check every few minutes automatically</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Step 2:</strong> Add after verification email is received</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span><strong>Final:</strong> Domain active within 24 hours of Step 2</span>
                  </li>
                </ul>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Failed Status Banner */}
      {domainVerification.status === 'failed' && (
        <Alert className="mx-4 mt-4 bg-red-50 border-red-300 relative">
          <button
            onClick={handleCloseBanner}
            className="absolute top-3 right-3 text-red-600 hover:text-red-700"
          >
            <X className="h-4 w-4" />
          </button>
          
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 font-semibold">Verification Failed</AlertTitle>
          <AlertDescription className="text-red-800 text-sm mt-2">
            <p className="mb-2">We couldn't verify your domain <strong>{domainVerification.domain}</strong>. Please check:</p>
            <ul className="list-disc list-inside space-y-1 text-sm mb-3">
              <li>DNS records are added correctly</li>
              <li>DNS has propagated (can take up to 48 hours)</li>
              <li>No typos in record values</li>
            </ul>
            <Button
              onClick={handleCheckDomain}
              size="sm"
              className="bg-red-600 hover:bg-red-700"
              disabled={checkingDomain}
            >
              {checkingDomain ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Retry Verification
                </>
              )}
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Detailed Guide Dialog */}
      <Dialog open={showDetailedGuide} onOpenChange={setShowDetailedGuide}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>How to Add DNS Records</DialogTitle>
            <DialogDescription>
              Step-by-step guide for popular DNS providers
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            <div>
              <h3 className="font-semibold text-lg mb-3">Popular DNS Providers:</h3>
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-bold mb-2">GoDaddy</h4>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    <li>Log in to your GoDaddy account</li>
                    <li>Go to "My Products" → "Domain"</li>
                    <li>Click "DNS" next to your domain</li>
                    <li>Click "Add" in the Records section</li>
                    <li>Enter the record type, host, and value as provided above</li>
                    <li>Save changes</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-bold mb-2">Cloudflare</h4>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    <li>Log in to your Cloudflare account</li>
                    <li>Select your domain</li>
                    <li>Go to "DNS" tab</li>
                    <li>Click "Add record"</li>
                    <li>Select type, fill in name and content</li>
                    <li>Set TTL to 3600 (1 hour)</li>
                    <li>Save</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-bold mb-2">Namecheap</h4>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    <li>Log in to Namecheap</li>
                    <li>Go to "Domain List"</li>
                    <li>Click "Manage" next to your domain</li>
                    <li>Go to "Advanced DNS" tab</li>
                    <li>Click "Add New Record"</li>
                    <li>Choose record type and enter details</li>
                    <li>Save</li>
                  </ol>
                </div>

                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-bold mb-2">Route 53 (AWS)</h4>
                  <ol className="space-y-2 text-sm list-decimal list-inside">
                    <li>Log in to AWS Console</li>
                    <li>Go to Route 53</li>
                    <li>Select your hosted zone</li>
                    <li>Click "Create record"</li>
                    <li>Enter record type, name, and value</li>
                    <li>Save</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                <strong>Tip:</strong> DNS changes can take 5-48 hours to propagate worldwide. Check back later if verification doesn't work immediately.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DomainVerificationBanner;
