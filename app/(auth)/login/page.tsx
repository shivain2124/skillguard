"use client";

import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full max-w-md relative z-10">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 rounded-3xl blur-xl opacity-60 group-hover:opacity-80 transition duration-1000"></div>

        <div className="relative bg-white backdrop-blur-xl border border-gray-200/80 rounded-3xl p-8 shadow-2xl shadow-black/5">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <div className="space-y-6">
            <Link
              href="/login"
              className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 hover:shadow-lg text-center"
            >
              Sign in with Auth0
            </Link>
          </div>

          <div className="mt-6 text-center space-y-3">
            <div className="text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
