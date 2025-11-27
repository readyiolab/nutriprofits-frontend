import React from "react";
import {
  Plus,
  Search,
  ArrowLeft,
  Save,
  X,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Upload,
  ChevronDown,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFetch } from "@/hooks";
import { toast } from "sonner";

const FAQs = () => {
  const [view, setView] = React.useState("list"); // 'list' | 'form' | 'content'
  const [editingFaq, setEditingFaq] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");
  const [statusFilter, setStatusFilter] = React.useState("all-status");
  const [expandedId, setExpandedId] = React.useState(null);
  const [savingPageContent, setSavingPageContent] = React.useState(false);
  const [heroImageFile, setHeroImageFile] = React.useState(null);
  const [heroImagePreview, setHeroImagePreview] = React.useState(null);

  const backofficeId = React.useMemo(() => localStorage.getItem("backofficeId") || "1", []);

  const [pageContent, setPageContent] = React.useState({
    hero_title: "",
    hero_subtitle: "",
    hero_description: "",
    hero_image: "",
    cta_title: "",
    cta_description: "",
    cta_button_text: "",
    cta_button_link: "",
    cta_secondary_button_text: "",
    cta_secondary_button_link: "",
  });

  const [formData, setFormData] = React.useState({
    question: "",
    answer: "",
    category: "",
    display_order: 0,
    is_active: true,
  });

  // Fetch data
  const { data: fetchedPageContent, refetch: refetchPageContent } = useFetch(
    `http://localhost:3001/api/faq/${backofficeId}/page-content`,
    { immediate: true, showToast: false }
  );

  const { data: faqsData, loading: faqsLoading, refetch: refetchFaqs } = useFetch(
    `http://localhost:3001/api/faq/${backofficeId}/items`,
    { immediate: true, showToast: false }
  );

  const { data: categoriesData } = useFetch(
    `http://localhost:3001/api/faq/${backofficeId}/categories`,
    { immediate: true, showToast: false }
  );

  const faqs = Array.isArray(faqsData) ? faqsData : faqsData?.data || [];
  const categories = Array.isArray(categoriesData) ? categoriesData : categoriesData?.data || [];

  React.useEffect(() => {
    if (fetchedPageContent) {
      setPageContent({
        hero_title: fetchedPageContent.hero_title || "",
        hero_subtitle: fetchedPageContent.hero_subtitle || "",
        hero_description: fetchedPageContent.hero_description || "",
        hero_image: fetchedPageContent.hero_image || "",
        cta_title: fetchedPageContent.cta_title || "",
        cta_description: fetchedPageContent.cta_description || "",
        cta_button_text: fetchedPageContent.cta_button_text || "",
        cta_button_link: fetchedPageContent.cta_button_link || "",
        cta_secondary_button_text: fetchedPageContent.cta_secondary_button_text || "",
        cta_secondary_button_link: fetchedPageContent.cta_secondary_button_link || "",
      });
      if (fetchedPageContent.hero_image) {
        setHeroImagePreview(fetchedPageContent.hero_image);
      }
    }
  }, [fetchedPageContent]);

  const goToList = () => {
    setView("list");
    setEditingFaq(null);
    setFormData({ question: "", answer: "", category: "", display_order: 0, is_active: true });
  };

  const goToForm = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category || "",
        display_order: faq.display_order || 0,
        is_active: faq.is_active ?? true,
      });
    } else {
      setEditingFaq(null);
      setFormData({ question: "", answer: "", category: "", display_order: 0, is_active: true });
    }
    setView("form");
  };

  const goToContent = () => setView("content");

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please select an image");
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be < 5MB");

    setHeroImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setHeroImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSavePageContent = async () => {
    setSavingPageContent(true);
    const form = new FormData();
    Object.keys(pageContent).forEach((key) => {
      if (key !== "hero_image") form.append(key, pageContent[key] || "");
    });
    if (heroImageFile) form.append("hero_image", heroImageFile);
    else if (!heroImagePreview) form.append("hero_image", "");

    try {
      const res = await fetch(`http://localhost:3001/api/faq/${backofficeId}/page-content/upsert`, {
        method: "POST",
        credentials: "include",
        body: form,
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Page content saved!");
        setHeroImageFile(null);
        refetchPageContent();
      } else toast.error(result.message || "Failed");
    } catch (err) {
      toast.error("Save failed");
    } finally {
      setSavingPageContent(false);
    }
  };

  const handleSubmitFaq = async () => {
    if (!formData.question || !formData.answer) {
      toast.error("Question and answer required");
      return;
    }

    const url = editingFaq
      ? `http://localhost:3001/api/faq/${backofficeId}/items/${editingFaq.faq_id}`
      : `http://localhost:3001/api/faq/${backofficeId}/items`;

    const method = editingFaq ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (result.success) {
        toast.success(editingFaq ? "FAQ updated!" : "FAQ created!");
        goToList();
        refetchFaqs();
      } else toast.error(result.message);
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (faqId) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      const res = await fetch(`http://localhost:3001/api/faq/${backofficeId}/items/${faqId}`, {
        method: "DELETE",
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        toast.success("Deleted!");
        refetchFaqs();
      } else toast.error("Delete failed");
    } catch (err) {
      toast.error("Error");
    }
  };

  const handleToggleStatus = async (faqId) => {
    try {
      const res = await fetch(`http://localhost:3001/api/faq/${backofficeId}/items/${faqId}/toggle-status`, {
        method: "PATCH",
        credentials: "include",
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        refetchFaqs();
      }
    } catch (err) {
      toast.error("Toggle failed");
    }
  };

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || f.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all-status" ||
      (statusFilter === "active" && f.is_active) ||
      (statusFilter === "inactive" && !f.is_active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // FULL PAGE FORM VIEW
  if (view === "form") {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goToList}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">
                {editingFaq ? "Edit FAQ" : "Add New FAQ"}
              </h1>
              <p className="text-gray-600">
                {editingFaq ? "Update FAQ details" : "Create a new FAQ"}
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={goToList}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button onClick={handleSubmitFaq} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              {editingFaq ? "Update" : "Create"} FAQ
            </Button>
          </div>
        </div>

        <div className="max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>FAQ Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Category (optional)</Label>
                <Input
                  placeholder="e.g., Shipping, Returns, Payment"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div>
                <Label>Question *</Label>
                <Input
                  placeholder="How do I track my order?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>
              <div>
                <Label>Answer *</Label>
                <Textarea
                  rows={8}
                  placeholder="Write your detailed answer..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Display Order</Label>
                  <Input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) =>
                      setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
                    }
                  />
                </div>
                <div>
                  <Label>Status</Label>
                  <Select
                    value={formData.is_active ? "active" : "inactive"}
                    onValueChange={(v) => setFormData({ ...formData, is_active: v === "active" })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // FULL PAGE CONTENT EDITOR
  if (view === "content") {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={goToList}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold">FAQ Page Content</h1>
              <p className="text-gray-600">Customize hero and CTA sections</p>
            </div>
          </div>
          <Button onClick={handleSavePageContent} disabled={savingPageContent} className="bg-blue-600">
            {savingPageContent ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save All
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Hero Image</Label>
                  <div className="flex items-center gap-4">
                    <Input id="hero_img_input" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    <Button variant="outline" onClick={() => document.getElementById("hero_img_input").click()}>
                      <Upload className="h-4 w-4 mr-2" />
                      {heroImagePreview ? "Change" : "Upload"} Image
                    </Button>
                    {heroImagePreview && (
                      <Button variant="destructive" size="sm" onClick={() => { setHeroImageFile(null); setHeroImagePreview(null); }}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  {heroImagePreview && (
                    <img src={heroImagePreview} alt="Preview" className="mt-4 w-full h-64 object-cover rounded-lg border" />
                  )}
                  <p className="text-sm text-gray-500 mt-2">Recommended: 1920×600px • Max 5MB</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Title</Label><Input value={pageContent.hero_title} onChange={(e) => setPageContent({ ...pageContent, hero_title: e.target.value })} /></div>
                  <div><Label>Subtitle</Label><Input value={pageContent.hero_subtitle} onChange={(e) => setPageContent({ ...pageContent, hero_subtitle: e.target.value })} /></div>
                </div>
                <div><Label>Description</Label><Textarea rows={3} value={pageContent.hero_description} onChange={(e) => setPageContent({ ...pageContent, hero_description: e.target.value })} /></div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Call-to-Action (CTA)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div><Label>Title</Label><Input value={pageContent.cta_title} onChange={(e) => setPageContent({ ...pageContent, cta_title: e.target.value })} placeholder="Still have questions?" /></div>
                <div><Label>Description</Label><Textarea rows={3} value={pageContent.cta_description} onChange={(e) => setPageContent({ ...pageContent, cta_description: e.target.value })} /></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div><Label>Button Text</Label><Input value={pageContent.cta_button_text} onChange={(e) => setPageContent({ ...pageContent, cta_button_text: e.target.value })} /></div>
                  <div><Label>Button Link</Label><Input value={pageContent.cta_button_link} onChange={(e) => setPageContent({ ...pageContent, cta_button_link: e.target.value })} placeholder="/contact" /></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600 mt-2">Manage questions and page content</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={goToContent}>
            Edit Page Content
          </Button>
          <Button onClick={() => goToForm()} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search FAQs..." className="pl-9" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* FAQs List */}
      <Card>
        <CardHeader>
          <CardTitle>FAQ Items ({filteredFaqs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {faqsLoading ? (
            <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
          ) : filteredFaqs.length === 0 ? (
            <p className="text-center py-12 text-gray-500">No FAQs found. Click "Add FAQ" to create one.</p>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div key={faq.faq_id} className="border rounded-lg">
                  <div
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setExpandedId(expandedId === faq.faq_id ? null : faq.faq_id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {faq.category && <Badge variant="outline">{faq.category}</Badge>}
                        <Badge className={faq.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                          {faq.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <span className="text-xs text-gray-500">Order: {faq.display_order}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleToggleStatus(faq.faq_id); }}>
                        {faq.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); goToForm(faq); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); handleDelete(faq.faq_id); }}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      {expandedId === faq.faq_id ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                  {expandedId === faq.faq_id && (
                    <div className="px-4 pb-4 border-t bg-gray-50">
                      <p className="text-gray-700 whitespace-pre-wrap">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-blue-600">{faqs.length}</div><p className="text-sm text-gray-600">Total</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-green-600">{faqs.filter(f => f.is_active).length}</div><p className="text-sm text-gray-600">Active</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-gray-600">{faqs.filter(f => !f.is_active).length}</div><p className="text-sm text-gray-600">Inactive</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-purple-600">{categories.length}</div><p className="text-sm text-gray-600">Categories</p></CardContent></Card>
      </div>
    </div>
  );
};

export default FAQs;