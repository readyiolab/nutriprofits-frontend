import { useState } from "react";

const Template3Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (This is a demo)");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Contact Us
        </h1>
        <p className="text-gray-600">We'd love to hear from you. Send us a message!</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="your@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="How can we help?"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Your message..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="text-2xl mr-4">📧</span>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-blue-100">support@example.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📱</span>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-blue-100">(123) 456-7890</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">📍</span>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-blue-100">123 Business St, Suite 100<br/>City, State 12345</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-4">⏰</span>
                <div>
                  <p className="font-semibold">Business Hours</p>
                  <p className="text-blue-100">Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat - Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <button className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                f
              </button>
              <button className="w-12 h-12 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition">
                t
              </button>
              <button className="w-12 h-12 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition">
                i
              </button>
              <button className="w-12 h-12 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition">
                in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template3Contact;