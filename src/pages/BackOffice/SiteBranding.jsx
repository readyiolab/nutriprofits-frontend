import React, { useState } from "react";
import {
  Save,
  Loader,
  AlertCircle,
  Image as ImageIcon,
  Palette,
  FileText,
  Globe,
  Eye,
  Type,
  Upload,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks";
import api from "@/config/apiConfig";
import { toast } from "sonner";

const INITIAL_STATE = {
  site_name: "",
  site_tagline: "",
  site_description: "",
  primary_color: "#3b82f6",
  secondary_color: "#8b5cf6",
  accent_color: "#10b981",
  meta_title: "",
  meta_description: "",
  meta_keywords: "",
  logo_alt_text: "",
  logo_url: "",
  favicon_url: "",
  logo: null,
  favicon: null,
};

const ColorPicker = ({ label, value, onChange, description }) => (
  <div className="space-y-2">
    <Label className="text-sm font-medium">{label}</Label>
    <div className="flex items-center gap-3">
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200 p-1"
        />
      </div>
      <div className="flex-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-sm"
          placeholder="#000000"
        />
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
    </div>
  </div>
);

const PreviewCard = ({ formData }) => (
  <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
    <div className="px-4 py-3 bg-gray-50 border-b">
      <div className="flex items-center gap-2">
        <Eye className="h-4 w-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Live Preview</span>
      </div>
    </div>
    <div className="p-6 space-y-6">
      {/* Logo Preview */}
      <div className="flex items-center gap-4">
        {formData.logo_url || formData.logo ? (
          <img
            src={formData.logo instanceof File ? URL.createObjectURL(formData.logo) : formData.logo_url}
            alt={formData.logo_alt_text || "Logo"}
            className="h-12 w-auto object-contain"
          />
        ) : (
          <div
            className="h-12 w-12 rounded-lg flex items-center justify-center text-white font-bold text-xl"
            style={{ backgroundColor: formData.primary_color }}
          >
            {formData.site_name?.charAt(0) || "N"}
          </div>
        )}
        <div>
          <h3 className="font-bold text-lg" style={{ color: formData.primary_color }}>
            {formData.site_name || "Your Site Name"}
          </h3>
          {formData.site_tagline && (
            <p className="text-sm text-gray-500">{formData.site_tagline}</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Color Preview */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Brand Colors</p>
        <div className="flex gap-2">
          <div className="flex-1">
            <div
              className="h-12 rounded-lg shadow-sm"
              style={{ backgroundColor: formData.primary_color }}
            />
            <p className="text-xs text-center mt-1 text-gray-500">Primary</p>
          </div>
          <div className="flex-1">
            <div
              className="h-12 rounded-lg shadow-sm"
              style={{ backgroundColor: formData.secondary_color }}
            />
            <p className="text-xs text-center mt-1 text-gray-500">Secondary</p>
          </div>
          <div className="flex-1">
            <div
              className="h-12 rounded-lg shadow-sm"
              style={{ backgroundColor: formData.accent_color }}
            />
            <p className="text-xs text-center mt-1 text-gray-500">Accent</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Button Preview */}
      <div className="space-y-3">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Button Styles</p>
        <div className="flex gap-2 flex-wrap">
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all"
            style={{ backgroundColor: formData.primary_color }}
          >
            Primary
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all"
            style={{ backgroundColor: formData.secondary_color }}
          >
            Secondary
          </button>
          <button
            className="px-4 py-2 rounded-lg text-white text-sm font-medium transition-all"
            style={{ backgroundColor: formData.accent_color }}
          >
            Accent
          </button>
        </div>
      </div>
    </div>
  </div>
);

const SiteBranding = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [faviconPreview, setFaviconPreview] = useState(null);
  const [activeTab, setActiveTab] = useState("identity");

  const backofficeId = localStorage.getItem("backofficeId") || "1";

  const { data, loading, error, refetch } = useFetch(
    `/site/branding/${backofficeId}`,
    { immediate: true, showToast: false }
  );

  // Load API data into form
  React.useEffect(() => {
    const apiData = data?.data || data;
    if (!apiData) return;

    const d = apiData;
    setFormData({
      site_name: d.site_name || "",
      site_tagline: d.site_tagline || "",
      site_description: d.site_description || "",
      primary_color: d.primary_color || "#3b82f6",
      secondary_color: d.secondary_color || "#8b5cf6",
      accent_color: d.accent_color || "#10b981",
      meta_title: d.meta_title || "",
      meta_description: d.meta_description || "",
      meta_keywords: d.meta_keywords || "",
      logo_alt_text: d.logo_alt_text || "",
      logo_url: d.logo_url || "",
      favicon_url: d.favicon_url || "",
      logo: null,
      favicon: null,
    });

    setLogoPreview(null);
    setFaviconPreview(null);
  }, [data]);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((p) => ({ ...p, logo: file }));
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleFaviconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFormData((p) => ({ ...p, favicon: file }));
    setFaviconPreview(URL.createObjectURL(file));
  };

  const clearLogo = () => {
    setFormData((p) => ({ ...p, logo: null }));
    setLogoPreview(null);
  };

  const clearFavicon = () => {
    setFormData((p) => ({ ...p, favicon: null }));
    setFaviconPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.site_name.trim()) {
      return toast.error("Site name is required");
    }

    setSubmitting(true);
    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "logo" || key === "favicon") return;
      fd.append(key, formData[key] ?? "");
    });

    if (formData.logo) fd.append("logo", formData.logo);
    if (formData.favicon) fd.append("favicon", formData.favicon);

    try {
      const response = await api.post(`/site/branding/${backofficeId}`, fd);
      const res = response.data;

      if (res.success) {
        toast.success("Branding updated successfully!");
        setLogoPreview(null);
        setFaviconPreview(null);
        await refetch();
      } else {
        toast.error(res.message || "Failed to save branding");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Error:", err);
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading branding settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center shadow-lg">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Site Branding</h1>
                <p className="text-gray-500 text-sm">
                  Customize your site identity, colors, and SEO settings
                </p>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 shadow-lg"
              size="lg"
            >
              {submitting ? (
                <Loader className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Error */}
        {error && (
          <Card className="border-red-200 bg-red-50 mb-6 shadow-sm">
            <CardContent className="pt-6 flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Error loading data</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="xl:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6 bg-white p-1 rounded-xl shadow-sm border">
                <TabsTrigger value="identity" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  <Globe className="h-4 w-4 mr-2" />
                  Identity
                </TabsTrigger>
                <TabsTrigger value="media" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Media
                </TabsTrigger>
                <TabsTrigger value="seo" className="rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                  <FileText className="h-4 w-4 mr-2" />
                  SEO
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                {/* Identity Tab */}
                <TabsContent value="identity" className="mt-0">
                  <Card className="shadow-sm border-0 shadow-gray-200/50">
                    <CardHeader className="bg-gradient-to-r from-blue-50/50 to-transparent border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Type className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>Site Identity</CardTitle>
                          <CardDescription>Define your brand name and messaging</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          Site Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          value={formData.site_name}
                          onChange={(e) => setFormData({ ...formData, site_name: e.target.value })}
                          required
                          placeholder="e.g., NutriProfits"
                          className="h-12"
                        />
                        <p className="text-xs text-gray-500">
                          This appears in the header, browser tab, and emails
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Site Tagline</Label>
                        <Input
                          value={formData.site_tagline}
                          onChange={(e) => setFormData({ ...formData, site_tagline: e.target.value })}
                          placeholder="e.g., Your Health, Our Priority"
                          className="h-12"
                        />
                        <p className="text-xs text-gray-500">
                          A short phrase that describes your brand (shown below logo)
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Site Description</Label>
                        <Textarea
                          rows={4}
                          value={formData.site_description}
                          onChange={(e) => setFormData({ ...formData, site_description: e.target.value })}
                          placeholder="Describe your business, mission, and what makes you unique..."
                          className="resize-none"
                        />
                        <p className="text-xs text-gray-500">
                          Used in meta descriptions and about sections (150-160 characters recommended)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Media Tab */}
                <TabsContent value="media" className="mt-0 space-y-6">
                  {/* Logo Card */}
                  <Card className="shadow-sm border-0 shadow-gray-200/50">
                    <CardHeader className="bg-gradient-to-r from-green-50/50 to-transparent border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <CardTitle>Site Logo</CardTitle>
                          <CardDescription>Upload your brand logo</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Logo File</Label>
                            <div className="relative">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleLogoChange}
                                className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-medium hover:file:bg-blue-100"
                              />
                              <Upload className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <p className="text-xs text-gray-500">Recommended: PNG or SVG, max 2MB, transparent background preferred</p>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Logo Alt Text</Label>
                            <Input
                              value={formData.logo_alt_text}
                              onChange={(e) => setFormData({ ...formData, logo_alt_text: e.target.value })}
                              placeholder="e.g., NutriProfits Logo"
                            />
                            <p className="text-xs text-gray-500">For accessibility and SEO</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center min-h-[200px]">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Preview</p>
                          {logoPreview ? (
                            <div className="relative">
                              <img src={logoPreview} alt="Logo preview" className="max-h-32 object-contain" />
                              <button
                                onClick={clearLogo}
                                className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : formData.logo_url ? (
                            <div className="relative">
                              <img
                                src={formData.logo_url}
                                alt={formData.logo_alt_text || "Site logo"}
                                className="max-h-32 object-contain"
                              />
                              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700">
                                <Check className="h-3 w-3 mr-1" /> Saved
                              </Badge>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="h-20 w-20 bg-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
                                <ImageIcon className="h-10 w-10 text-gray-400" />
                              </div>
                              <p className="text-gray-500 text-sm">No logo uploaded</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Favicon Card */}
                  <Card className="shadow-sm border-0 shadow-gray-200/50">
                    <CardHeader className="bg-gradient-to-r from-orange-50/50 to-transparent border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-orange-100 rounded-lg flex items-center justify-center">
                          <ImageIcon className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <CardTitle>Favicon</CardTitle>
                          <CardDescription>Browser tab icon</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label className="text-sm font-medium">Favicon File</Label>
                            <div className="relative">
                              <Input
                                type="file"
                                accept="image/*"
                                onChange={handleFaviconChange}
                                className="h-12 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-orange-50 file:text-orange-700 file:font-medium hover:file:bg-orange-100"
                              />
                              <Upload className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            </div>
                            <p className="text-xs text-gray-500">Recommended: 32x32px or 64x64px ICO, PNG, or SVG</p>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center justify-center min-h-[150px]">
                          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-4">Preview</p>
                          {faviconPreview ? (
                            <div className="relative">
                              <img src={faviconPreview} alt="Favicon preview" className="h-16 w-16 object-contain rounded-lg" />
                              <button
                                onClick={clearFavicon}
                                className="absolute -top-2 -right-2 h-6 w-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </div>
                          ) : formData.favicon_url ? (
                            <div className="relative">
                              <img
                                src={formData.favicon_url}
                                alt="Site favicon"
                                className="h-16 w-16 object-contain rounded-lg"
                              />
                              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-green-100 text-green-700">
                                <Check className="h-3 w-3 mr-1" /> Saved
                              </Badge>
                            </div>
                          ) : (
                            <div className="text-center">
                              <div className="h-16 w-16 bg-gray-200 rounded-xl mx-auto mb-3 flex items-center justify-center">
                                <ImageIcon className="h-8 w-8 text-gray-400" />
                              </div>
                              <p className="text-gray-500 text-sm">No favicon uploaded</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* SEO Tab */}
                <TabsContent value="seo" className="mt-0">
                  <Card className="shadow-sm border-0 shadow-gray-200/50">
                    <CardHeader className="bg-gradient-to-r from-teal-50/50 to-transparent border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-teal-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-teal-600" />
                        </div>
                        <div>
                          <CardTitle>SEO & Meta Tags</CardTitle>
                          <CardDescription>Optimize for search engines</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Meta Title</Label>
                        <Input
                          value={formData.meta_title}
                          onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                          placeholder="e.g., NutriProfits - Health & Wellness Products"
                          className="h-12"
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">Shown in browser tabs and search results</p>
                          <Badge variant="outline" className="text-xs">
                            {formData.meta_title?.length || 0}/60
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Meta Description</Label>
                        <Textarea
                          rows={4}
                          value={formData.meta_description}
                          onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                          placeholder="Brief description that appears in search engine results..."
                          className="resize-none"
                        />
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500">Appears under your site title in search results</p>
                          <Badge variant="outline" className="text-xs">
                            {formData.meta_description?.length || 0}/160
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Meta Keywords</Label>
                        <Input
                          value={formData.meta_keywords}
                          onChange={(e) => setFormData({ ...formData, meta_keywords: e.target.value })}
                          placeholder="health, wellness, nutrition, supplements, vitamins"
                          className="h-12"
                        />
                        <p className="text-xs text-gray-500">
                          Comma-separated keywords (less important for modern SEO)
                        </p>
                      </div>

                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-sm font-medium text-blue-900 mb-2">SEO Preview</p>
                        <div className="bg-white rounded-lg p-4 shadow-sm">
                          <p className="text-blue-600 text-lg truncate" style={{ color: formData.primary_color }}>
                            {formData.meta_title || formData.site_name || "Your Site Title"}
                          </p>
                          <p className="text-green-600 text-sm">
                            https://yoursite.com
                          </p>
                          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                            {formData.meta_description || formData.site_description || "Your site description will appear here..."}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </form>
            </Tabs>
          </div>

          {/* Right Sidebar - Preview */}
          <div className="xl:col-span-1">
            <div className="sticky top-24 space-y-6">
              <PreviewCard formData={formData} />

              {/* Quick Stats */}
              <Card className="shadow-sm border-0 shadow-gray-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Completion Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Site Name</span>
                    {formData.site_name ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Logo</span>
                    {formData.logo_url || formData.logo ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Favicon</span>
                    {formData.favicon_url || formData.favicon ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Meta Title</span>
                    {formData.meta_title ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                  <Separator />
                  <p className="text-xs text-gray-500">
                    Complete all required fields (*) for better SEO and branding
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteBranding;