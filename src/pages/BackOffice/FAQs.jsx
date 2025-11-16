import React from 'react';
import { Plus, Search, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
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
const FAQs = () => {

  const [open, setOpen] = React.useState(false);
  const [expandedId, setExpandedId] = React.useState(null);
  const [formData, setFormData] = React.useState({
    question: '',
    answer: '',
    category: ''
  });

  const faqs = [
    {
      id: 1,
      question: 'How long does shipping take?',
      answer: 'Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery.',
      category: 'Shipping',
      status: 'Published'
    },
    {
      id: 2,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay.',
      category: 'Payment',
      status: 'Published'
    },
    {
      id: 3,
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging, and accompanied by proof of purchase.',
      category: 'Returns',
      status: 'Published'
    },
    {
      id: 4,
      question: 'How can I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can also track your order by logging into your account.',
      category: 'Orders',
      status: 'Published'
    },
    {
      id: 5,
      question: 'Do you offer international shipping?',
      answer: 'Yes, we ship to over 50 countries worldwide. International shipping times vary by location.',
      category: 'Shipping',
      status: 'Draft'
    }
  ];

  const handleSubmit = () => {
    console.log('FAQ data:', formData);
    toast.success("FAQ Added! The new FAQ has been added successfully.");
    setOpen(false);
    setFormData({ question: '', answer: '', category: '' });
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <Toaster />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">FAQs</h1>
          <p className="text-gray-600 mt-1">Manage frequently asked questions</p>
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
              <DialogDescription>
                Create a new frequently asked question
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shipping">Shipping</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="returns">Returns</SelectItem>
                    <SelectItem value="orders">Orders</SelectItem>
                    <SelectItem value="account">Account</SelectItem>
                  </SelectContent>
                </Select>
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                Add FAQ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search FAQs..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="returns">Returns</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="account">Account</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-status">
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* FAQs List */}
      <Card>
        <CardHeader>
          <CardTitle>All FAQs ({faqs.length})</CardTitle>
          <CardDescription>Manage your frequently asked questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border rounded-lg">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleExpand(faq.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <Badge variant="outline">{faq.category}</Badge>
                      <Badge className={faq.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                        {faq.status}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-900">{faq.question}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                    {expandedId === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>
                {expandedId === faq.id && (
                  <div className="px-4 pb-4 pt-2 border-t bg-gray-50">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
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
                {faqs.filter(f => f.status === 'Published').length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Published</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-600">
                {faqs.filter(f => f.status === 'Draft').length}
              </div>
              <p className="text-sm text-gray-600 mt-1">Drafts</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">5</div>
              <p className="text-sm text-gray-600 mt-1">Categories</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FAQs;