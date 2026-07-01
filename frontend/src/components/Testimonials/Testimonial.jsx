import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: 'Sarah Jenkins',
      role: 'Physics Major, State College',
      rating: 5,
      text: 'STEMVerse has completely transformed how I study. The AI-generated quizzes adapt directly to the topics I struggle with, saving me hours of review time before midterms.',
      avatarInitials: 'SJ',
      avatarBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      role: 'High School AP Physics Teacher',
      rating: 5,
      text: 'As an educator, I love how easy it is to import videos and let the platform auto-structure modules. The student dashboard gives me perfect visibility into class progress.',
      avatarInitials: 'RK',
      avatarBg: 'bg-gradient-to-br from-green-500 to-emerald-600',
    },
    {
      id: 3,
      name: 'Marcus Vance',
      role: 'Self-Taught Software Engineer',
      rating: 5,
      text: 'The YouTube integration is absolute magic. I pasted a complex engineering playlist, and STEMVerse built a structured learning path with custom quiz checkpoints instantly.',
      avatarInitials: 'MV',
      avatarBg: 'bg-gradient-to-br from-purple-500 to-pink-600',
    },
  ];
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-[#2563EB] bg-[#2563EB]/10 px-3 py-1 rounded-full inline-block">
            Testimonials
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-darkGray font-sans">
            What Our Community Says
          </p>
          <p className="text-base text-darkGray-light font-normal">
            Read stories from students, teachers, and developers who have accelerated their learning path using STEMVerse.
          </p>
        </div>
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((item) => (
            <div
              key={item.id}
              className="bg-slate-50 border border-slate-100 rounded-3xl p-8 relative flex flex-col justify-between hover:bg-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Quote Icon Overlay */}
              <div className="absolute top-6 right-8 text-slate-200 group-hover:text-primary/10 transition-colors pointer-events-none">
                <FaQuoteLeft className="w-10 h-10" />
              </div>
              <div className="space-y-6">
                {/* Rating Stars */}
                <div className="flex space-x-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
                {/* Review Text */}
                <p className="text-darkGray-light text-sm italic leading-relaxed relative z-10">
                  "{item.text}"
                </p>
              </div>
              {/* Reviewer Info */}
              <div className="flex items-center space-x-4 pt-6 mt-6 border-t border-slate-100">
                {/* Avatar Icon */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-extrabold tracking-wider ${item.avatarBg} shadow-md`}>
                  {item.avatarInitials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-darkGray">{item.name}</h4>
                  <p className="text-xs text-slate-400 font-medium">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
