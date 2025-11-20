import React from 'react';
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronUp, Loader2, Save, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Toaster, toast } from 'sonner';
import { useFetch } from '@/hooks';

const FAQs = () => {
  const [open, setOpen] = React.useState(false);
  const [editOpen, setEditOpen] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('all');
  const [statusFilter, setStatusFilter] = React.useState('all-status');
  const [editingFaq, setEditingFaq] = React.useState(null);
  const [savingPageContent, setSavingPageContent] = React.useState(false);

  const [pageContent, setPageContent] = React.useState({
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    cta_title: '',
    cta_description: '',
    cta_button_text: '',
    cta_button_link: '',
    cta_secondary_button_text: '',
    cta_secondary_button_link: '',
  });

  const [formData, setFormData] = React.useState({
    question: '',
    answer: '',
    category: '',
    display_order: 0,
    is_active: true,
  });

  const backofficeId = React.useMemo(() => {
    return localStorage.getItem('backofficeId') || '1';
  }, []);

  const token = localStorage.getItem('token');

  // Fetch page content, FAQs, and categories using custom hooks
  const {
    data: fetchedPageContent,
    loading: pageContentLoading,
    refetch: refetchPageContent,
  } = useFetch(
    `http://localhost:3000/api/faq/${backofficeId}/page-content`,
    { immediate: true, showToast: false }
  );

  const {
    data: faqsData,
    loading: faqsLoading,
    refetch: refetchFaqs,
  } = useFetch(
    `http://localhost:3000/api/faq/${backofficeId}/items`,
    { immediate: true, showToast: false }
  );

  const {
    data: categoriesData,
    refetch: refetchCategories,
  } = useFetch(
    `http://localhost:3000/api/faq/${backofficeId}/categories`,
    { immediate: true, showToast: false }
  );

  // Ensure faqs and categories are arrays
  const faqs = Array.isArray(faqsData) ? faqsData : (faqsData?.data || []);
  const categories = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);

  // Update pageContent when fetched
  React.useEffect(() => {
    if (fetchedPageContent) {
      setPageContent({
        hero_title: fetchedPageContent.hero_title || '',
        hero_subtitle: fetchedPageContent.hero_subtitle || '',
        hero_description: fetchedPageContent.hero_description || '',
        cta_title: fetchedPageContent.cta_title || '',
        cta_description: fetchedPageContent.cta_description || '',
        cta_button_text: fetchedPageContent.cta_button_text || '',
        cta_button_link: fetchedPageContent.cta_button_link || '',
        cta_secondary_button_text: fetchedPageContent.cta_secondary_button_text || '',
        cta_secondary_button_link: fetchedPageContent.cta_secondary_button_link || '',
      });
    }
  }, [fetchedPageContent]);

  const handleSavePageContent = async () => {
    try {
      setSavingPageContent(true);
      const response = await fetch(`http://localhost:3000/api/faq/${backofficeId}/page-content/upsert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(pageContent),
      });
      const result = await response.json();
      if (result.success) {
        toast.success('Page content saved successfully!');
        refetchPageContent();
      } else {
        toast.error(result.message || 'Failed to save page content');
      }
    } catch (error) {
      console.error('Error saving page content:', error);
      toast.error('Failed to save page content');
    } finally {
      setSavingPageContent(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.question || !formData.answer) {
      toast.error('Question and answer are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/faq/${backofficeId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        toast.success('FAQ added successfully!');
        setOpen(false);
        setFormData({ question: '', answer: '', category: '', display_order: 0, is_active: true });
        refetchFaqs();
        refetchCategories();
      } else {
        toast.error(result.message || 'Failed to add FAQ');
      }
    } catch (error) {
      console.error('Error adding FAQ:', error);
      toast.error('Failed to add FAQ');
    }
  };

  const handleEdit = (faq) => {
    setEditingFaq(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || '',
      display_order: faq.display_order || 0,
      is_active: faq.is_active,
    });
    setEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!formData.question || !formData.answer) {
      toast.error('Question and answer are required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/faq/${backofficeId}/items/${editingFaq.faq_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update failed:', response.status, errorText);
        toast.error(`Failed to update FAQ (${response.status})`);
        return;
      }
      
      const result = await response.json();
      if (result.success) {
        toast.success('FAQ updated successfully!');
        setEditOpen(false);
        setEditingFaq(null);
        setFormData({ question: '', answer: '', category: '', display_order: 0, is_active: true });
        refetchFaqs();
        refetchCategories();
      } else {
        toast.error(result.message || 'Failed to update FAQ');
      }
    } catch (error) {
      console.error('Error updating FAQ:', error);
      toast.error('Failed to update FAQ: ' + error.message);
    }
  };

  const handleDelete = async (faqId) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;

    try {
      const response = await fetch(`http://localhost:3000/api/faq/${backofficeId}/items/${faqId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete failed:', response.status, errorText);
        toast.error(`Failed to delete FAQ (${response.status})`);
        return;
      }
      
      const result = await response.json();
      if (result.success) {
        toast.success('FAQ deleted successfully!');
        refetchFaqs();
        refetchCategories();
      } else {
        toast.error(result.message || 'Failed to delete FAQ');
      }
    } catch (error) {
      console.error('Error deleting FAQ:', error);
      toast.error('Failed to delete FAQ: ' + error.message);
    }
  };

  const handleToggleStatus = async (faqId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/faq/${backofficeId}/items/${faqId}/toggle-status`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Toggle status failed:', response.status, errorText);
        toast.error(`Failed to toggle status (${response.status})`);
        return;
      }
      
      const result = await response.json();
      if (result.success) {
        toast.success(result.message);
        refetchFaqs();
      } else {
        toast.error(result.message || 'Failed to toggle status');
      }
    } catch (error) {
      console.error('Error toggling status:', error);
      toast.error('Failed to toggle status: ' + error.message);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    const matchesStatus = statusFilter === 'all-status' || 
                         (statusFilter === 'active' && faq.is_active) ||
                         (statusFilter === 'inactive' && !faq.is_active);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (pageContentLoading || faqsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQ Management</h1>
          <p className="text-gray-600 mt-1">Manage frequently asked questions and page content</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
              <DialogDescription>Create a new frequently asked question</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Shipping, Payment, Returns"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Input
                  id="question"
                  placeholder="Enter the question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer</Label>
                <Textarea
                  id="answer"
                  placeholder="Enter the answer"
                  rows={5}
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_order">Display Order</Label>
                <Input
                  id="display_order"
                  type="number"
                  placeholder="0"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">Add FAQ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>Update the frequently asked question</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                placeholder="e.g., Shipping, Payment, Returns"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-question">Question</Label>
              <Input
                id="edit-question"
                placeholder="Enter the question"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-answer">Answer</Label>
              <Textarea
                id="edit-answer"
                placeholder="Enter the answer"
                rows={5}
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-display_order">Display Order</Label>
              <Input
                id="edit-display_order"
                type="number"
                placeholder="0"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">Update FAQ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Page Content Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>FAQ Page Content</CardTitle>
              <CardDescription>Manage hero and CTA sections</CardDescription>
            </div>
            <Button onClick={handleSavePageContent} disabled={savingPageContent} className="bg-blue-600 hover:bg-blue-700">
              {savingPageContent ? (
                <><Loader2 className="h-4 w-4 mr-2 animate-spin" />Saving...</>
              ) : (
                <><Save className="h-4 w-4 mr-2" />Save Content</>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Hero Section</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero_title">Title</Label>
                <Input
                  id="hero_title"
                  value={pageContent.hero_title}
                  onChange={(e) => setPageContent({ ...pageContent, hero_title: e.target.value })}
                  placeholder="e.g., Frequently Asked Questions"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero_subtitle">Subtitle</Label>
                <Input
                  id="hero_subtitle"
                  value={pageContent.hero_subtitle}
                  onChange={(e) => setPageContent({ ...pageContent, hero_subtitle: e.target.value })}
                  placeholder="e.g., Find answers to common questions"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero_description">Description</Label>
              <Textarea
                id="hero_description"
                rows={3}
                value={pageContent.hero_description}
                onChange={(e) => setPageContent({ ...pageContent, hero_description: e.target.value })}
                placeholder="Brief description for the hero section"
              />
            </div>
          </div>
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-lg">Call-to-Action Section</h3>
            <div className="space-y-2">
              <Label htmlFor="cta_title">CTA Title</Label>
              <Input
                id="cta_title"
                value={pageContent.cta_title}
                onChange={(e) => setPageContent({ ...pageContent, cta_title: e.target.value })}
                placeholder="e.g., Still have questions?"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cta_description">CTA Description</Label>
              <Textarea
                id="cta_description"
                rows={3}
                value={pageContent.cta_description}
                onChange={(e) => setPageContent({ ...pageContent, cta_description: e.target.value })}
                placeholder="Encourage users to contact you"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cta_button_text">Button Text</Label>
                <Input
                  id="cta_button_text"
                  value={pageContent.cta_button_text}
                  onChange={(e) => setPageContent({ ...pageContent, cta_button_text: e.target.value })}
                  placeholder="e.g., Contact Support"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta_button_link">Button Link</Label>
                <Input
                  id="cta_button_link"
                  value={pageContent.cta_button_link}
                  onChange={(e) => setPageContent({ ...pageContent, cta_button_link: e.target.value })}
                  placeholder="e.g., /contact"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search FAQs..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
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
          <CardDescription>Manage your frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No FAQs found. Add your first FAQ to get started.</p>
            ) : (
              filteredFaqs.map((faq) => (
                <div key={faq.faq_id} className="border rounded-lg">
                  <div 
                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => toggleExpand(faq.faq_id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        {faq.category && <Badge variant="outline">{faq.category}</Badge>}
                        <Badge className={faq.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                          {faq.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                        <span className="text-xs text-gray-500">Order: {faq.display_order}</span>
                      </div>
                      <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => { e.stopPropagation(); handleToggleStatus(faq.faq_id); }}
                        title={faq.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {faq.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleEdit(faq); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); handleDelete(faq.faq_id); }}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                      {expandedId === faq.faq_id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                  {expandedId === faq.faq_id && (
                    <div className="px-4 pb-4 pt-2 border-t bg-gray-50">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{faqs.length}</div>
              <p className="text-sm text-gray-600 mt-1">Total FAQs</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {faqs.filter(f => f.is_active).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">
                {faqs.filter(f => !f.is_active).length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Inactive</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
              <p className="text-sm text-gray-600 mt-1">Categories</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQs;