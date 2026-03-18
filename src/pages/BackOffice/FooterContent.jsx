import React, { useState, useEffect } from "react";
import {
  Save,
  Loader,
  AlertCircle,
  Plus,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Link as LinkIcon,
  LayoutTemplate,
  FileText,
  Globe,
  Check,
  X,
  ExternalLink,
  Eye,
  Copyright,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

const SOCIAL_PLATFORMS = [
  { value: "facebook", label: "Facebook", icon: Facebook, color: "#1877f2" },
  { value: "twitter", label: "Twitter", icon: Twitter, color: "#1da1f2" },
  { value: "instagram", label: "Instagram", icon: Instagram, color: "#e4405f" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, color: "#0a66c2" },
  { value: "youtube", label: "YouTube", icon: Youtube, color: "#ff0000" },
  { value: "tiktok", label: "TikTok", icon: LinkIcon, color: "#000000" },
  { value: "pinterest", label: "Pinterest", icon: LinkIcon, color: "#bd081c" },
];

const FORM_INITIAL_STATE = {
  about_title: "",
  about_description: "",
  contact_email: "",
  contact_phone: "",
  contact_address: "",
  contact_map_url: "",
  social_links: [],
  footer_links: [],
  newsletter_enabled: false,
  newsletter_title: "",
  newsletter_description: "",
  newsletter_placeholder: "",
  newsletter_button_text: "",
  copyright_text: "",
  privacy_policy_url: "",
  terms_url: "",
  cookie_policy_url: "",
  show_social_links: true,
  show_contact_info: true,
  footer_background_color: "#1f2937",
  footer_text_color: "#f3f4f6",
};

const SocialIcon = ({ platform, className = "h-5 w-5" }) => {
  const social = SOCIAL_PLATFORMS.find((p) => p.value === platform);
  const Icon = social ? social.icon : LinkIcon;
  return <Icon className={className} style={{ color: social?.color }} />;
};

const FooterPreview = ({ formData }) => (
  <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
    <div 
      className="px-4 py-3 border-b flex items-center gap-2"
      style={{ backgroundColor: formData.footer_background_color, borderColor: 'rgba(255,255,255,0.1)' }}
    >
      <Eye className="h-4 w-4 text-gray-400" />
      <span className="text-sm font-medium text-gray-300">Footer Preview</span>
    </div>
    <div 
      className="p-6"
      style={{ backgroundColor: formData.footer_background_color, color: formData.footer_text_color }}
    >
      {/* Main Footer Content */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {/* About Column */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-3 text-sm" style={{ color: formData.footer_text_color }}>
            {formData.about_title || "About Us"}
          </h4>
          <p className="text-xs leading-relaxed opacity-80 line-clamp-4">
            {formData.about_description || "Your company description will appear here..."}
          </p>
        </div>

        {/* Links Column */}
        <div className="col-span-1">
          <h4 className="font-semibold mb-3 text-sm" style={{ color: formData.footer_text_color }}>Quick Links</h4>
          <div className="space-y-1 text-xs opacity-80">
            <p>Home</p>
            <p>Products</p>
            <p>About</p>
            <p>Contact</p>
          </div>
        </div>

        {/* Contact Column */}
        {formData.show_contact_info && (
          <div className="col-span-1">
            <h4 className="font-semibold mb-3 text-sm" style={{ color: formData.footer_text_color }}>Contact</h4>
            <div className="space-y-2 text-xs opacity-80">
              {formData.contact_email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3" />
                  <span className="truncate">{formData.contact_email}</span>
                </div>
              )}
              {formData.contact_phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-3 w-3" />
                  <span>{formData.contact_phone}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Social Links */}
      {formData.show_social_links && formData.social_links.length > 0 && (
        <>
          <Separator className="my-4 bg-white/10" />
          <div className="flex items-center justify-center gap-4">
            {formData.social_links.filter(l => l.is_active).map((link) => (
              <SocialIcon key={link.platform} platform={link.platform} className="h-5 w-5 opacity-70 hover:opacity-100" />
            ))}
          </div>
        </>
      )}

      {/* Copyright */}
      <Separator className="my-4 bg-white/10" />
      <div className="flex items-center justify-between text-xs opacity-60">
        <p>{formData.copyright_text || "© 2024 Your Company. All rights reserved."}</p>
        <div className="flex gap-4">
          {formData.privacy_policy_url && <span>Privacy</span>}
          {formData.terms_url && <span>Terms</span>}
          {formData.cookie_policy_url && <span>Cookies</span>}
        </div>
      </div>
    </div>
  </div>
);

const FooterContent = () => {
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("about");
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({
    platform: "",
    url: "",
    is_active: true,
  });

  const { data: footerData, loading, error, refetch } = useFetch(
    "http://localhost:3001/api/backoffice/footer",
    { immediate: true, showToast: false }
  );

  useEffect(() => {
    const apiData = footerData?.data || footerData;
    if (!apiData) return;

    setFormData({
      about_title: apiData.about_title || "",
      about_description: apiData.about_description || "",
      contact_email: apiData.contact_email || "",
      contact_phone: apiData.contact_phone || "",
      contact_address: apiData.contact_address || "",
      contact_map_url: apiData.contact_map_url || "",
      social_links: apiData.social_links || [],
      footer_links: apiData.footer_links || [],
      newsletter_enabled: apiData.newsletter_enabled || false,
      newsletter_title: apiData.newsletter_title || "",
      newsletter_description: apiData.newsletter_description || "",
      newsletter_placeholder: apiData.newsletter_placeholder || "",
      newsletter_button_text: apiData.newsletter_button_text || "",
      copyright_text: apiData.copyright_text || "",
      privacy_policy_url: apiData.privacy_policy_url || "",
      terms_url: apiData.terms_url || "",
      cookie_policy_url: apiData.cookie_policy_url || "",
      show_social_links: apiData.show_social_links ?? true,
      show_contact_info: apiData.show_contact_info ?? true,
      footer_background_color: apiData.footer_background_color || "#1f2937",
      footer_text_color: apiData.footer_text_color || "#f3f4f6",
    });
  }, [footerData]);

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("http://localhost:3001/api/backoffice/footer", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Footer content saved successfully!");
        await refetch();
      } else {
        toast.error(result.message || "Failed to save footer content");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const addSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast.error("Please fill all fields");
      return;
    }

    const updatedLinks = [
      ...formData.social_links,
      {
        ...newSocialLink,
        display_order: formData.social_links.length + 1,
        icon: `Fa${newSocialLink.platform.charAt(0).toUpperCase() + newSocialLink.platform.slice(1)}`,
      },
    ];

    setFormData({ ...formData, social_links: updatedLinks });
    setNewSocialLink({ platform: "", url: "", is_active: true });
    setShowSocialModal(false);
    toast.success("Social link added");
  };

  const deleteSocialLink = (platform) => {
    const updatedLinks = formData.social_links.filter((link) => link.platform !== platform);
    setFormData({ ...formData, social_links: updatedLinks });
    toast.success("Social link removed");
  };

  const toggleSocialActive = (platform) => {
    const updatedLinks = formData.social_links.map((link) =>
      link.platform === platform ? { ...link, is_active: !link.is_active } : link
    );
    setFormData({ ...formData, social_links: updatedLinks });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
        <div className="text-center">
          <Loader className="h-10 w-10 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading footer settings...</p>
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
              <div className="h-12 w-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <LayoutTemplate className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Footer Content</h1>
                <p className="text-gray-500 text-sm">
                  Customize footer sections, links, and contact information
                </p>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 shadow-lg"
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
                <TabsTrigger value="about" className="rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                  <FileText className="h-4 w-4 mr-2" />
                  About
                </TabsTrigger>
                <TabsTrigger value="social" className="rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                  <Globe className="h-4 w-4 mr-2" />
                  Social
                </TabsTrigger>
                <TabsTrigger value="legal" className="rounded-lg data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-700">
                  <Shield className="h-4 w-4 mr-2" />
                  Legal
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit}>
                {/* About Tab */}
                <TabsContent value="about" className="mt-0">
                  <Card className="shadow-sm border-0 shadow-gray-200/50">
                    <CardHeader className="bg-gradient-to-r from-blue-50/50 to-transparent border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle>About Section</CardTitle>
                          <CardDescription>Company information displayed in the footer</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">About Title</Label>
                        <Input
                          value={formData.about_title}
                          onChange={(e) => setFormData({ ...formData, about_title: e.target.value })}
                          placeholder="e.g., About NutriProfits"
                          className="h-12"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-sm font-medium">About Description</Label>
                        <Textarea
                          rows={5}
                          value={formData.about_description}
                          onChange={(e) => setFormData({ ...formData, about_description: e.target.value })}
                          placeholder="Brief description about your company, mission, and values..."
                          className="resize-none"
                        />
                        <p className="text-xs text-gray-500">This appears in the footer&apos;s about column</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Social Tab */}
                <TabsContent value="social" className="mt-0 space-y-6">
                  <Card className="shadow-sm border-0 shadow-gray-200/50">
                    <CardHeader className="bg-gradient-to-r from-pink-50/50 to-transparent border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-pink-100 rounded-lg flex items-center justify-center">
                          <Globe className="h-5 w-5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="flex items-center justify-between">
                            <span>Social Media Links</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-normal text-gray-500">Show in footer</span>
                              <Switch
                                checked={formData.show_social_links}
                                onCheckedChange={(checked) =>
                                  setFormData({ ...formData, show_social_links: checked })
                                }
                              />
                            </div>
                          </CardTitle>
                          <CardDescription>Connect your social media profiles</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-600">
                          {formData.social_links.length} social {formData.social_links.length === 1 ? "link" : "links"} configured
                        </p>
                        <Button
                          onClick={() => setShowSocialModal(true)}
                          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Social Link
                        </Button>
                      </div>

                      {formData.social_links.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                          <Globe className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500 font-medium">No social links added</p>
                          <p className="text-sm text-gray-400">Add your social media profiles to display in the footer</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {formData.social_links.map((link) => {
                            const platform = SOCIAL_PLATFORMS.find((p) => p.value === link.platform);
                            return (
                              <div
                                key={link.platform}
                                className="flex items-center justify-between p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition-shadow"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="h-10 w-10 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: `${platform?.color}15` }}
                                  >
                                    <SocialIcon platform={link.platform} className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-medium capitalize text-sm">{link.platform}</p>
                                    <p className="text-xs text-gray-500 truncate max-w-[180px]">{link.url}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={link.is_active}
                                    onCheckedChange={() => toggleSocialActive(link.platform)}
                                  />
                                  <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => deleteSocialLink(link.platform)}
                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Legal Tab */}
                <TabsContent value="legal" className="mt-0">
                  <Card className="shadow-sm border-0 shadow-gray-200/50">
                    <CardHeader className="bg-gradient-to-r from-emerald-50/50 to-transparent border-b">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <Shield className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <CardTitle>Copyright & Legal</CardTitle>
                          <CardDescription>Legal links and copyright information</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6 pt-6">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Copyright Text</Label>
                        <Input
                          value={formData.copyright_text}
                          onChange={(e) => setFormData({ ...formData, copyright_text: e.target.value })}
                          placeholder="© 2024 Your Company. All rights reserved."
                          className="h-12"
                        />
                      </div>

                      <Separator />

                      <p className="text-sm font-medium text-gray-700">Legal Page Links</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <Shield className="h-4 w-4 text-gray-400" />
                            Privacy Policy
                          </Label>
                          <Input
                            value={formData.privacy_policy_url}
                            onChange={(e) => setFormData({ ...formData, privacy_policy_url: e.target.value })}
                            placeholder="/privacy"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-400" />
                            Terms of Service
                          </Label>
                          <Input
                            value={formData.terms_url}
                            onChange={(e) => setFormData({ ...formData, terms_url: e.target.value })}
                            placeholder="/terms"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-medium flex items-center gap-2">
                            <Copyright className="h-4 w-4 text-gray-400" />
                            Cookie Policy
                          </Label>
                          <Input
                            value={formData.cookie_policy_url}
                            onChange={(e) => setFormData({ ...formData, cookie_policy_url: e.target.value })}
                            placeholder="/cookies"
                          />
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
              <FooterPreview formData={formData} />

              {/* Quick Stats */}
              <Card className="shadow-sm border-0 shadow-gray-200/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Footer Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">About Section</span>
                    {formData.about_title && formData.about_description ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Social Links</span>
                    <Badge variant="outline" className="text-xs">
                      {formData.social_links.filter(l => l.is_active).length} active
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Copyright</span>
                    {formData.copyright_text ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300" />
                    )}
                  </div>
                  <Separator />
                  <p className="text-xs text-gray-500">
                    Preview updates automatically as you make changes
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Add Social Link Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl">
            <CardHeader className="border-b bg-gradient-to-r from-pink-50/50 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-pink-600" />
                Add Social Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>Platform</Label>
                <select
                  className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  value={newSocialLink.platform}
                  onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                >
                  <option value="">Select platform</option>
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Profile URL</Label>
                <div className="relative">
                  <ExternalLink className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    placeholder="https://..."
                    value={newSocialLink.url}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setShowSocialModal(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={addSocialLink}
                  className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FooterContent;
