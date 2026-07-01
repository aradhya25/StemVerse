import React from 'react';
import { FaGraduationCap, FaUsers, FaBrain, FaPlayCircle } from 'react-icons/fa';
export default function Stats() {
  const stats = [
    {
      id: 1,
      value: '250+',
      label: 'Courses Available',
      description: 'Expert-curated science & tech modules',
      icon: <FaGraduationCap className="w-8 h-8 text-primary" />,
      bgIcon: 'bg-primary/10',
      borderColor: 'hover:border-primary/30',
    },
    {
      id: 2,
      value: '15,000+',
      label: 'Active Students',
      description: 'Rural, college & professional learners',
      icon: <FaUsers className="w-8 h-8 text-secondary" />,
      bgIcon: 'bg-secondary/10',
      borderColor: 'hover:border-secondary/30',
    },
    {
      id: 3,
      value: '185,000+',
      label: 'AI Quizzes Generated',
      description: 'Custom learning checkpoints created',
      icon: <FaBrain className="w-8 h-8 text-blue-500" />,
      bgIcon: 'bg-blue-500/10',
      borderColor: 'hover:border-blue-500/30',
    },
    {
      id: 4,
      value: '620,000+',
      label: 'Lessons Completed',
      description: 'Bite-sized video lessons finished',
      icon: <FaPlayCircle className="w-8 h-8 text-indigo-500" />,
      bgIcon: 'bg-indigo-500/10',
      borderColor: 'hover:border-indigo-500/30',
    },
  ];
  return (
    <section className="py-12 relative z-20 -mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={`bg-white rounded-2xl p-6 border border-slate-100 shadow-premium transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${stat.borderColor} flex items-start space-x-4 group`}
            >
              <div className={`p-3.5 rounded-xl ${stat.bgIcon} transition-all duration-300 group-hover:scale-110`}>
                {stat.icon}
              </div>
              <div className="space-y-1">
                <h3 className="text-3xl font-extrabold text-darkGray tracking-tight font-sans">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold text-darkGray-light">
                  {stat.label}
                </p>
                <p className="text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
