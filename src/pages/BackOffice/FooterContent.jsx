import React, { useEffect } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

const SOCIAL_PLATFORMS = [
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "twitter", label: "Twitter", icon: Twitter },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "tiktok", label: "TikTok", icon: LinkIcon },
  { value: "pinterest", label: "Pinterest", icon: LinkIcon },
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
  footer_background_color: "",
  footer_text_color: "",
};

const FooterContent = () => {
  const [formData, setFormData] = React.useState(FORM_INITIAL_STATE);
  const [submitting, setSubmitting] = React.useState(false);
  const [showSocialModal, setShowSocialModal] = React.useState(false);
  const [showFooterLinksModal, setShowFooterLinksModal] = React.useState(false);
  const [newSocialLink, setNewSocialLink] = React.useState({
    platform: "",
    url: "",
    is_active: true,
  });
  const [newFooterSection, setNewFooterSection] = React.useState({
    section_title: "",
    links: [{ label: "", url: "", display_order: 1 }],
  });

  // Fetch existing footer content
  const {
    data: footerData,
    loading,
    error,
    refetch,
  } = useFetch("http://localhost:3001/api/backoffice/footer", {
    immediate: true,
    showToast: false,
  });

  // Populate form when data loads
  useEffect(() => {
    const apiData = footerData?.data || footerData;

    if (!apiData) {
      console.log("⚠️ No data to load");
      return;
    }

    const data = apiData;

    setFormData({
      about_title: data.about_title || "",
      about_description: data.about_description || "",
      contact_email: data.contact_email || "",
      contact_phone: data.contact_phone || "",
      contact_address: data.contact_address || "",
      contact_map_url: data.contact_map_url || "",
      social_links: data.social_links || [],
      footer_links: data.footer_links || [],
      newsletter_enabled: data.newsletter_enabled || false,
      newsletter_title: data.newsletter_title || "",
      newsletter_description: data.newsletter_description || "",
      newsletter_placeholder: data.newsletter_placeholder || "",
      newsletter_button_text: data.newsletter_button_text || "",
      copyright_text: data.copyright_text || "",
      privacy_policy_url: data.privacy_policy_url || "",
      terms_url: data.terms_url || "",
      cookie_policy_url: data.cookie_policy_url || "",
      show_social_links: data.show_social_links ?? true,
      show_contact_info: data.show_contact_info ?? true,
      footer_background_color: data.footer_background_color || "",
      footer_text_color: data.footer_text_color || "",
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

      console.log("📤 Server response:", result);

      if (result.success) {
        toast.success("Footer content saved successfully!");

        // Force refetch from server
        console.log("🔄 Refetching data...");
        const refetchResult = await refetch();
        console.log("✅ Refetch complete:", refetchResult);
      } else {
        toast.error(result.message || "Failed to save footer content");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error("❌ Error:", err);
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
        icon: `Fa${
          newSocialLink.platform.charAt(0).toUpperCase() +
          newSocialLink.platform.slice(1)
        }`,
      },
    ];

    setFormData({ ...formData, social_links: updatedLinks });
    setNewSocialLink({ platform: "", url: "", is_active: true });
    setShowSocialModal(false);
    toast.success("Social link added");
  };

  const deleteSocialLink = (platform) => {
    const updatedLinks = formData.social_links.filter(
      (link) => link.platform !== platform
    );
    setFormData({ ...formData, social_links: updatedLinks });
    toast.success("Social link removed");
  };

  const toggleSocialActive = (platform) => {
    const updatedLinks = formData.social_links.map((link) =>
      link.platform === platform
        ? { ...link, is_active: !link.is_active }
        : link
    );
    setFormData({ ...formData, social_links: updatedLinks });
  };

  const addFooterSection = () => {
    if (!newFooterSection.section_title) {
      toast.error("Section title is required");
      return;
    }

    const validLinks = newFooterSection.links.filter(
      (link) => link.label && link.url
    );

    if (validLinks.length === 0) {
      toast.error("Add at least one link");
      return;
    }

    setFormData({
      ...formData,
      footer_links: [
        ...formData.footer_links,
        { ...newFooterSection, links: validLinks },
      ],
    });

    setNewFooterSection({
      section_title: "",
      links: [{ label: "", url: "", display_order: 1 }],
    });
    setShowFooterLinksModal(false);
    toast.success("Footer section added");
  };

  const deleteFooterSection = (index) => {
    const updatedSections = formData.footer_links.filter((_, i) => i !== index);
    setFormData({ ...formData, footer_links: updatedSections });
    toast.success("Footer section removed");
  };

  const addLinkToSection = () => {
    setNewFooterSection({
      ...newFooterSection,
      links: [
        ...newFooterSection.links,
        {
          label: "",
          url: "",
          display_order: newFooterSection.links.length + 1,
        },
      ],
    });
  };

  const updateSectionLink = (index, field, value) => {
    const updatedLinks = [...newFooterSection.links];
    updatedLinks[index][field] = value;
    setNewFooterSection({ ...newFooterSection, links: updatedLinks });
  };

  const removeSectionLink = (index) => {
    const updatedLinks = newFooterSection.links.filter((_, i) => i !== index);
    setNewFooterSection({ ...newFooterSection, links: updatedLinks });
  };

  const getSocialIcon = (platform) => {
    const social = SOCIAL_PLATFORMS.find((p) => p.value === platform);
    return social ? social.icon : LinkIcon;
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Footer Content</h1>
          <p className="text-gray-600 mt-2">
            Manage footer sections, social links, and contact information
          </p>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {submitting ? (
            <Loader className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Save Changes
        </Button>
      </div>

      

      {/* Error */}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card>
            <CardHeader>
              <CardTitle>About Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>About Title</Label>
                <Input
                  placeholder="e.g., About Us"
                  value={formData.about_title}
                  onChange={(e) =>
                    setFormData({ ...formData, about_title: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>About Description</Label>
                <Textarea
                  rows={4}
                  placeholder="Brief description about your company..."
                  value={formData.about_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      about_description: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Contact Information
                <Switch
                  checked={formData.show_contact_info}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, show_contact_info: checked })
                  }
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="contact@example.com"
                  value={formData.contact_email}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone
                </Label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={formData.contact_phone}
                  onChange={(e) =>
                    setFormData({ ...formData, contact_phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Address
                </Label>
                <Textarea
                  rows={2}
                  placeholder="123 Main St, City, State 12345"
                  value={formData.contact_address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_address: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Google Maps URL (Optional)</Label>
                <Input
                  placeholder="https://maps.google.com/..."
                  value={formData.contact_map_url}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact_map_url: e.target.value,
                    })
                  }
                />
              </div>
            </CardContent>
          </Card> */}

          {/* Newsletter Section */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Newsletter
                <Switch
                  checked={formData.newsletter_enabled}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, newsletter_enabled: checked })
                  }
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Newsletter Title</Label>
                <Input
                  placeholder="e.g., Subscribe to our newsletter"
                  value={formData.newsletter_title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter_title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Newsletter Description</Label>
                <Textarea
                  rows={2}
                  placeholder="Get updates on new products and exclusive offers"
                  value={formData.newsletter_description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      newsletter_description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Input Placeholder</Label>
                  <Input
                    placeholder="Enter your email"
                    value={formData.newsletter_placeholder}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsletter_placeholder: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Button Text</Label>
                  <Input
                    placeholder="Subscribe"
                    value={formData.newsletter_button_text}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        newsletter_button_text: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card> */}

          {/* Copyright & Legal */}
          <Card>
            <CardHeader>
              <CardTitle>Copyright & Legal Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Copyright Text</Label>
                <Input
                  placeholder="© 2024 Your Company. All rights reserved."
                  value={formData.copyright_text}
                  onChange={(e) =>
                    setFormData({ ...formData, copyright_text: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Privacy Policy URL</Label>
                  <Input
                    placeholder="/privacy"
                    value={formData.privacy_policy_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        privacy_policy_url: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Terms URL</Label>
                  <Input
                    placeholder="/terms"
                    value={formData.terms_url}
                    onChange={(e) =>
                      setFormData({ ...formData, terms_url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label>Cookie Policy URL</Label>
                  <Input
                    placeholder="/cookies"
                    value={formData.cookie_policy_url}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cookie_policy_url: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Social Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Social Links
                <Button
                  size="sm"
                  onClick={() => setShowSocialModal(true)}
                  className="bg-blue-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <Label>Show Social Links</Label>
                <Switch
                  checked={formData.show_social_links}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, show_social_links: checked })
                  }
                />
              </div>
              <div className="space-y-2">
                {formData.social_links.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No social links added
                  </p>
                ) : (
                  formData.social_links.map((link) => {
                    const Icon = getSocialIcon(link.platform);
                    return (
                      <div
                        key={link.platform}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-5 w-5 text-gray-600" />
                          <div>
                            <p className="font-medium capitalize text-sm">
                              {link.platform}
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">
                              {link.url}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={link.is_active}
                            onCheckedChange={() =>
                              toggleSocialActive(link.platform)
                            }
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => deleteSocialLink(link.platform)}
                            className="h-8 w-8 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Footer Link Sections */}
          {/* <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Footer Sections
                <Button
                  size="sm"
                  onClick={() => setShowFooterLinksModal(true)}
                  className="bg-blue-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {formData.footer_links.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No footer sections added
                  </p>
                ) : (
                  formData.footer_links.map((section, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">
                          {section.section_title}
                        </h4>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteFooterSection(index)}
                          className="h-6 w-6 text-red-600"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        {section.links.map((link, i) => (
                          <p key={i} className="text-xs text-gray-600">
                            • {link.label}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card> */}
        </div>
      </div>

      {/* Add Social Link Modal */}
      {showSocialModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Add Social Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Platform</Label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={newSocialLink.platform}
                  onChange={(e) =>
                    setNewSocialLink({
                      ...newSocialLink,
                      platform: e.target.value,
                    })
                  }
                >
                  <option value="">Select platform</option>
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  placeholder="https://..."
                  value={newSocialLink.url}
                  onChange={(e) =>
                    setNewSocialLink({ ...newSocialLink, url: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowSocialModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={addSocialLink} className="bg-blue-600">
                  Add Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Footer Section Modal */}
      {showFooterLinksModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add Footer Section</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Section Title</Label>
                <Input
                  placeholder="e.g., Company, Products, Legal"
                  value={newFooterSection.section_title}
                  onChange={(e) =>
                    setNewFooterSection({
                      ...newFooterSection,
                      section_title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Links</Label>
                  <Button
                    size="sm"
                    onClick={addLinkToSection}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Link
                  </Button>
                </div>
                <div className="space-y-3">
                  {newFooterSection.links.map((link, index) => (
                    <div
                      key={index}
                      className="flex gap-2 items-start p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1 space-y-2">
                        <Input
                          placeholder="Link Label"
                          value={link.label}
                          onChange={(e) =>
                            updateSectionLink(index, "label", e.target.value)
                          }
                        />
                        <Input
                          placeholder="Link URL"
                          value={link.url}
                          onChange={(e) =>
                            updateSectionLink(index, "url", e.target.value)
                          }
                        />
                      </div>
                      {newFooterSection.links.length > 1 && (
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeSectionLink(index)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button
                  variant="outline"
                  onClick={() => setShowFooterLinksModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={addFooterSection} className="bg-blue-600">
                  Add Section
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
