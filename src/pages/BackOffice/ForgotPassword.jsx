import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../config/apiConfig";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=2340&auto=format&fit=crop";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await api.post("/backoffice/forgot-password", { email });

      if (response.data.success) {
        console.log("✅ Password reset email sent");
        setSuccess(true);
        setEmail("");
      } else {
        setError(response.data.message || "Failed to send reset email");
      }
    } catch (error) {
      console.error("❌ Forgot password error:", error);
      setError(error.response?.data?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${BACKGROUND_IMAGE})` }}
        />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <div>
            <div className="flex items-center space-x-3">
              <h1 className="text-4xl font-medium">BackOffice</h1>
            </div>
            <div className="mt-20 max-w-lg">
              <h2 className="text-5xl font-medium leading-tight">Reset Your Password</h2>
              <p className="mt-6 text-xl text-blue-100">
                Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
          </div>
          <div className="text-sm opacity-80">© 2025 BackOffice. All rights reserved.</div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 px-6 py-12">
        <Card className="w-full max-w-md shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-medium">Forgot Password?</CardTitle>
            <CardDescription className="text-base">
              No worries, we'll send you reset instructions
            </CardDescription>
          </CardHeader>

          <CardContent>
            {success ? (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-4 rounded-full">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Check your email</h3>
                  <p className="text-gray-600">
                    If your email exists in our system, you will receive password reset
                    instructions shortly.
                  </p>
                </div>
                <Button
                  onClick={() => setSuccess(false)}
                  variant="outline"
                  className="w-full"
                >
                  Send another email
                </Button>
                <Link
                  to="/backoffice/login"
                  className="flex items-center justify-center text-sm text-gray-600 hover:text-black"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      className="pl-10"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-black cursor-pointer h-12 text-lg font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <Link
                  to="/backoffice/login"
                  className="flex items-center justify-center text-sm text-gray-600 hover:text-black mt-6"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to login
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;