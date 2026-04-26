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
        if (data.success) {
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading contact info...</p>
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

      <div className="relative z-10">
        {/* Modern Hero Section */}
        <section className="relative bg-slate-950 pt-32 pb-24 overflow-hidden rounded-b-[4rem] shadow-2xl mb-20 min-h-[60vh] flex items-center">
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 scale-105 transition-transform duration-[10s] hover:scale-110"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1521791136364-798a7bc0d267?w=1600&q=80')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>

          {/* Dynamic Glow Backgrounds */}
          <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-emerald-600/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[50rem] h-[50rem] bg-teal-600/10 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-emerald-400 shadow-2xl mb-8 transform transition-all hover:scale-105 hover:bg-white/10">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Connect With Our Experts</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white font-t2-heading leading-[1.1]">
                {pageContent.hero_title}
              </h1>
              
              <p className="text-xl md:text-2xl text-emerald-400/90 font-medium mb-6 tracking-wide uppercase">
                {pageContent.hero_subtitle}
              </p>
              
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-12 drop-shadow-md">
                {pageContent.hero_description}
              </p>

              <div className="flex justify-center gap-4">
                <a href="#form" className="p-4 bg-emerald-600 rounded-full text-white hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/20">
                  <Clock className="w-6 h-6" />
                </a>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">Response Time</p>
                  <p className="text-slate-400 text-xs">Under 24 Hours</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 lg:px-8 py-12 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div className="relative group" id="form">
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative bg-white rounded-[3rem] shadow-2xl p-10 md:p-14 border border-slate-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[5rem] -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>
                
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold text-slate-900 mb-4 font-t2-heading tracking-tight">
                    {pageContent.form_title}
                  </h2>
                  <p className="text-slate-500 font-light mb-10 leading-relaxed">
                    {pageContent.form_description}
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                        <input
                          type="email"
                          required
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                      <input
                        type="text"
                        required
                        placeholder="Inquiry about products..."
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Message</label>
                      <textarea
                        rows="5"
                        required
                        placeholder="Tell us how we can help..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all text-slate-900 placeholder:text-slate-300 font-medium resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="group relative w-full bg-slate-950 text-white py-6 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] overflow-hidden shadow-2xl shadow-slate-950/20 hover:shadow-emerald-500/20 transition-all duration-500 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70"
                    >
                      <div className="absolute inset-0 bg-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                      <span className="relative z-10 flex items-center justify-center gap-3">
                        {submitting ? "Sending Connection..." : success ? "Inquiry Delivered!" : (
                          <>Dispatch Message <Send className="w-4 h-4" /></>
                        )}
                      </span>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Address Card */}
                <div className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-100 transition-all duration-500">
                  <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 font-t2-heading">{pageContent.address_title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: pageContent.address }} />
                </div>

                {/* Contact Info Card */}
                <div className="p-8 rounded-[2.5rem] bg-slate-950 shadow-2xl border border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6">
                      <Mail className="w-5 h-5 text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-4 font-t2-heading">Digital Connection</h4>
                    <a href={`mailto:${pageContent.email}`} className="text-emerald-400 text-sm font-medium hover:text-emerald-300 transition-colors block mb-2 underline decoration-emerald-500/30 underline-offset-4">
                      {pageContent.email}
                    </a>
                    <a href={`tel:${pageContent.phone.replace(/\D/g, '')}`} className="text-white/60 text-sm hover:text-white transition-colors">
                      {pageContent.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours & Presence */}
              <div className="p-10 rounded-[3rem] bg-emerald-50 border border-emerald-100 relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-emerald-100 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 font-t2-heading">{pageContent.business_hours_title}</h4>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: pageContent.business_hours }} />
                </div>
              </div>

              {/* Map Embed Placeholder */}
              {pageContent.map_embed_url ? (
                <div className="rounded-[3rem] overflow-hidden h-72 shadow-2xl border-4 border-white">
                  <iframe
                    src={pageContent.map_embed_url}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    title="Office Location"
                  ></iframe>
                </div>
              ) : (
                <div className="rounded-[3rem] overflow-hidden h-72 bg-slate-200 flex items-center justify-center border-4 border-white shadow-xl relative group">
                  <div className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url(${pageContent.office_image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80'})` }}></div>
                  <div className="relative z-10 p-8 text-center bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                    <MapPin className="w-8 h-8 text-white mx-auto mb-2" />
                    <p className="text-white font-bold text-xs uppercase tracking-widest">Wellness Hub Location</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Premium CTA Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-32">
          <div className="relative rounded-[4rem] overflow-hidden">
            {/* CTA Background */}
            <div className="absolute inset-0 bg-slate-950"></div>
            <div className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-emerald-600/10 rounded-full blur-[140px] translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="relative z-10 px-8 py-24 sm:py-32 text-center border border-white/5 rounded-[4rem] bg-white/[0.02] backdrop-blur-3xl">
              <div className="max-w-3xl mx-auto">
                <h3 className="text-4xl sm:text-6xl font-bold mb-8 text-white tracking-tight font-t2-heading leading-tight">
                  {pageContent.cta_title}
                </h3>
                
                <p className="text-lg sm:text-xl text-slate-400 mb-12 font-light leading-relaxed">
                  {pageContent.cta_description}
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <a
                    href={pageContent.cta_button_link}
                    className="bg-emerald-600 text-white font-bold px-12 py-5 rounded-[2rem] hover:bg-emerald-500 hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] transition-all duration-300 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transform hover:-translate-y-1"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    {pageContent.cta_button_text}
                  </a>
                  <a
                    href={pageContent.cta_secondary_button_link}
                    className="bg-white/5 text-white border border-white/10 font-bold px-12 py-5 rounded-[2rem] hover:bg-white/10 transition-all duration-300 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3"
                  >
                    <MessageCircle className="w-5 h-5" />
                    {pageContent.cta_secondary_button_text}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Template2Contact;