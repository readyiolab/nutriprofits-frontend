import React from 'react';
import { Search, HelpCircle, ShoppingCart, CreditCard, Truck, RotateCcw, Shield, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const categories = [
    { id: 'orders', label: 'Orders & Shipping', icon: <Truck className="h-5 w-5" /> },
    { id: 'payments', label: 'Payment & Pricing', icon: <CreditCard className="h-5 w-5" /> },
    { id: 'returns', label: 'Returns & Refunds', icon: <RotateCcw className="h-5 w-5" /> },
    { id: 'account', label: 'Account & Security', icon: <Shield className="h-5 w-5" /> }
  ];

  const faqs = {
    orders: [
      {
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 day delivery. International orders may take 7-14 business days depending on the destination."
      },
      {
        question: "How can I track my order?",
        answer: "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account and visiting the 'My Orders' section."
      },
      {
        question: "Do you offer free shipping?",
        answer: "Yes! We offer free standard shipping on all orders over $50. For orders under $50, a flat shipping fee of $5.99 applies."
      },
      {
        question: "Can I change my shipping address after placing an order?",
        answer: "You can change your shipping address within 1 hour of placing your order. Please contact our customer service immediately. Once the order is processed, we cannot modify the address."
      },
      {
        question: "What if my package is lost or damaged?",
        answer: "If your package is lost or arrives damaged, please contact us within 48 hours of the expected delivery date. We'll investigate and arrange a replacement or full refund."
      }
    ],
    payments: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secure and encrypted."
      },
      {
        question: "Is it safe to use my credit card on your site?",
        answer: "Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your complete credit card details on our servers."
      },
      {
        question: "Do you offer price matching?",
        answer: "Yes! If you find a lower price on an identical product within 7 days of purchase, we'll refund the difference. Terms and conditions apply."
      },
      {
        question: "Can I use multiple discount codes?",
        answer: "Only one discount code can be applied per order. If you have multiple codes, the system will automatically apply the one that gives you the best discount."
      },
      {
        question: "When will I be charged for my order?",
        answer: "Your payment method is charged when your order is processed and confirmed, which is typically within a few minutes of placing the order."
      }
    ],
    returns: [
      {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy on most items. Products must be unused, in original packaging, and accompanied by proof of purchase. Some items like personalized products are not eligible for return."
      },
      {
        question: "How do I start a return?",
        answer: "Log into your account, go to 'My Orders', select the item you want to return, and click 'Return Item'. Follow the instructions to print your prepaid return label."
      },
      {
        question: "When will I receive my refund?",
        answer: "Refunds are processed within 5-7 business days after we receive your return. The refund will be issued to your original payment method. Please allow an additional 3-5 days for the funds to appear in your account."
      },
      {
        question: "Do I have to pay for return shipping?",
        answer: "Return shipping is free for defective items or wrong items shipped. For other returns, a flat return shipping fee of $6.99 will be deducted from your refund."
      },
      {
        question: "Can I exchange an item instead of returning it?",
        answer: "Yes! If you want a different size, color, or variation, you can initiate an exchange. The process is similar to returns, and we'll ship the replacement once we receive your original item."
      }
    ],
    account: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' at the top of any page, enter your email and create a password. You can also sign up using your Google or Facebook account for faster registration."
      },
      {
        question: "I forgot my password. What should I do?",
        answer: "Click 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link is valid for 24 hours."
      },
      {
        question: "How do I update my account information?",
        answer: "Log into your account and go to 'Account Settings'. Here you can update your name, email, password, shipping addresses, and payment methods."
      },
      {
        question: "Is my personal information secure?",
        answer: "Yes! We take security seriously. Your data is encrypted, and we comply with GDPR and other data protection regulations. We never sell your personal information to third parties."
      },
      {
        question: "How do I delete my account?",
        answer: "To delete your account, go to Account Settings and click 'Delete Account'. Please note that this action is permanent and will remove all your order history and saved information."
      }
    ]
  };

  const quickHelp = [
    {
      icon: <ShoppingCart className="h-8 w-8 text-blue-600" />,
      title: "Place an Order",
      description: "Step-by-step guide to shopping"
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Track Shipping",
      description: "Monitor your delivery status"
    },
    {
      icon: <RotateCcw className="h-8 w-8 text-blue-600" />,
      title: "Process Return",
      description: "Easy returns within 30 days"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Contact Support",
      description: "We're here to help 24/7"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <HelpCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-blue-100 mb-8">
              Find answers to common questions about shopping with ShopHub
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="pl-12 py-6 text-lg bg-white text-gray-900"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Help Cards */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickHelp.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer bg-white">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {item.icon}
                </div>
                <CardTitle className="text-lg">{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container mx-auto px-4 py-16">
        <Tabs defaultValue="orders" className="max-w-5xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(faqs).map(([key, questions]) => (
            <TabsContent key={key} value={key}>
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {categories.find(c => c.id === key)?.icon}
                    {categories.find(c => c.id === key)?.label}
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{questions.length} Questions</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-lg font-medium hover:text-blue-600">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 text-base leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Still Need Help Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 text-white border-none">
            <CardContent className="text-center py-12">
              <MessageCircle className="h-16 w-16 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
              <p className="text-xl text-blue-100 mb-8">
                Our customer support team is available 24/7 to assist you
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Live Chat
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FAQ;