import React from 'react';
import { FaRobot, FaGlobe, FaSmile, FaUserEdit } from 'react-icons/fa';
export default function WhyChoose() {
  const items = [
    {
      id: 1,
      title: 'AI Powered Learning',
      description: 'Interact with smart engines that auto-generate personalized practice content, clarify formulas, and create targeted review systems in real-time.',
      icon: <FaRobot className="w-6 h-6 text-primary" />,
      gradient: 'from-blue-500/10 to-indigo-500/10',
      borderGlow: 'group-hover:border-blue-500/50',
    },
    {
      id: 2,
      title: 'Learn Anywhere',
      description: 'Fully optimized for mobile, tablet, and desktop devices. Connect with your coursework during daily transits, from rural schools, or anywhere else.',
      icon: <FaGlobe className="w-6 h-6 text-secondary" />,
      gradient: 'from-green-500/10 to-emerald-500/10',
      borderGlow: 'group-hover:border-green-500/50',
    },
    {
      id: 3,
      title: 'Easy To Use',
      description: 'Minimalist, clear, and highly intuitive user interfaces designed to remove friction. No complicated navigations—just direct paths to learning.',
      icon: <FaSmile className="w-6 h-6 text-amber-500" />,
      gradient: 'from-amber-500/10 to-orange-500/10',
      borderGlow: 'group-hover:border-amber-500/50',
    },
    {
      id: 4,
      title: 'Personalized Experience',
      description: 'Adaptive lesson pathways tailored specifically to your learning speed and curriculum focus, optimizing overall concept retention.',
      icon: <FaUserEdit className="w-6 h-6 text-indigo-500" />,
      gradient: 'from-indigo-500/10 to-purple-500/10',
      borderGlow: 'group-hover:border-indigo-500/50',
    },
  ];
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-slate-200/50 rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-200/30 rounded-full pointer-events-none -z-10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            Value Proposition
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-darkGray font-sans">
            Why Choose LearnSphere
          </p>
          <p className="text-base text-darkGray-light font-normal">
            We provide a unique combination of premium user experience design and next-generation AI-driven tools.
          </p>
        </div>
        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className={`group bg-white rounded-3xl p-8 border border-slate-100 shadow-premium hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 flex flex-col md:flex-row items-start md:space-x-6 space-y-6 md:space-y-0 relative overflow-hidden`}
            >
              {/* Corner Ambient Glow */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.gradient} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
              {/* Icon Circle */}
              <div className="flex-shrink-0 p-4 bg-slate-50 group-hover:bg-white group-hover:shadow-lg rounded-2xl transition-all duration-300 relative z-10">
                {item.icon}
              </div>
              {/* Text */}
              <div className="space-y-3 relative z-10 flex-1">
                <h3 className="text-xl font-bold text-darkGray group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-darkGray-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
