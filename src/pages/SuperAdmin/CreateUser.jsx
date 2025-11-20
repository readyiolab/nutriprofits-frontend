import { useState } from 'react';
import { User, Mail, Globe, Store, CreditCard, ArrowLeft, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdUser, setCreatedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subdomain: '',
    template_id: 1,
    subscription_plan: 'monthly'
  });
  const [errors, setErrors] = useState({});

  // Color Scheme
  const PRIMARY = '#3B82F6'; // Blue
  const SECONDARY = '#1E293B'; // Dark Slate
  const SUCCESS = '#10B981';
  const WARNING = '#F59E0B';
  const ERROR = '#EF4444';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subdomain.trim()) {
      newErrors.subdomain = 'Subdomain is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.subdomain)) {
      newErrors.subdomain = 'Only lowercase letters, numbers, and hyphens allowed';
    } else if (formData.subdomain.length < 3) {
      newErrors.subdomain = 'Subdomain must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('superadmin_token');
      const response = await fetch('http://localhost:3000/api/superadmin/backoffice-users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess(true);
        setCreatedUser(result.data);
        setFormData({
          name: '',
          email: '',
          subdomain: '',
          template_id: 1,
          subscription_plan: 'monthly'
        });
      } else {
        alert(result.message || 'Failed to create user');
      }
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Error creating user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNavigateToTenants = () => {
    navigate('/superadmin/tenants');
  };

  const FormField = ({ icon: Icon, label, name, type = 'text', placeholder, error, required = false }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm md:text-base font-semibold" 
        style={{ color: SECONDARY }}>
        <Icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: PRIMARY }} />
        <span>{label}</span>
        {required && <span style={{ color: ERROR }}>*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-2 transition-all focus:outline-none text-sm md:text-base"
        style={{ 
          borderColor: error ? ERROR : '#E5E7EB',
          backgroundColor: error ? '#FEF2F2' : '#FFFFFF'
        }}
      />
      {error && (
        <p className="text-xs md:text-sm flex items-center gap-1.5 font-medium" style={{ color: ERROR }}>
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div 
        className="bg-white rounded-xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in"
        style={{ borderTop: `4px solid ${PRIMARY}` }}
      >
        {/* Modal Header */}
        <div className="px-4 md:px-8 py-6 md:py-8 text-center border-b border-gray-200">
          <div 
            className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: `${SUCCESS}15` }}
          >
            <CheckCircle className="w-8 h-8 md:w-10 md:h-10" style={{ color: SUCCESS }} />
          </div>
          <h2 className="text-xl md:text-3xl font-bold mb-2" style={{ color: SECONDARY }}>
            User Created Successfully!
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            The backoffice user has been created and notified via email.
          </p>
        </div>

        {/* Modal Content */}
        <div className="px-4 md:px-8 py-6 md:py-8 space-y-4 md:space-y-6 max-h-[60vh] overflow-y-auto">
          {/* User Details Grid */}
          <div 
            className="rounded-lg p-4 md:p-6 space-y-4"
            style={{ backgroundColor: `${PRIMARY}08` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Name</p>
                <p className="text-gray-900 font-semibold mt-2 break-words">{createdUser?.name}</p>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Email</p>
                <p className="text-gray-900 font-semibold mt-2 break-all">{createdUser?.email}</p>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Store Name</p>
                <p className="text-gray-900 font-semibold mt-2 break-words">{createdUser?.store_name}</p>
              </div>
              <div className="text-left">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Plan</p>
                <span 
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2 capitalize"
                  style={{ backgroundColor: `${PRIMARY}20`, color: PRIMARY }}
                >
                  {createdUser?.subscription_plan}
                </span>
              </div>
            </div>

            {/* Store URL */}
            <div className="border-t pt-4">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Store URL</p>
              <a 
                href={createdUser?.store_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all text-sm font-medium"
              >
                {createdUser?.store_url}
              </a>
            </div>

            {/* Temporary Password Box */}
            <div 
              className="border-l-4 p-4 rounded space-y-2"
              style={{ borderColor: WARNING, backgroundColor: '#FFFBEB' }}
            >
              <p className="text-xs font-medium" style={{ color: '#92400E' }}>Temporary Password</p>
              <p className="font-mono font-bold text-base md:text-lg select-all" style={{ color: SECONDARY }}>
                {createdUser?.temporary_password}
              </p>
              <p className="text-xs" style={{ color: '#B45309' }}>
                ⚠️ This password has been sent via email. User should change it after first login.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div 
            className="p-3 md:p-4 rounded-lg border-l-4 space-y-2"
            style={{ backgroundColor: `${SUCCESS}08`, borderColor: SUCCESS }}
          >
            <p className="text-xs md:text-sm font-semibold" style={{ color: SECONDARY }}>
              ✓ What's been set up:
            </p>
            <ul className="space-y-1.5 text-xs md:text-sm text-gray-700">
              <li>✓ Subdomain created on Cloudflare</li>
              <li>✓ Welcome email sent with credentials</li>
              <li>✓ Store template applied</li>
              <li>✓ Subscription plan activated</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 md:px-8 py-4 md:py-6 border-t bg-gray-50 grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
          <button
            onClick={() => { 
              setSuccess(false); 
              setCreatedUser(null); 
            }}
            className="order-2 md:order-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-white transition-all duration-200 text-sm md:text-base hover:shadow-lg active:scale-95"
            style={{ 
              backgroundColor: PRIMARY,
              opacity: 0.9 
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0.9'}
          >
            Create Another User
          </button>
          <button
            onClick={handleNavigateToTenants}
            className="order-1 md:order-2 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-white transition-all duration-200 text-sm md:text-base hover:shadow-lg active:scale-95"
            style={{ backgroundColor: SECONDARY }}
          >
            View All Users
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-3 md:p-6 lg:p-8" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          
          <h1 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2" style={{ color: SECONDARY }}>
            Create Backoffice User
          </h1>
          
        </div>

        {/* Form Card */}
        <div 
          className="bg-white  shadow-lg overflow-hidden "
          
        >
          {/* Form Header */}
          <div 
            className="px-4 md:px-8 py-4 md:py-6"
            style={{ backgroundColor: `${PRIMARY}08`, borderBottom: `1px solid #E5E7EB` }}
          >
            <h2 className="text-lg md:text-xl font-semibold" style={{ color: SECONDARY }}>
              User Information
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              Fill in the details below to create a new user
            </p>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-4 md:p-8 space-y-6">
            {/* Row 1: Name & Email (2 fields) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField 
                icon={User} 
                label="Full Name" 
                name="name" 
                placeholder="John Doe" 
                error={errors.name}
                required
              />
              <FormField 
                icon={Mail} 
                label="Email Address" 
                name="email" 
                type="email" 
                placeholder="john@example.com" 
                error={errors.email}
                required
              />
            </div>

            {/* Row 2: Subdomain & Template (2 fields) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Subdomain Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold" 
                  style={{ color: SECONDARY }}>
                  <Globe className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: PRIMARY }} />
                  <span>Subdomain</span>
                  <span style={{ color: ERROR }}>*</span>
                </label>
                <div className="flex gap-0 rounded-lg overflow-hidden border-2" 
                  style={{ borderColor: errors.subdomain ? ERROR : '#E5E7EB' }}>
                  <input
                    type="text"
                    name="subdomain"
                    value={formData.subdomain}
                    onChange={handleChange}
                    placeholder="mystore"
                    className="flex-1 px-3 md:px-4  focus:outline-none text-sm md:text-base"
                    style={{ backgroundColor: errors.subdomain ? '#FEF2F2' : '#FFFFFF' }}
                  />
                  <div className="px-3 md:px-4 py-2.5 md:py-3 bg-gray-100 text-gray-600 font-medium whitespace-nowrap text-xs md:text-base">
                    .igrowbig.com
                  </div>
                </div>
                {errors.subdomain && (
                  <p className="text-xs md:text-sm flex items-center gap-1.5 font-medium" style={{ color: ERROR }}>
                    <AlertCircle className="w-4 h-4" /> {errors.subdomain}
                  </p>
                )}
              </div>

              {/* Store Template Select */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold" 
                  style={{ color: SECONDARY }}>
                  <Store className="w-4 h-4 md:w-5 md:h-5" style={{ color: PRIMARY }} />
                  <span>Store Template</span>
                </label>
                <select
                  name="template_id"
                  value={formData.template_id}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm md:text-base"
                >
                  <option value={1}>Template 1 - Modern Minimal</option>
                  <option value={2}>Template 2 - Classic</option>
                  <option value={3}>Template 3 - Bold & Colorful</option>
                  <option value={4}>Template 4 - Professional</option>
                </select>
                <p className="text-xs md:text-sm text-gray-500">Choose the default template for the store</p>
              </div>
            </div>

            {/* Row 3: Subscription Plan (1 field) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm md:text-base font-semibold" 
                  style={{ color: SECONDARY }}>
                  <CreditCard className="w-4 h-4 md:w-5 md:h-5" style={{ color: PRIMARY }} />
                  <span>Subscription Plan</span>
                </label>
                <select
                  name="subscription_plan"
                  value={formData.subscription_plan}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-sm md:text-base"
                >
                  <option value="monthly">Monthly - $99/month</option>
                  <option value="yearly">Yearly - $999/year (Save 16%)</option>
                  <option value="trial">Free Trial - 14 days</option>
                </select>
                <p className="text-xs md:text-sm text-gray-500">Select the subscription plan for this user</p>
              </div>
            </div>

           

            {/* Form Actions */}
            <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3 pt-4 md:pt-6 border-t">
              <button
                type="button"
                onClick={handleNavigateToTenants}
                className="flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm md:text-base active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-white transition-all duration-200 text-sm md:text-base hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ backgroundColor: PRIMARY }}
              >
                {loading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>Creating User...</span>
                  </>
                ) : (
                  'Create User'
                )}
              </button>
            </div>
          </form>
        </div>

        
      </div>

      {success && createdUser && <SuccessModal />}
    </div>
  );
};

export default CreateUser;