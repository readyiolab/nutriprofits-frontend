import { MapPin, PhoneCall } from "lucide-react";
import { useState } from "react";

const DynamicContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (Demo)");
  };

  const contactInfo = {
    address: "123 Business Avenue\nSuite 100, Downtown\nGorakhpur, Uttar Pradesh 273001",
    email: "support@example.com",
    phone: "+91 123 456 7890",
    hours: "Mon – Fri: 9:00 AM – 6:00 PM\nSat – Sun: Closed",
  };

  return (
    <div className="overflow-x-hidden">
      {/* HERO BANNER */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] mb-8 md:mb-12">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          {/* Left Content */}
          <div className="p-4 sm:p-6 md:p-8 lg:p-12 text-white order-2 md:order-1">
            <span className="inline-block bg-[#f8b400] text-[#004445] px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              GET IN TOUCH
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-3 sm:mb-4 leading-tight">
              We'd Love to Hear From You
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-[#faf5e4] mb-4 sm:mb-6 leading-relaxed">
              Whether you have a question, need support, or just want to say hi—our team is ready to help.
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-[#ffa500] transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base">
                Send Message
              </button>
              <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-white hover:text-[#004445] transition-all text-sm sm:text-base">
                View Location
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="h-[250px] sm:h-[300px] md:h-full md:min-h-[400px] bg-gradient-to-br from-[#2c786c] to-[#f8b400] flex items-center justify-center order-2 md:order-2 ">
            <div className="w-full h-full bg-[#faf5e4]/20 flex items-center justify-center backdrop-blur-sm overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=600"
                alt="Contact illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTACT SECTION – Address Left, Form Right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-[#004445] mb-2 sm:mb-3">
            Get in Touch
          </h2>
          <p className="text-black text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Fill out the form or visit us at our office
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
          {/* LEFT: Contact Info */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 h-full">
            <h3 className="text-xl sm:text-2xl font-medium text-[#004445] mb-4 sm:mb-6">Our Office</h3>
            <div className="space-y-4 sm:space-y-6 text-gray-700">
              <div className="flex items-start gap-3 sm:gap-4">
                <div>
                  <p className="font-semibold text-sm sm:text-base">Address</p>
                  <p className="text-xs sm:text-sm whitespace-pre-line">{contactInfo.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div>
                  <p className="font-semibold text-sm sm:text-base">Email</p>
                  <p className="text-xs sm:text-sm">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div>
                  <p className="font-semibold text-sm sm:text-base">Phone</p>
                  <p className="text-xs sm:text-sm">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <div>
                  <p className="font-semibold text-sm sm:text-base">Business Hours</p>
                  <p className="text-xs sm:text-sm whitespace-pre-line">{contactInfo.hours}</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="mt-6 sm:mt-8 rounded-xl overflow-hidden shadow-md">
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.614288887504!2d83.364973!3d26.760593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399144d2339e8d7f%3A0x8e8b8f8b8f8b8f8b!2sGorakhpur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1699000000000!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="sm:h-[250px]"
              ></iframe>
            </div>
          </div>

          {/* RIGHT: Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-medium text-[#004445] mb-4 sm:mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#2c786c] rounded-lg focus:outline-none focus:border-[#f8b400] transition text-sm sm:text-base"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#2c786c] rounded-lg focus:outline-none focus:border-[#f8b400] transition text-sm sm:text-base"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#2c786c] rounded-lg focus:outline-none focus:border-[#f8b400] transition text-sm sm:text-base"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-[#2c786c] rounded-lg focus:outline-none focus:border-[#f8b400] transition resize-none text-sm sm:text-base"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#004445] text-white py-2.5 sm:py-3 rounded-lg hover:bg-[#2c786c] transition font-semibold shadow-md text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* CTA SECTION */}
      <div className="bg-gradient-to-r from-[#004445] to-[#2c786c] py-8 sm:py-10 md:py-12 mx-4 sm:mx-6 lg:mx-10 mb-8 md:mb-12 rounded-2xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#f8b400] opacity-10 rounded-full -mr-24 md:-mr-32 -mt-24 md:-mt-32"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 md:w-48 md:h-48 bg-[#f8b400] opacity-10 rounded-full -ml-16 md:-ml-24 -mb-16 md:-mb-24"></div>
        
        <div className="max-w-4xl mx-auto text-center text-white px-4 sm:px-6 relative z-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium mb-3 sm:mb-4">
            Need Immediate Help?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#faf5e4] mb-6 sm:mb-8">
            Call us directly or drop by our office in USA
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center flex-wrap px-4">
            <button className="bg-[#f8b400] text-[#004445] px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-[#ffa500] cursor-pointer shadow-lg text-sm sm:text-base transition-all">
              Call Now <PhoneCall className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-[#004445] transition-all cursor-pointer text-sm sm:text-base">
              Get Directions <MapPin className="inline-block ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicContact;