import { useState, useEffect } from "react";
import { Sparkles, Mail, Phone, MapPin, Clock, Send, MessageCircle, ShoppingBag } from "lucide-react";

const Template2Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const [pageContent, setPageContent] = useState({
    hero_title: "Get In Touch",
    hero_subtitle: "We'd love to hear from you",
    hero_description: "Have a question about our products? Need help with an order? Our team is here to help 24/7.",
    hero_button_text: "Send Message",
    hero_button_link: "#form",
    hero_image_url: "https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y29udGFjdHxlbnwwfHwwfHx8MA%3D%3D",
    
    office_title: "Visit Our Office",
    office_subtitle: "We're here to help in person too",
    office_image_url: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b2ZmaWNlfGVufDB8fDB8fHww",
    
    address_title: "Address",
    address: "123 Wellness Avenue, Suite 500<br/>Los Angeles, CA 90210<br/>United States",
    
    email_title: "Email Us",
    email: "support@khushidon.com",
    
    phone_title: "Call Us",
    phone: "+1 (555) 123-4567",
    
    business_hours_title: "Business Hours",
    business_hours: "Monday - Friday: 9:00 AM - 6:00 PM<br/>Saturday: 10:00 AM - 4:00 PM<br/>Sunday: Closed",
    
    form_title: "Send Us a Message",
    form_description: "Fill out the form below and we'll get back to you within 24 hours",
    
    cta_title: "Ready to Transform Your Health?",
    cta_description: "Join thousands who trust us for premium wellness supplements",
    cta_button_text: "Shop Now",
    cta_button_link: "/products",
    cta_secondary_button_text: "Live Chat",
    cta_secondary_button_link: "/chat",
    
    map_embed_url: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/contact-page-content');
        const data = await response.json();
        if (data.success && data.data) {
          setPageContent(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contact data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center pt-24">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-slate-500 font-medium">Loading contact info...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-t2-body overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 pt-6">
        {/* PREMIUM ENTERPRISE DARK CONTRAST HERO */}
        <section className="relative bg-gradient-to-br from-[#064e3b] via-[#043e2f] to-[#022e22] text-white pt-28 pb-20 overflow-hidden border-b border-[#064e3b]/80 shadow-md min-h-[55vh] flex items-center w-full">
          {/* Subtle background overlay image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10 mix-blend-overlay scale-105"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1521791136364-798a7bc0d267?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#043e2f]/90 via-[#043e2f]/50 to-transparent"></div>

          <div className="container mx-auto px-6 relative z-10 w-full">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left Column - Contact Intro */}
              <div className="lg:col-span-7 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 mb-6 shadow-sm">
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-xs font-bold tracking-wider uppercase">Connect With Our Experts</span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 tracking-tight text-white font-t2-heading leading-tight">
                  {pageContent.hero_title}
                </h1>
                
                <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-4">
                  {pageContent.hero_subtitle}
                </p>
                
                <p className="text-base text-emerald-100/80 font-light leading-relaxed mb-8 max-w-xl">
                  {pageContent.hero_description}
                </p>

                <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/25 p-3 px-5 rounded-2xl">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-white font-bold text-xs">Response Time</p>
                    <p className="text-emerald-300 text-[10px] font-semibold uppercase tracking-wider">Under 24 Hours</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Image visual */}
              <div className="lg:col-span-5 hidden lg:flex flex-col items-center justify-center relative">
                <div className="relative w-full max-w-[380px] aspect-square rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl p-2 bg-gradient-to-tr from-white/5 to-white/10 backdrop-blur-sm">
                  <img
                    src="https://images.unsplash.com/photo-1521791136364-798a7bc0d267?w=800&q=80"
                    alt="Customer Support Visual"
                    className="w-full h-full object-cover rounded-[1.8rem]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#043e2f]/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-6 py-12 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="relative group" id="form">
              <div className="relative bg-white rounded-2xl shadow-sm p-8 md:p-10 border border-slate-200/60 overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -mr-6 -mt-6 transition-transform group-hover:scale-105"></div>
                
                <div className="relative z-10">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 font-t2-heading">
                    {pageContent.form_title}
                  </h2>
                  <p className="text-slate-500 font-light mb-8 text-xs leading-relaxed">
                    {pageContent.form_description}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-300 font-medium"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-300 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                      <input
                        type="text"
                        required
                        placeholder="Inquiry about products..."
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-300 font-medium"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea
                        rows="4"
                        required
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 outline-none transition-all text-sm text-slate-900 placeholder:text-slate-300 font-medium resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative w-full bg-emerald-600 text-white py-3.5 rounded-xl font-bold uppercase tracking-wider text-[10px] overflow-hidden shadow-sm hover:bg-emerald-700 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {submitting ? "Sending..." : success ? "Inquiry Delivered!" : (
                          <>Dispatch Message <Send className="w-3.5 h-3.5" /></>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Address Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-100 transition-all duration-300">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 border border-emerald-100">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 font-t2-heading">{pageContent.address_title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: pageContent.address }} />
                </div>

                {/* Contact Info Card */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-emerald-100 transition-all duration-300">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 border border-emerald-100">
                    <Mail className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2 font-t2-heading">Digital Connection</h4>
                  <a href={`mailto:${pageContent.email}`} className="text-emerald-600 text-xs font-semibold hover:underline block mb-1">
                    {pageContent.email}
                  </a>
                  <a href={`tel:${pageContent.phone.replace(/\D/g, '')}`} className="text-slate-500 text-xs hover:text-slate-700 transition-colors">
                    {pageContent.phone}
                  </a>
                </div>
              </div>

              {/* Hours & Presence */}
              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100/50 relative overflow-hidden group">
                <div className="relative z-10 flex items-start gap-4">
                  <div className="w-8 h-8 bg-white rounded-lg shadow-sm flex items-center justify-center flex-shrink-0 text-emerald-600 border border-emerald-100">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-t2-heading mb-1">{pageContent.business_hours_title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: pageContent.business_hours }} />
                  </div>
                </div>
              </div>

              {/* Map/Office Image */}
              <div className="rounded-2xl overflow-hidden h-48 bg-slate-200 border border-slate-200 shadow-sm relative group">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: `url(${pageContent.office_image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                <div className="relative z-10 p-4 absolute bottom-4 left-4 bg-white/90 backdrop-blur rounded-xl border border-slate-100">
                  <p className="text-slate-800 font-bold text-[10px] uppercase tracking-wider">iGrow Big HQ</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA Section */}
        <section className="bg-white py-24 border-t border-slate-100">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 border border-emerald-100/50 p-12 md:p-16 text-center shadow-sm">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-slate-900 tracking-tight font-t2-heading leading-tight">
                {pageContent.cta_title}
              </h3>
              
              <p className="text-sm text-slate-600 mb-8 max-w-lg mx-auto font-light leading-relaxed">
                {pageContent.cta_description}
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={pageContent.cta_button_link}
                  className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {pageContent.cta_button_text}
                </a>
                <a
                  href={pageContent.cta_secondary_button_link}
                  className="bg-white text-slate-700 border border-slate-200 font-bold px-6 py-3 rounded-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" />
                  {pageContent.cta_secondary_button_text}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2Contact;