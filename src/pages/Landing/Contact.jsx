import React from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Toaster, toast } from 'sonner';

const Contact = () => {
  
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

 const handleSubmit = (e) => {
    e.preventDefault();

    
    toast.success("Message sent! We'll get back to you within 24 hours.");

    setFormData({ name: '', email: '', subject: '', message: '' });
  };

 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8 text-blue-600" />,
      title: "Phone",
      description: "Call us Monday to Friday, 9am - 6pm EST",
      detail: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      icon: <Mail className="h-8 w-8 text-blue-600" />,
      title: "Email",
      description: "We'll respond within 24 hours",
      detail: "support@shophub.com",
      action: "Send Email"
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: "Live Chat",
      description: "Chat with our support team",
      detail: "Available 24/7",
      action: "Start Chat"
    }
  ];

  const offices = [
    {
      city: "New York",
      address: "123 Business Street, Suite 100",
      state: "NY 10001",
      country: "United States",
      phone: "+1 (555) 123-4567"
    },
    {
      city: "Los Angeles",
      address: "456 Commerce Ave, Floor 5",
      state: "CA 90001",
      country: "United States",
      phone: "+1 (555) 234-5678"
    },
    {
      city: "London",
      address: "78 Oxford Street",
      state: "London W1D 1BS",
      country: "United Kingdom",
      phone: "+44 20 1234 5678"
    }
  ];

  const faqs = [
    {
      question: "What are your business hours?",
      answer: "Our customer service is available 24/7 via live chat and email. Phone support is available Monday to Friday, 9am - 6pm EST."
    },
    {
      question: "How quickly will I receive a response?",
      answer: "We aim to respond to all inquiries within 24 hours. Live chat responses are typically immediate during business hours."
    },
    {
      question: "Can I visit your office?",
      answer: "Our offices are open for visits by appointment only. Please contact us in advance to schedule a visit."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster />
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <Headphones className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl text-blue-100">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow bg-white">
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {method.icon}
                </div>
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <CardDescription className="text-sm">{method.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-gray-900 mb-4">{method.detail}</p>
                <Button variant="outline" className="w-full hover:bg-blue-600 hover:text-white">
                  {method.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Select name="subject" onValueChange={(value) => setFormData({...formData, subject: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="order">Order Support</SelectItem>
                        <SelectItem value="product">Product Question</SelectItem>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us how we can help you..."
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button onClick={handleSubmit} className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info & Hours */}
          <div className="space-y-6">
            {/* Office Hours */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  <CardTitle className="text-xl">Business Hours</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
                <div className="pt-3 border-t">
                  <p className="text-sm text-gray-600">
                    Live chat available 24/7
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick FAQ */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Quick Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-900">{faq.question}</h4>
                    <p className="text-sm text-gray-600">{faq.answer}</p>
                    {index < faqs.length - 1 && <div className="border-b pt-2" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Our Offices</h2>
            <p className="text-gray-600">Visit us at one of our locations worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                    <div>
                      <CardTitle className="text-xl mb-1">{office.city}</CardTitle>
                      <CardDescription className="text-sm">{office.country}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-600">{office.address}</p>
                  <p className="text-gray-600">{office.state}</p>
                  <div className="pt-3 border-t mt-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{office.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <Card className="border-none shadow-lg overflow-hidden mb-16">
          <div className="h-96 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-8">
              <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">Interactive Map</p>
              <p className="text-gray-500 text-sm mt-2">123 Business Street, New York, NY 10001</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;