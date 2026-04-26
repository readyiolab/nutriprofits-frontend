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
import api from "@/config/apiConfig";

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

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);

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
    sort_order: 0,
    is_active: true,
  });

  // Fetch data
  const { data: fetchedPageContent, refetch: refetchPageContent } = useFetch(
    `/faq/page-content`,
    { immediate: true, showToast: false }
  );

  const { data: faqsData, loading: faqsLoading, refetch: refetchFaqs } = useFetch(
    `/faq/items?page=${currentPage}&limit=${itemsPerPage}&search=${searchQuery}`,
    { immediate: true, showToast: false }
  );

  const faqs = faqsData?.data || [];
  const pagination = faqsData?.pagination || { total: 0, pages: 0, page: 1 };
  
  // Derive unique categories from faqs (Ideally this would be a separate API, but using what's available)
  const categories = React.useMemo(() => {
    const cats = faqs
      .map(f => f.category)
      .filter(c => c && typeof c === 'string' && c.trim() !== '');
    return [...new Set(cats)];
  }, [faqs]);

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
    setFormData({ question: "", answer: "", category: "", sort_order: 0, is_active: true });
  };

  const goToForm = (faq = null) => {
    if (faq) {
      setEditingFaq(faq);
      setFormData({
        question: faq.question || "",
        answer: faq.answer || "",
        category: faq.category || "",
        sort_order: faq.sort_order || 0,
        is_active: faq.is_active ?? true,
      });
    } else {
      setEditingFaq(null);
      setFormData({ question: "", answer: "", category: "", sort_order: 0, is_active: true });
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
    
    const payload = {
      ...pageContent,
      backoffice_id: backofficeId,
    };

    const form = new FormData();
    form.append("data", JSON.stringify(payload));
    
    if (heroImageFile) {
      form.append("hero_image", heroImageFile);
    } else if (!heroImagePreview) {
      // If preview is cleared, signal deletion
      form.append("hero_image", "");
    }

    try {
      const response = await api.post(`/faq/page-content/upsert`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      const result = response.data;
      if (result.success) {
        toast.success("Page content saved!");
        setHeroImageFile(null);
        refetchPageContent();
      } else {
        toast.error(result.message || "Failed to save content");
      }
    } catch (err) {
      console.error("Save page content error:", err);
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
      ? `/faq/items/${editingFaq.faq_id}`
      : `/faq/items`;

    const method = editingFaq ? "put" : "post";

    try {
      const response = await api[method](url, {
        ...formData,
        backoffice_id: backofficeId,
      });
      
      const result = response.data;
      if (result.success) {
        toast.success(editingFaq ? "FAQ updated!" : "FAQ created!");
        goToList();
        refetchFaqs();
      } else {
        toast.error(result.message || "Operation failed");
      }
    } catch (err) {
      console.error("FAQ submit error:", err);
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (faqId) => {
    if (!window.confirm("Delete this FAQ?")) return;
    try {
      const response = await api.delete(`/faq/items/${faqId}`);
      const result = response.data;
      if (result.success) {
        toast.success("Deleted!");
        refetchFaqs();
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.error("FAQ delete error:", err);
      toast.error("Error deleting FAQ");
    }
  };

  const handleToggleStatus = async (faqId) => {
    try {
      const response = await api.patch(`/faq/items/${faqId}/toggle-status`);
      const result = response.data;
      if (result.success) {
        toast.success(result.message);
        refetchFaqs();
      }
    } catch (err) {
      console.error("FAQ toggle status error:", err);
      toast.error("Toggle failed");
    }
  };

  // CONTENT VIEW
  if (view === "content") {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={goToList}><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
            <h1 className="text-xl font-semibold text-gray-900">Edit FAQ Page Content</h1>
          </div>
          <Button onClick={handleSavePageContent} disabled={savingPageContent} className="bg-blue-500 hover:bg-blue-700">
            {savingPageContent ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Content
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle>Hero Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hero Title</Label>
                <Input value={pageContent.hero_title} onChange={e => setPageContent({...pageContent, hero_title: e.target.value})} placeholder="Frequently Asked Questions" />
              </div>
              <div className="space-y-2">
                <Label>Hero Subtitle</Label>
                <Input value={pageContent.hero_subtitle} onChange={e => setPageContent({...pageContent, hero_subtitle: e.target.value})} placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label>Hero Description</Label>
                <Textarea value={pageContent.hero_description} onChange={e => setPageContent({...pageContent, hero_description: e.target.value})} placeholder="Find answers to common questions here." rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Hero Image/Icon</Label>
                {heroImagePreview && (
                  <div className="relative w-32 h-32 mb-2">
                    <img src={heroImagePreview} alt="Hero" className="w-full h-full object-cover rounded border" />
                    <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 rounded-full" onClick={() => { setHeroImagePreview(null); setHeroImageFile(null); }}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="hero-image-upload" />
                  <Label htmlFor="hero-image-upload" className="cursor-pointer flex items-center justify-center p-2 border-2 border-dashed rounded-md hover:bg-gray-50 flex-1">
                    <Upload className="h-4 w-4 mr-2" />
                    {heroImagePreview ? "Change Image" : "Upload Image"}
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Call to Action Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>CTA Title</Label>
                <Input value={pageContent.cta_title} onChange={e => setPageContent({...pageContent, cta_title: e.target.value})} placeholder="Still have questions?" />
              </div>
              <div className="space-y-2">
                <Label>CTA Description</Label>
                <Textarea value={pageContent.cta_description} onChange={e => setPageContent({...pageContent, cta_description: e.target.value})} placeholder="Can't find what you're looking for?" rows={2} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Button Text</Label>
                  <Input value={pageContent.cta_button_text} onChange={e => setPageContent({...pageContent, cta_button_text: e.target.value})} placeholder="Contact Support" />
                </div>
                <div className="space-y-2">
                  <Label>Primary Button Link</Label>
                  <Input value={pageContent.cta_button_link} onChange={e => setPageContent({...pageContent, cta_button_link: e.target.value})} placeholder="/contact" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Secondary Button Text</Label>
                  <Input value={pageContent.cta_secondary_button_text} onChange={e => setPageContent({...pageContent, cta_secondary_button_text: e.target.value})} placeholder="View All FAQs" />
                </div>
                <div className="space-y-2">
                  <Label>Secondary Button Link</Label>
                  <Input value={pageContent.cta_secondary_button_link} onChange={e => setPageContent({...pageContent, cta_secondary_button_link: e.target.value})} placeholder="/faq" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // FORM VIEW
  if (view === "form") {
    return (
      <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={goToList}><ArrowLeft className="h-4 w-4 mr-2" /> Back</Button>
            <h1 className="text-xl font-semibold text-gray-900">{editingFaq ? "Edit FAQ" : "Add FAQ"}</h1>
          </div>
          <Button onClick={handleSubmitFaq} className="bg-blue-500 hover:bg-blue-700">
            <Save className="h-4 w-4 mr-2" />
            Save FAQ
          </Button>
        </div>

        <Card className="max-w-3xl">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2">
              <Label>Question *</Label>
              <Input 
                placeholder="What is..." 
                value={formData.question} 
                onChange={e => setFormData({...formData, question: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Answer *</Label>
              <Textarea 
                placeholder="The answer is..." 
                value={formData.answer} 
                onChange={e => setFormData({...formData, answer: e.target.value})} 
                rows={6}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Input 
                  placeholder="e.g. general, billing..." 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})} 
                />
              </div>
              <div className="space-y-2">
                <Label>Sort Order</Label>
                <Input 
                  type="number" 
                  value={formData.sort_order} 
                  onChange={e => setFormData({...formData, sort_order: parseInt(e.target.value) || 0})} 
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="is_active" 
                checked={formData.is_active} 
                onChange={e => setFormData({...formData, is_active: e.target.checked})}
                className="w-4 h-4"
              />
              <Label htmlFor="is_active">Active (visible on site)</Label>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // MAIN LIST VIEW
  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600 mt-2">Manage questions and page content</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={goToContent}>
            Edit Page Content
          </Button>
          <Button onClick={() => goToForm()} className="bg-blue-500 hover:bg-blue-700">
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
              <Input 
                placeholder="Search FAQs..." 
                className="pl-9" 
                value={searchQuery} 
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }} 
              />
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
          <CardTitle>FAQ Items ({pagination.total})</CardTitle>
        </CardHeader>
        <CardContent>
          {faqsLoading && !faqsData ? (
            <div className="py-12 text-center"><Loader2 className="h-8 w-8 animate-spin mx-auto" /></div>
          ) : faqs.length === 0 ? (
            <p className="text-center py-12 text-gray-500">No FAQs found. Click "Add FAQ" to create one.</p>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {faqs.map((faq) => (
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
                          <span className="text-xs text-gray-500">Order: {faq.sort_order}</span>
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

              {/* Pagination Controls */}
              {pagination.pages > 1 && (
                <div className="flex items-center justify-between px-2 py-4">
                  <div className="text-sm text-gray-500">
                    Showing page {pagination.page} of {pagination.pages} ({pagination.total} total)
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={pagination.page === 1}
                    >
                      Previous
                    </Button>
                    <div className="flex items-center gap-1">
                      {[...Array(pagination.pages)].map((_, i) => (
                        <Button
                          key={i + 1}
                          variant={pagination.page === i + 1 ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(i + 1)}
                          className="w-8 h-8 p-0"
                        >
                          {i + 1}
                        </Button>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(pagination.pages, p + 1))}
                      disabled={pagination.page === pagination.pages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-blue-600">{pagination.total}</div><p className="text-sm text-gray-600">Total</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-green-600">{faqs.filter(f => f.is_active).length}</div><p className="text-sm text-gray-600">Active</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-gray-600">{faqs.filter(f => !f.is_active).length}</div><p className="text-sm text-gray-600">Inactive</p></CardContent></Card>
        <Card><CardContent className="pt-6 text-center"><div className="text-3xl font-bold text-purple-600">{categories.length}</div><p className="text-sm text-gray-600">Categories</p></CardContent></Card>
      </div>
    </div>
  );
};

export default FAQs;