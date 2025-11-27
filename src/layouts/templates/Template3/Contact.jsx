import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Navigation } from "lucide-react";

const Template3Contact = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic page content (from tbl_contact_page_content)
  const pageContent = {
    hero_title: "GET IN TOUCH",
    hero_subtitle: "We'd Love to Hear From You",
    hero_description: "Whether you have a question, need support, or just want to say hello, we're here to help.",
    hero_button_text: "Send Message",
    hero_button_link: "#form",
    hero_image_url: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=600&fit=crop",
    
    office_title: "Get in Touch",
    office_subtitle: "Fill out the form or visit us at our office",
    office_image_url: null,
    
    address_title: "Address",
    address: "Your Store Office, Business District, Your City, State 12345",
    
    email_title: "Email",
    email: "support@example.com",
    
    phone_title: "Phone",
    phone: "+91 123 456 7890",
    
    business_hours_title: "Business Hours",
    business_hours: "Mon – Fri: 9:00 AM – 6:00 PM\nSat – Sun: Closed",
    
    form_title: "Send us a Message",
    form_description: "Fill out the form below and we'll get back to you as soon as possible.",
    
    cta_title: "Need Immediate Help?",
    cta_description: "Call us directly or visit our office.",
    cta_button_text: "Call Now",
    cta_button_link: "tel:+911234567890",
    cta_secondary_button_text: "Get Directions",
    cta_secondary_button_link: "https://maps.google.com",
    
    map_embed_url: null,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: pageContent.email_title,
      content: pageContent.email,
      link: `mailto:${pageContent.email}`,
      color: "from-[#d72323] to-[#303841]"
    },
    {
      icon: Phone,
      title: pageContent.phone_title,
      content: pageContent.phone,
      link: `tel:${pageContent.phone}`,
      color: "from-[#303841] to-[#d72323]"
    },
    {
      icon: MapPin,
      title: pageContent.address_title,
      content: pageContent.address,
      link: pageContent.cta_secondary_button_link,
      color: "from-[#d72323] to-[#303841]"
    },
    {
      icon: Clock,
      title: pageContent.business_hours_title,
      content: pageContent.business_hours,
      link: null,
      color: "from-[#303841] to-[#d72323]"
    }
  ];

  return (
    <div className="bg-[#eeeeee] min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[400px] sm:h-[500px] mb-12 sm:mb-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${pageContent.hero_image_url})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1214]/90 to-[#0f1214]/60" />
        
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl text-white text-center mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-[#d72323] rounded-full mb-6">
                <MessageCircle className="w-10 h-10" />
              </div>
              <span className="inline-block text-sm font-semibold uppercase tracking-wider mb-4 opacity-90">
                {pageContent.hero_subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight mb-6">
                {pageContent.hero_title}
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                {pageContent.hero_description}
              </p>
              <button 
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all shadow-lg transform "
              >
                {pageContent.hero_button_text}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Info Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#303841] mb-4">
            {pageContent.office_title}
          </h2>
          <p className="text-base sm:text-lg text-[#3a4750] max-w-2xl mx-auto">
            {pageContent.office_subtitle}
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-[#3a4750] rounded-xl mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-[#303841] mb-2">{info.title}</h3>
                {info.link ? (
                  <a 
                    href={info.link}
                    className="text-sm sm:text-base text-[#d72323] hover:text-[#303841] transition-colors whitespace-pre-line"
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sm sm:text-base text-[#3a4750] whitespace-pre-line">{info.content}</p>
                )}
              </div>
            );
          })}
        </div>

        {/* Form & Map Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Contact Form */}
          <div id="form" className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#303841] mb-2">
              {pageContent.form_title}
            </h2>
            <p className="text-[#3a4750] mb-8">
              {pageContent.form_description}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[#303841] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d72323] transition-colors"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#303841] mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d72323] transition-colors"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#303841] mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d72323] transition-colors"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#303841] mb-2">
                  Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows="6"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#d72323] transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#d72323] to-[#303841] text-white py-4 rounded-full hover:shadow-xl transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform "
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map or Image */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {pageContent.map_embed_url ? (
              <iframe
                src={pageContent.map_embed_url}
                className="w-full h-full min-h-[500px]"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            ) : (
              <div className="relative h-full min-h-[500px]">
                <img
                  src={pageContent.office_image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=800&fit=crop"}
                  alt="Office"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#303841]/80 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-semibold mb-2">Visit Our Office</h3>
                    <p className="mb-4">{pageContent.address}</p>
                    <a
                      href={pageContent.cta_secondary_button_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all"
                    >
                      <Navigation className="w-5 h-5" />
                      Get Directions
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-br from-[#0f1214] via-[#303841] to-[#0f1214] text-white py-16 sm:py-20 mx-4 sm:mx-6 lg:mx-8 rounded-2xl mb-8 sm:mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
            {pageContent.cta_title}
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            {pageContent.cta_description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={pageContent.cta_button_link}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d72323] text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all shadow-lg transform hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              {pageContent.cta_button_text}
            </a>
            <a
              href={pageContent.cta_secondary_button_link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#303841] transition-all transform hover:scale-105"
            >
              <Navigation className="w-5 h-5" />
              {pageContent.cta_secondary_button_text}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Template3Contact;