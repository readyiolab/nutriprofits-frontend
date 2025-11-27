import React from "react";
import {
  Save,
  Loader,
  AlertCircle,
  Image as ImageIcon,
  Palette,
  FileText,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

const INITIAL_STATE = {
  site_name: "",
  site_tagline: "",
  site_description: "",
  primary_color: "#3b82f6",
  secondary_color: "#8b5cf6",

  meta_title: "",
  meta_description: "",
  meta_keywords: "",

  logo_alt_text: "",
  logo_url: "",
  favicon_url: "",

  logo: null,
  favicon: null,
};

const SiteBranding = () => {
  const [formData, setFormData] = React.useState(INITIAL_STATE);
  const [submitting, setSubmitting] = React.useState(false);

  const [logoPreview, setLogoPreview] = React.useState(null);
  const [faviconPreview, setFaviconPreview] = React.useState(null);

  const { data, loading, error, refetch } = useFetch(
    "http://localhost:3001/api/backoffice/branding",
    { immediate: true, showToast: false }
  );

  // Load API data into form
  React.useEffect(() => {
    console.log("🔍 Raw data received:", data);
    
    // Handle both possible data structures
    const apiData = data?.data || data;
    
    if (!apiData) {
      console.log("⚠️ No data to load");
      return;
    }

    console.log("📥 Loading data from API:", apiData);

    const d = apiData;

    setFormData({
      site_name: d.site_name || "",
      site_tagline: d.site_tagline || "",
      site_description: d.site_description || "",
      primary_color: d.primary_color || "#3b82f6",
      secondary_color: d.secondary_color || "#8b5cf6",

      meta_title: d.meta_title || "",
      meta_description: d.meta_description || "",
      meta_keywords: d.meta_keywords || "",

      logo_alt_text: d.logo_alt_text || "",
      logo_url: d.logo_url || "",
      favicon_url: d.favicon_url || "",

      logo: null,
      favicon: null,
    });

    // Clear previews when data loads from server
    setLogoPreview(null);
    setFaviconPreview(null);
  }, [data]);

  // File: Logo
  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((p) => ({ ...p, logo: file }));
    setLogoPreview(URL.createObjectURL(file));
  };

  // File: Favicon
  const handleFaviconChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((p) => ({ ...p, favicon: file }));
    setFaviconPreview(URL.createObjectURL(file));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.site_name.trim()) {
      return toast.error("Site name is required");
    }

    setSubmitting(true);

    const fd = new FormData();

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      if (key === "logo" || key === "favicon") return;
      fd.append(key, formData[key] ?? "");
    });

    // Append files only if new ones are selected
    if (formData.logo) fd.append("logo", formData.logo);
    if (formData.favicon) fd.append("favicon", formData.favicon);

    try {
      const response = await fetch(
        "http://localhost:3001/api/backoffice/branding",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: fd,
        }
      );

      const res = await response.json();

      console.log("📤 Server response:", res);

      if (res.success) {
        toast.success("Branding updated successfully!");

        // Clear file inputs and previews
        setLogoPreview(null);
        setFaviconPreview(null);

        // Force refetch from server
        console.log("🔄 Refetching data...");
        const refetchResult = await refetch();
        console.log("✅ Refetch complete:", refetchResult);
      } else {
        toast.error(res.message || "Failed to save branding");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("❌ Error:", err);
    }

    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Site Branding</h1>
          <p className="text-gray-600 mt-2">
            Manage your site logo, colors, and SEO settings
          </p>
        </div>

        <Button
          className="bg-blue-600 hover:bg-blue-700"
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? (
            <Loader className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

     

      {/* ERROR */}
      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6 flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <div>
              <h3 className="font-semibold text-red-900">Error loading data</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* SITE IDENTITY */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" /> Site Identity
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Site Name *</Label>
                  <Input
                    value={formData.site_name}
                    onChange={(e) =>
                      setFormData({ ...formData, site_name: e.target.value })
                    }
                    required
                    placeholder="Example: MyBrand"
                  />
                </div>

                <div>
                  <Label>Site Tagline</Label>
                  <Input
                    value={formData.site_tagline}
                    onChange={(e) =>
                      setFormData({ ...formData, site_tagline: e.target.value })
                    }
                    placeholder="Your brand tagline"
                  />
                </div>

                <div>
                  <Label>Site Description</Label>
                  <Textarea
                    rows={3}
                    value={formData.site_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        site_description: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            {/* COLORS */}
          
            {/* SEO */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  SEO & Meta Tags
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <Label>Meta Title</Label>
                  <Input
                    value={formData.meta_title}
                    onChange={(e) =>
                      setFormData({ ...formData, meta_title: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Meta Description</Label>
                  <Textarea
                    rows={3}
                    value={formData.meta_description}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        meta_description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label>Meta Keywords</Label>
                  <Input
                    value={formData.meta_keywords}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        meta_keywords: e.target.value,
                      })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT SIDE – LOGO + FAVICON */}
          <div className="space-y-6">
            {/* LOGO */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" /> Site Logo
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Label>Upload Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                />

                <Label>Logo Alt Text</Label>
                <Input
                  value={formData.logo_alt_text}
                  onChange={(e) =>
                    setFormData({ ...formData, logo_alt_text: e.target.value })
                  }
                />

                <div className="bg-gray-100 p-6 border-2 border-dashed rounded-xl min-h-[200px] flex items-center justify-center">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo preview"
                      className="max-h-32 object-contain"
                    />
                  ) : formData.logo_url ? (
                    <img
                      src={formData.logo_url}
                      alt={formData.logo_alt_text || "Site logo"}
                      className="max-h-32 object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="text-gray-400 h-12 w-12 mx-auto" />
                      <p className="text-gray-500 text-sm">No logo uploaded</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAVICON */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" /> Favicon
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <Label>Upload Favicon</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFaviconChange}
                />

                <div className="bg-gray-100 p-6 border-2 border-dashed rounded-xl min-h-[150px] flex items-center justify-center">
                  {faviconPreview ? (
                    <img
                      src={faviconPreview}
                      alt="Favicon preview"
                      className="h-16 w-16 object-contain"
                    />
                  ) : formData.favicon_url ? (
                    <img
                      src={formData.favicon_url}
                      alt="Site favicon"
                      className="h-16 w-16 object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <ImageIcon className="h-8 w-8 text-gray-400 mx-auto" />
                      <p className="text-xs text-gray-500">No favicon</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SiteBranding;