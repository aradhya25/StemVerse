import React from 'react';
import { 
  FaUserPlus, 
  FaSearch, 
  FaBookmark, 
  FaTv, 
  FaBrain, 
  FaChartLine, 
  FaAward 
} from 'react-icons/fa';
export default function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Register',
      desc: 'Create your account as a student or instructor in seconds.',
      icon: <FaUserPlus className="w-5 h-5 text-white" />,
      color: 'bg-[#2563EB]', // Primary
    },
    {
      step: '02',
      title: 'Browse Courses',
      desc: 'Explore our catalog of custom-built STEM modules.',
      icon: <FaSearch className="w-5 h-5 text-white" />,
      color: 'bg-indigo-500',
    },
    {
      step: '03',
      title: 'Enroll',
      desc: 'Select a course and register with a single click.',
      icon: <FaBookmark className="w-5 h-5 text-white" />,
      color: 'bg-violet-500',
    },
    {
      step: '04',
      title: 'Watch Lessons',
      desc: 'Learn through modern, video-guided courses.',
      icon: <FaTv className="w-5 h-5 text-white" />,
      color: 'bg-[#22C55E]', // Secondary
    },
    {
      step: '05',
      title: 'Take AI Quizzes',
      desc: 'Reinforce learning with dynamically generated tests.',
      icon: <FaBrain className="w-5 h-5 text-white" />,
      color: 'bg-pink-500',
    },
    {
      step: '06',
      title: 'Track Progress',
      desc: 'Analyze completion parameters and performance.',
      icon: <FaChartLine className="w-5 h-5 text-white" />,
      color: 'bg-blue-500',
    },
    {
      step: '07',
      title: 'Earn Knowledge',
      desc: 'Unlock certifications and build your STEM profile.',
      icon: <FaAward className="w-5 h-5 text-white" />,
      color: 'bg-amber-500',
    },
  ];
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#22C55E] bg-[#22C55E]/10 px-3 py-1 rounded-full inline-block">
            Workflow
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-darkGray font-sans">
            How STEMVerse Works
          </p>
          <p className="text-base text-darkGray-light font-normal">
            A simple, intuitive, step-by-step path designed to transition you from setup to mastering complex STEM concepts.
          </p>
        </div>
        {/* Desktop Horizontal Timeline (hidden on small screens) */}
        <div className="hidden lg:block relative mt-12">
          {/* Connector Line */}
         <div className="absolute top-7 left-[7%] right-[7%] h-1 rounded-full bg-gradient-to-r from-[#2563EB] via-violet-500 via-pink-500 to-[#22C55E] z-0"/>
          
          <div className="grid grid-cols-7 gap-4 relative z-10">
            {steps.map((item, index) => (
              <div key={index} className="text-center group flex flex-col items-center">
                {/* Step circle */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${item.color} shadow-lg shadow-black/10 group-hover:scale-110 transition-transform duration-300 relative border-4 border-white`}>
                  {item.icon}
                  {/* Small step number badge */}
                  <span className="absolute -top-2 -right-2 bg-slate-900 text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                    {item.step}
                  </span>
                </div>
                
                {/* Info */}
                <div className="mt-6 space-y-2 px-1">
                  <h3 className="font-bold text-darkGray text-base group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-darkGray-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile Vertical Timeline (hidden on large screens) */}
        <div className="lg:hidden relative space-y-8 pl-8 before:content-[''] before:absolute before:left-[1.75rem] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-200">
          {steps.map((item, index) => (
            <div key={index} className="relative flex items-start space-x-6 group">
              {/* Step circle */}
              <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${item.color} shadow-md group-hover:scale-105 transition-transform duration-300 relative z-10 border-2 border-white`}>
                {item.icon}
                <span className="absolute -top-1.5 -right-1.5 bg-slate-900 text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border border-white">
                  {item.step}
                </span>
              </div>
              
              {/* Info */}
              <div className="pt-2 space-y-1">
                <h3 className="font-bold text-darkGray text-lg group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-darkGray-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
