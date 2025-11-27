import React, { useState } from "react";
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle, Loader, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Color Scheme
  const PRIMARY = '#3B82F6'; // Blue
  const SECONDARY = '#1E293B'; // Dark Slate
  const SUCCESS = '#10B981';
  const ERROR = '#EF4444';
  const WARNING = '#F59E0B';

  const validatePassword = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    return checks;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'Current password is required';
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'New password is required';
    } else {
      const checks = validatePassword(formData.newPassword);
      if (!checks.length) {
        newErrors.newPassword = 'Password must be at least 8 characters';
      } else if (!checks.uppercase || !checks.lowercase) {
        newErrors.newPassword = 'Password must contain uppercase and lowercase letters';
      } else if (!checks.number) {
        newErrors.newPassword = 'Password must contain at least one number';
      } else if (!checks.special) {
        newErrors.newPassword = 'Password must contain at least one special character';
      }
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'New password must be different from current password';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/superadmin/change-password', {
        method: 'POST',
        credentials: 'include', // ✅ Send cookies with request
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setTimeout(() => setIsSuccess(false), 4000);
      } else {
        const result = await response.json();
        setErrors({ form: result.message || 'Failed to change password' });
      }
    } catch (error) {
      console.error('Failed:', error);
      setErrors({ form: 'An error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordInput = ({ label, name, show, setShow, error }) => (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm md:text-base font-semibold" style={{ color: SECONDARY }}>
        <Lock className="w-4 h-4 md:w-5 md:h-5" style={{ color: PRIMARY }} />
        <span>{label}</span>
      </label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 md:py-3 rounded-lg border-2 transition-all focus:outline-none pr-12 text-sm md:text-base"
          style={{ 
            borderColor: error ? ERROR : '#E5E7EB',
            backgroundColor: error ? '#FEF2F2' : '#FFFFFF'
          }}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
        >
          {show ? (
            <EyeOff className="w-4 h-4 md:w-5 md:h-5" />
          ) : (
            <Eye className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-xs md:text-sm flex items-center gap-1.5 font-medium" style={{ color: ERROR }}>
          <AlertCircle className="w-4 h-4" /> {error}
        </p>
      )}
    </div>
  );

  const PasswordRequirement = ({ met, text }) => (
    <li className="flex items-center gap-2 text-xs md:text-sm" style={{ color: met ? SUCCESS : '#9CA3AF' }}>
      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: met ? SUCCESS : '#D1D5DB' }} />
      <span>{text}</span>
    </li>
  );

  const passwordChecks = validatePassword(formData.newPassword);

  return (
    <div className="min-h-screen " style={{ backgroundColor: '#F8FAFC' }}>
      <div >
        {/* Header Section */}
        <div className="mb-6 md:mb-8">
          
          <h1 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2" >
            Change Password
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Update your SuperAdmin account password to keep your account secure
          </p>
        </div>

        {/* Main Card */}
        <div 
          className="bg-white rounded-xl shadow-lg "
          
        >
          {/* Card Header */}
          <div 
            className="px-4 md:px-8 py-4 md:py-6"
            style={{ backgroundColor: `${PRIMARY}08`, borderBottom: `1px solid #E5E7EB` }}
          >
            <h2 className="flex items-center gap-2 text-lg md:text-xl font-semibold" style={{ color: SECONDARY }}>
              <Lock className="w-5 h-5 md:w-6 md:h-6" style={{ color: PRIMARY }} />
              Secure Password Update
            </h2>
            <p className="text-xs md:text-sm text-gray-600 mt-2">
              Ensure your account remains protected with a strong password
            </p>
          </div>

          {/* Card Content */}
          <div className="p-4 md:p-8 space-y-6">
            {/* Success Alert */}
            {isSuccess && (
              <div 
                className="p-4 md:p-5 rounded-lg border-l-4 flex items-start gap-3"
                style={{ backgroundColor: '#F0FDF4', borderColor: SUCCESS }}
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5" style={{ color: SUCCESS }} />
                <div>
                  <p className="font-semibold text-sm md:text-base" style={{ color: '#166534' }}>
                    Password changed successfully!
                  </p>
                  <p className="text-xs md:text-sm text-green-700 mt-1">
                    Your SuperAdmin account password has been updated.
                  </p>
                </div>
              </div>
            )}

            {/* Form Error */}
            {errors.form && (
              <div 
                className="p-4 md:p-5 rounded-lg border-l-4 flex items-start gap-3"
                style={{ backgroundColor: '#FEF2F2', borderColor: ERROR }}
              >
                <AlertCircle className="w-5 h-5 mt-0.5" style={{ color: ERROR }} />
                <div>
                  <p className="font-semibold text-sm md:text-base" style={{ color: '#991B1B' }}>
                    Error
                  </p>
                  <p className="text-xs md:text-sm text-red-700 mt-1">
                    {errors.form}
                  </p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <PasswordInput
                label="Current Password"
                name="currentPassword"
                show={showCurrent}
                setShow={setShowCurrent}
                error={errors.currentPassword}
              />

              {/* New Password */}
              <div className="space-y-3">
                <PasswordInput
                  label="New Password"
                  name="newPassword"
                  show={showNew}
                  setShow={setShowNew}
                  error={errors.newPassword}
                />

                {/* Password Requirements */}
                {formData.newPassword && (
                  <div 
                    className="p-4 rounded-lg space-y-2"
                    style={{ backgroundColor: `${PRIMARY}08` }}
                  >
                    <p className="font-semibold text-xs md:text-sm" style={{ color: SECONDARY }}>
                      Password Requirements:
                    </p>
                    <ul className="space-y-1.5">
                      <PasswordRequirement 
                        met={passwordChecks.length}
                        text="At least 8 characters"
                      />
                      <PasswordRequirement 
                        met={passwordChecks.uppercase && passwordChecks.lowercase}
                        text="One uppercase & one lowercase letter"
                      />
                      <PasswordRequirement 
                        met={passwordChecks.number}
                        text="At least one number (0-9)"
                      />
                      <PasswordRequirement 
                        met={passwordChecks.special}
                        text="At least one special character (!@#$%^&*)"
                      />
                    </ul>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <PasswordInput
                label="Confirm New Password"
                name="confirmPassword"
                show={showConfirm}
                setShow={setShowConfirm}
                error={errors.confirmPassword}
              />

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="space-y-2">
                  <p className="text-xs md:text-sm font-medium text-gray-600">Password Strength:</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-300"
                      style={{
                        width: `${
                          Object.values(passwordChecks).filter(Boolean).length * 20
                        }%`,
                        backgroundColor: Object.values(passwordChecks).filter(Boolean).length <= 2 
                          ? ERROR 
                          : Object.values(passwordChecks).filter(Boolean).length <= 3 
                            ? WARNING 
                            : SUCCESS
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {Object.values(passwordChecks).filter(Boolean).length <= 2 
                      ? 'Weak' 
                      : Object.values(passwordChecks).filter(Boolean).length <= 3 
                        ? 'Good' 
                        : 'Strong'} password
                  </p>
                </div>
              )}

              

              {/* Form Actions */}
              <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-3 pt-4 md:pt-6 border-t">
                <button
                  type="button"
                  onClick={() => navigate('/superadmin')}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 text-sm md:text-base active:scale-95"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-semibold text-white transition-all duration-200 text-sm md:text-base hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  style={{ backgroundColor: PRIMARY }}
                >
                  {isLoading ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Updating...</span>
                    </>
                  ) : (
                    'Update Password'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;