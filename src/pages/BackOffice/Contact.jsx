import React from "react";
import {
  ArrowLeft,
  Save,
  Loader2,
  Upload,
  X,
  MapPin,
  Mail,
  Phone,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast, Toaster } from "sonner";

const INITIAL_FORM_STATE = {
  hero_title: "",
  hero_subtitle: "",
  hero_description: "",
  hero_button_text: "",
  hero_button_link: "",
  hero_image_url: "",
  office_title: "",
  office_subtitle: "",
  office_image_url: "",
  address_title: "",
  address: "",
  email_title: "",
  email: "",
  phone_title: "",
  phone: "",
  business_hours_title: "",
  business_hours: "",
  form_title: "",
  form_description: "",
  cta_title: "",
  cta_description: "",
  cta_button_text: "",
  cta_button_link: "",
  cta_secondary_button_text: "",
  cta_secondary_button_link: "",
  map_embed_url: "",
};

const Contact = () => {
  const backofficeId = React.useMemo(() => localStorage.getItem("backofficeId") || "1", []);

  const [formData, setFormData] = React.useState(INITIAL_FORM_STATE);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [heroImageFile, setHeroImageFile] = React.useState(null);
  const [officeImageFile, setOfficeImageFile] = React.useState(null);
  const [heroImagePreview, setHeroImagePreview] = React.useState("");
  const [officeImagePreview, setOfficeImagePreview] = React.useState("");

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/contact/${backofficeId}/page-content`, {
          credentials: "include",
        });
        const result = await res.json();
        if (result.success && result.data) {
          setFormData({ ...INITIAL_FORM_STATE, ...result.data });
          setHeroImagePreview(result.data.hero_image_url || "");
          setOfficeImagePreview(result.data.office_image_url || "");
        }
      } catch (err) {
        toast.error("Failed to load contact page");
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [backofficeId]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImage = (file, setFile, setPreview) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be under 5MB");
    if (!file.type.startsWith("image/")) return toast.error("Only images allowed");
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = (setFile, setPreview, field) => {
    setFile(null);
    setPreview("");
    handleChange(field, "");
  };

  const handleSubmit = async () => {
    setSaving(true);
    const data = new FormData();
    data.append("data", JSON.stringify(formData));
    if (heroImageFile) data.append("hero_image", heroImageFile);
    if (officeImageFile) data.append("office_image", officeImageFile);

    try {
      const res = await fetch(
        `http://localhost:3001/api/contact/${backofficeId}/page-content/upsert`,
        { method: "POST", credentials: "include", body: data }
      );
      const result = await res.json();

      if (result.success) {
        toast.success("Contact page saved successfully!");
        setHeroImageFile(null);
        setOfficeImageFile(null);
        const refresh = await fetch(`http://localhost:3001/api/contact/${backofficeId}/page-content`, {
          credentials: "include",
        });
        const fresh = await refresh.json();
        if (fresh.success) {
          setFormData({ ...INITIAL_FORM_STATE, ...fresh.data });
          setHeroImagePreview(fresh.data.hero_image_url || "");
          setOfficeImagePreview(fresh.data.office_image_url || "");
        }
      } else {
        toast.error(result.message || "Save failed");
      }
    } catch (err) {
      toast.error("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />

      
      <div >
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Contact Page</h1>
              <p className="text-gray-600">Customize your contact page content</p>
            </div>
          </div>
          <Button onClick={handleSubmit} disabled={saving} className="bg-blue-500 hover:bg-blue-700">
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
      </div>

      {/* Content */}
      <div className="p-3 space-y-8">

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
            <CardDescription>Main banner at the top of the page</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <div><Label>Title</Label><Input value={formData.hero_title} onChange={e => handleChange("hero_title", e.target.value)} placeholder="Get in Touch" /></div>
                <div><Label>Subtitle</Label><Input value={formData.hero_subtitle} onChange={e => handleChange("hero_subtitle", e.target.value)} placeholder="We're here to help" /></div>
                <div><Label>Description</Label><Textarea rows={4} value={formData.hero_description} onChange={e => handleChange("hero_description", e.target.value)} placeholder="Brief intro message..." /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>Button Text</Label><Input value={formData.hero_button_text} onChange={e => handleChange("hero_button_text", e.target.value)} placeholder="Contact Us" /></div>
                  <div><Label>Button Link</Label><Input value={formData.hero_button_link} onChange={e => handleChange("hero_button_link", e.target.value)} placeholder="#contact-form" /></div>
                </div>
              </div>
              <div>
                <Label>Hero Image</Label>
                {heroImagePreview ? (
                  <div className="relative group mt-3">
                    <img src={heroImagePreview} alt="Hero" className="w-full h-80 object-cover rounded-xl border shadow-sm" />
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition"
                      onClick={() => removeImage(setHeroImageFile, setHeroImagePreview, "hero_image_url")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="mt-3 flex flex-col items-center justify-center w-full h-80 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 cursor-pointer bg-gray-50 transition">
                    <Upload className="h-16 w-16 text-gray-400 mb-4" />
                    <p className="text-lg font-medium text-gray-600">Upload Hero Image</p>
                    <p className="text-sm text-gray-500">Max 5MB • Recommended: 1920×800</p>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImage(e.target.files[0], setHeroImageFile, setHeroImagePreview)} />
                  </label>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Office Info */}
        <Card>
          <CardHeader>
            <CardTitle>Office Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-5">
                <Input label="Section Title" value={formData.office_title} onChange={e => handleChange("office_title", e.target.value)} placeholder="Our Office" />
                <Input label="Section Subtitle" value={formData.office_subtitle} onChange={e => handleChange("office_subtitle", e.target.value)} placeholder="Visit us or get in touch" />
              </div>
              <div>
                <Label>Office Image</Label>
                {officeImagePreview ? (
                  <div className="relative group mt-3">
                    <img src={officeImagePreview} alt="Office" className="w-full h-64 object-cover rounded-xl border shadow-sm" />
                    <Button size="icon" variant="destructive" className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition" onClick={() => removeImage(setOfficeImageFile, setOfficeImagePreview, "office_image_url")}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="mt-3 flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 cursor-pointer bg-gray-50">
                    <Upload className="h-14 w-14 text-gray-400 mb-3" />
                    <p className="text-lg font-medium text-gray-600">Upload Office Image</p>
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImage(e.target.files[0], setOfficeImageFile, setOfficeImagePreview)} />
                  </label>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card>
          <CardHeader><CardTitle>Contact Details</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Input label="Address Title" value={formData.address_title} onChange={e => handleChange("address_title", e.target.value)} />
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
                <Textarea rows={4} className="pl-11" value={formData.address} onChange={e => handleChange("address", e.target.value)} placeholder="123 Business Ave, Suite 100..." />
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email Title" value={formData.email_title} onChange={e => handleChange("email_title", e.target.value)} />
                <div className="relative">
                  <Mail className="absolute left-3 top-10 h-5 w-5 text-gray-500" />
                  <Input className="pl-11" value={formData.email} onChange={e => handleChange("email", e.target.value)} placeholder="hello@company.com" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Phone Title" value={formData.phone_title} onChange={e => handleChange("phone_title", e.target.value)} />
                <div className="relative">
                  <Phone className="absolute left-3 top-10 h-5 w-5 text-gray-500" />
                  <Input className="pl-11" value={formData.phone} onChange={e => handleChange("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Hours Title" value={formData.business_hours_title} onChange={e => handleChange("business_hours_title", e.target.value)} />
                <div className="relative">
                  <Clock className="absolute left-3 top-10 h-5 w-5 text-gray-500" />
                  <Input className="pl-11" value={formData.business_hours} onChange={e => handleChange("business_hours", e.target.value)} placeholder="Mon-Fri 9AM-6PM" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card>
          <CardHeader><CardTitle>Contact Form</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <Input label="Form Title" value={formData.form_title} onChange={e => handleChange("form_title", e.target.value)} placeholder="Send Us a Message" />
            <Textarea rows={4} label="Form Description" value={formData.form_description} onChange={e => handleChange("form_description", e.target.value)} placeholder="We typically reply within 24 hours..." />
          </CardContent>
        </Card>

        {/* Map */}
        <Card>
          <CardHeader><CardTitle>Google Maps Embed</CardTitle></CardHeader>
          <CardContent>
            <Input label="Embed URL" value={formData.map_embed_url} onChange={e => handleChange("map_embed_url", e.target.value)} placeholder="https://www.google.com/maps/embed?pb=..." />
            <p className="text-sm text-gray-500 mt-2">Get from Google Maps → Share → Embed a map → Copy iframe src</p>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card>
          <CardHeader><CardTitle>Call-to-Action</CardTitle></CardHeader>
          <CardContent className="space-y-5">
            <Input label="Title" value={formData.cta_title} onChange={e => handleChange("cta_title", e.target.value)} placeholder="Ready to Start?" />
            <Textarea rows={3} label="Description" value={formData.cta_description} onChange={e => handleChange("cta_description", e.target.value)} />
            <div className="grid md:grid-cols-2 gap-6">
              <Input label="Primary Button" value={formData.cta_button_text} onChange={e => handleChange("cta_button_text", e.target.value)} />
              <Input label="Primary Link" value={formData.cta_button_link} onChange={e => handleChange("cta_button_link", e.target.value)} />
              <Input label="Secondary Button" value={formData.cta_secondary_button_text} onChange={e => handleChange("cta_secondary_button_text", e.target.value)} />
              <Input label="Secondary Link" value={formData.cta_secondary_button_link} onChange={e => handleChange("cta_secondary_button_link", e.target.value)} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Reusable Input with Label
const InputField = ({ label, icon: Icon, ...props }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />}
      <Input className={Icon ? "pl-10" : ""} {...props} />
    </div>
  </div>
);

export default Contact;