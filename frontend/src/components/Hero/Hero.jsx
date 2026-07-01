import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaBrain, FaRegChartBar, FaCheckCircle } from 'react-icons/fa';
export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EFF6FF] to-[#F8FAFC]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-green-200/20 rounded-full blur-3xl translate-y-1/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading and CTA */}
          <div className="lg:col-span-6 text-center lg:text-left space-y-8 max-w-2xl mx-auto lg:mx-0">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
              <FaBrain className="w-3.5 h-3.5" />
              <span>Next-Gen AI LMS</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-darkGray font-sans leading-none">
              Empowering STEM Learning with <span className="text-gradient-primary">AI</span>
            </h1>
            
            <p className="text-lg text-darkGray-light leading-relaxed font-normal">
              Learn anytime, anywhere with AI-powered quizzes, interactive video lessons, personalized progress tracking, and expert-created courses.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <Link 
                to="/register" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Get Started</span>
                <FaArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a 
                href="#courses" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-darkGray bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-0.5 active:translate-y-0"
              >
                <FaPlay className="mr-2.5 w-3.5 h-3.5 text-primary" />
                <span>Explore Courses</span>
              </a>
            </div>
            {/* Quick Benefits Row */}
            <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-darkGray-light font-medium">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-secondary w-4 h-4" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-secondary w-4 h-4" />
                <span>Free Trial Included</span>
              </div>
            </div>
          </div>
          {/* Right Column: Dashboard Mockup / Educational Illustration */}
          <div className="lg:col-span-6 relative w-full max-w-xl lg:max-w-none mx-auto">
            <div className="relative z-10 w-full rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl bg-white border border-slate-100 p-2">
              <div className="w-full h-full rounded-xl overflow-hidden relative bg-slate-50">
                {/* STEMVerse Illustration fallback if actual image is missing */}
                <img 
                  src="/hero_illustration.jpg" 
                  alt="STEMVerse AI Learning Platform"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // If image fails to load, replace it with a beautiful gradient mesh & educational elements
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                
                {/* Fallback Beautiful Dashboard Design */}
                <div className="hidden absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 space-y-6 text-center">
                  <div className="absolute top-4 left-4 flex items-center space-x-1.5 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                    <span>AI Engine Active</span>
                  </div>
                  
                  <div className="p-4 bg-white rounded-2xl shadow-xl w-3/4 max-w-sm border border-slate-100 relative group transition-transform duration-500 hover:scale-105">
                    <div className="flex items-start space-x-3 text-left">
                      <div className="bg-primary/10 p-2.5 rounded-xl text-primary mt-1">
                        <FaBrain className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-darkGray">AI Quiz Generator</h4>
                        <p className="text-xs text-darkGray-light">Generating custom physics quiz based on your study pattern...</p>
                      </div>
                    </div>
                    {/* Animated Progress Bar */}
                    <div className="mt-4 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-secondary h-full rounded-full w-4/5 animate-[pulse_2s_infinite]" />
                    </div>
                  </div>
                  <div className="flex space-x-4 w-full max-w-md justify-center">
                    <div className="bg-white/90 backdrop-blur p-3.5 rounded-xl shadow-lg border border-white/40 text-center flex-1">
                      <p className="text-2xl font-bold text-darkGray">98%</p>
                      <p className="text-[10px] uppercase font-bold text-darkGray-light tracking-wider">Completion Rate</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur p-3.5 rounded-xl shadow-lg border border-white/40 text-center flex-1">
                      <p className="text-2xl font-bold text-secondary">2.4k</p>
                      <p className="text-[10px] uppercase font-bold text-darkGray-light tracking-wider">AI Quizzes Generated</p>
                    </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 absolute -bottom-4 -left-4 animate-bounce" />
                  <div className="w-8 h-8 rounded-full bg-secondary/15 absolute -top-4 -right-4" />
                </div>
              </div>
            </div>
            {/* Glowing Backdrop behind card */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-2xl blur-2xl transform rotate-3 -z-10" />
            
            {/* Floating micro-cards for interactive depth */}
            <div className="absolute -top-6 -left-6 bg-white p-3.5 rounded-xl shadow-xl border border-slate-100 hidden sm:flex items-center space-x-3 animate-bounce" style={{ animationDuration: '4s' }}>
              <div className="bg-secondary/10 p-2 rounded-lg text-secondary">
                <FaRegChartBar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Weekly Progress</p>
                <p className="text-sm font-extrabold text-slate-700">+28% Higher Score</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-3.5 rounded-xl shadow-xl border border-slate-100 hidden sm:flex items-center space-x-3">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">A</div>
                <div className="w-7 h-7 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">B</div>
                <div className="w-7 h-7 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[10px] text-white font-bold">C</div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700">12k+ Active Students</p>
                <p className="text-[9px] text-slate-400">Learning STEM right now</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
