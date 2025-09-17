"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle, Zap, BarChart3 } from "lucide-react";
import axios from "axios";

const LoginLayout = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      // const result = await signIn("credentials", {
      //   email,
      //   password,
      //   redirect: false,
      // });
      const result = await axios("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ email, password }),
      });
      console.log(result);
      router.push("/dashboard");
    } catch (err: Error | any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-white">
      <div className="flex h-screen relative z-10">
        {/* Left Panel - Brand Side */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-950 to-slate-900 rounded-r-3xl">
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Light rays */}
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse delay-500 transform rotate-12"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent animate-pulse delay-1000 transform -rotate-6"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse delay-700 transform rotate-45"></div>

            {/* Floating particles */}
            <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white/40 rounded-full animate-ping delay-300"></div>
            <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-white/30 rounded-full animate-ping delay-800"></div>
            <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping delay-1200"></div>

            {/* Gradient overlays */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 via-transparent to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 py-8 px-16 flex flex-col h-full">
            <div className="max-w-2xl">
              {/* Brand */}
              <div className="mb-8">
                <Link
                  href="/"
                  className="inline-block group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-5 py-2.5 transition-all duration-500 hover:bg-white/15 hover:scale-105"
                >
                  <span className="text-xl font-black tracking-tight text-white">
                    SKILLGUARD<span className="text-blue-400">.</span>
                  </span>
                </Link>
              </div>

              {/* Hero Section */}
              <div className="mb-8">
                <h1 className="text-4xl xl:text-6xl font-black text-white mb-4">
                  Protect Your <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
                    Professional
                  </span>{" "}
                  <br />
                  <span className="text-3xl xl:text-5xl text-gray-300">
                    Skills
                  </span>
                </h1>
              </div>

              {/* Features */}
              <div className="space-y-3 flex-1">
                {FEATURES.map((feature, index) => (
                  <div key={index} className="group relative">
                    <div className="relative flex items-start gap-3 p-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:transform hover:translate-x-2">
                      <div
                        className={`flex-shrink-0 w-8 h-8 bg-gradient-to-br ${feature.accent} rounded-lg flex items-center justify-center text-white shadow-lg`}
                      >
                        {feature.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Beautiful Auth Form */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-white relative">
          <div className="w-full max-w-md relative z-10">
            <div className="relative group">
              {/* Elegant shadow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition duration-1000"></div>

              {/* Premium Card */}
              <div className="relative bg-white backdrop-blur-xl border border-gray-200/80 rounded-3xl p-8 shadow-2xl shadow-black/5">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Create your account
                  </h2>
                  <p className="text-gray-600">
                    Fill out the form below to sign up.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                          fieldErrors.email
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300"
                        }`}
                        placeholder="Enter your email"
                      />
                      {fieldErrors.email && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-3 border rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                          fieldErrors.password
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-200 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-300"
                        }`}
                        placeholder="Enter your password"
                      />
                      {fieldErrors.password && (
                        <p className="mt-2 text-sm text-red-600 flex items-center">
                          <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                          {fieldErrors.password}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* General Error */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center">
                      <svg
                        className="w-4 h-4 mr-2 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Signing up...
                      </div>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>

                {/* Links */}
                <div className="mt-6 text-center space-y-3">
                  <div className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/login"
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const FEATURES = [
  {
    icon: <CheckCircle className="w-5 h-5" />,
    title: "Smart Skill Tracking",
    desc: "AI-powered assessments track your skill decay patterns",
    accent: "from-blue-400 to-cyan-400",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Personalized Practice",
    desc: "Custom exercises tailored to your specific skill gaps",
    accent: "from-purple-400 to-pink-400",
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: "Progress Analytics",
    desc: "Detailed insights showing your skill growth patterns",
    accent: "from-emerald-400 to-teal-400",
  },
];
export default LoginLayout;
