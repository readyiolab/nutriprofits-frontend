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

  // Dynamic content from your tbl_contact_page_content
  const [pageContent, setPageContent] = useState({
    hero_title: "Get In Touch",
    hero_subtitle: "We'd love to hear from you",
    hero_description: "Have a question about our products? Need help with an order? Our team is here to help 24/7.",
    
    office_title: "Visit Our Office",
    office_subtitle: "We're here to help in person too",
    
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
    
    map_embed_url: "https://www.google.com/maps/embed?pb=..."
  });

  useEffect(() => {
    // Simulate loading (replace with real API call later)
    setTimeout(() => setLoading(false), 600);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSuccess(true);
    setSubmitting(false);
    setTimeout(() => setSuccess(false), 5000);
    setFormData({ name: "", email: "", subject: "", message: "" });
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Hero Section - Same as All Other Pages */}
      <div className="relative overflow-hidden bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">Contact Us</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium mb-6 leading-tight">
              {pageContent.hero_title}
            </h1>
            <p className="text-xl text-white/90 mb-6 max-w-2xl mx-auto">
              {pageContent.hero_subtitle}
            </p>
            <p className="text-lg text-white/80 max-w-3xl mx-auto">
              {pageContent.hero_description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10 border border-purple-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {pageContent.form_title}
            </h2>
            <p className="text-gray-600 mb-8">{pageContent.form_description}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-black focus:outline-none transition text-base"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-black focus:outline-none transition text-base"
                />
              </div>

              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                required
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-black focus:outline-none transition text-base"
              />

              <textarea
                rows="6"
                placeholder="Your Message..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                required
                className="w-full px-6 py-4 rounded-xl border border-gray-300 focus:border-black focus:outline-none transition text-base resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-black text-white py-5 rounded-xl font-bold text-lg hover:shadow-2xl hover:bg-gray-900 transition flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {submitting ? (
                  <>Sending...</>
                ) : success ? (
                  <>Message Sent Successfully!</>
                ) : (
                  <>
                    Send Message <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>

 
          <div className="space-y-8">
            {/* Office Info Card */}
            <div className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)] rounded-3xl shadow-2xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-2">{pageContent.office_title}</h3>
              <p className="text-white/90 mb-8">{pageContent.office_subtitle}</p>

              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{pageContent.address_title}</p>
                    <p className="text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: pageContent.address }} />
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{pageContent.email_title}</p>
                    <a href={`mailto:${pageContent.email}`} className="text-white/90 hover:text-white transition underline">
                      {pageContent.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{pageContent.phone_title}</p>
                    <a href={`tel:${pageContent.phone.replace(/\D/g, '')}`} className="text-white/90 hover:text-white transition">
                      {pageContent.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{pageContent.business_hours_title}</p>
                    <p className="text-white/90 leading-relaxed" dangerouslySetInnerHTML={{ __html: pageContent.business_hours }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Map (Optional) */}
            {pageContent.map_embed_url && (
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-80">
                <iframe
                  src={pageContent.map_embed_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Our Location"
                ></iframe>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[radial-gradient(circle_at_center,_#3b82f6,_#1e3a8a)]
     py-12 sm:py-20 mb-10 mx-4 sm:mx-12 rounded-2xl sm:rounded-3xl 
     shadow-2xl overflow-hidden">

  <div className="container mx-auto px-3 sm:px-4 text-center text-white">

    <h3 className="text-2xl sm:text-4xl font-semibold mb-3 sm:mb-4 leading-tigh">
      {pageContent.cta_title}
    </h3>

    <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-12 
                  max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
      {pageContent.cta_description}
    </p>

    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">

      {/* Primary button */}
      <a
        href={pageContent.cta_button_link}
        className="bg-white text-black font-medium 
                   px-6 py-3 sm:px-10 sm:py-5 rounded-full 
                   hover:shadow-2xl transition 
                   text-base sm:text-lg 
                   flex items-center justify-center gap-3 
                   w-full sm:w-auto mx-auto sm:mx-0"
      >
        {pageContent.cta_button_text} 
        <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>

      {/* Secondary button */}
      <a
        href={pageContent.cta_secondary_button_link}
        className="border-2 border-white text-white 
                   px-6 py-3 sm:px-10 sm:py-5 rounded-full 
                   hover:bg-white hover:text-black transition 
                   font-medium text-base sm:text-lg 
                   flex items-center justify-center gap-3 
                   w-full sm:w-auto mx-auto sm:mx-0"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" /> {pageContent.cta_secondary_button_text}
      </a>
    </div>
  </div>
</div>

    </div>
  );
};

export default Template2Contact;