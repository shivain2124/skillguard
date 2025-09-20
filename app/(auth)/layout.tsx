// app/auth/layout.tsx
import React from "react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full relative overflow-hidden bg-white">
      <div className="flex h-screen relative z-10">
        {/* Left Panel - Common Brand Section */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-500 via-indigo-950 to-slate-900 rounded-r-3xl">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse delay-500 transform rotate-12"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent animate-pulse delay-1000 transform -rotate-6"></div>
            <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent animate-pulse delay-700 transform rotate-45"></div>
            <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-white/40 rounded-full animate-ping delay-300"></div>
            <div className="absolute top-1/3 right-1/4 w-0.5 h-0.5 bg-white/30 rounded-full animate-ping delay-800"></div>
            <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-white/20 rounded-full animate-ping delay-1200"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/5 via-transparent to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 py-8 px-16 flex flex-col h-full">
            <div className="max-w-2xl">
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

        {/* Right Panel - Dynamic Form Area */}
        <div className="flex w-full lg:w-1/2 items-center justify-center p-6 bg-gradient-to-br from-gray-100 to-white relative">
          <div className="w-full max-w-md relative z-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

import { CheckCircle, Zap, BarChart3 } from "lucide-react";

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
