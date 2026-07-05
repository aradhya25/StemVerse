import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBrain } from "react-icons/fa";
export default function CTA() {
  return (
    <section id="contact" className="py-16 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#2563EB] to-indigo-800 text-white px-8 py-16 md:p-20 shadow-2xl overflow-hidden border border-white/10">
          {/* Decorative Glow Circles */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-secondary/15 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-2xl pointer-events-none -translate-x-1/4 translate-y-1/4" />
          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur rounded-full text-xs font-semibold uppercase tracking-wider border border-white/10">
              <FaBrain className="w-3.5 h-3.5 text-secondary-light" />
              <span>Get Unlimited Access</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-sans">
              Start Learning with LearnSphere Today
            </h2>
            <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto font-normal">
              Join thousands of students and teachers unlocking their learning
              potential. Create quizzes instantly, track concepts, and
              accelerate your educational progress.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-[#22C55E] hover:bg-[#16A34A] rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Register Now</span>
                <FaArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <a
                href="#courses"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-transparent hover:bg-white/10 border border-white/30 rounded-xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Courses</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
