import React from 'react';
import { 
  FaBrain, 
  FaPlayCircle, 
  FaYoutube, 
  FaCloudUploadAlt, 
  FaChartLine, 
  FaUserGraduate, 
  FaChalkboardTeacher, 
  FaStar 
} from 'react-icons/fa';
export default function Features() {
  const features = [
    {
      id: 1,
      title: 'AI Quiz Generation',
      description: 'Automatically generate tailor-made science & coding quizzes from any video lesson or document using our advanced AI engine.',
      icon: <FaBrain className="w-6 h-6 text-primary" />,
      badge: 'Popular',
      bgClass: 'group-hover:bg-primary/10',
    },
    {
      id: 2,
      title: 'Interactive Video Lessons',
      description: 'Engaging high-definition lessons structured into bite-sized concepts, complete with in-video checkpoints.',
      icon: <FaPlayCircle className="w-6 h-6 text-secondary" />,
      bgClass: 'group-hover:bg-secondary/10',
    },
    {
      id: 3,
      title: 'YouTube Integration',
      description: 'Seamlessly convert quality YouTube science and engineering video material into interactive STEM modules in one click.',
      icon: <FaYoutube className="w-6 h-6 text-red-500" />,
      bgClass: 'group-hover:bg-red-500/10',
    },
    {
      id: 4,
      title: 'Cloud Video Uploads',
      description: 'Secure, reliable cloud storage for teachers to host private, custom webinars, labs, and interactive lessons.',
      icon: <FaCloudUploadAlt className="w-6 h-6 text-blue-500" />,
      bgClass: 'group-hover:bg-blue-500/10',
    },
    {
      id: 5,
      title: 'Personalized Progress Tracking',
      description: 'Trace learning milestones with depth. Track concepts mastered, speed, quiz accuracy, and strength parameters.',
      icon: <FaChartLine className="w-6 h-6 text-indigo-500" />,
      bgClass: 'group-hover:bg-indigo-500/10',
    },
    {
      id: 6,
      title: 'Comprehensive Student Dashboard',
      description: 'A unified panel for students to view enrolled courses, upcoming quizzes, progress reports, and personalized recommendations.',
      icon: <FaUserGraduate className="w-6 h-6 text-purple-500" />,
      bgClass: 'group-hover:bg-purple-500/10',
    },
    {
      id: 7,
      title: 'Interactive Teacher Dashboard',
      description: 'Empower teachers with tools to create courses, review automatic quiz insights, track student metrics, and send feedback.',
      icon: <FaChalkboardTeacher className="w-6 h-6 text-amber-500" />,
      bgClass: 'group-hover:bg-amber-500/10',
    },
    {
      id: 8,
      title: 'Course Reviews & Ratings',
      description: 'Peer feedback systems allowing students to review courses, helping teachers iterate and maintain premium standards.',
      icon: <FaStar className="w-6 h-6 text-yellow-500" />,
      bgClass: 'group-hover:bg-yellow-500/10',
    },
  ];
  return (
    <section id="features" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs uppercase font-extrabold tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full inline-block">
            Features
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-darkGray font-sans">
            Designed for Modern Educational Excellence
          </p>
          <p className="text-base text-darkGray-light font-normal">
            LearnSphere comes packed with intelligent tools designed to optimize the learning pipeline for students, teachers, and recruiters.
          </p>
        </div>
        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-premium hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative"
            >
              {/* Badge for Popular Feature */}
              {feature.badge && (
                <span className="absolute top-4 right-4 bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {feature.badge}
                </span>
              )}
              <div className="space-y-4">
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center transition-all duration-300 ${feature.bgClass}`}>
                  {feature.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-darkGray group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-darkGray-light leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
              {/* Bottom Subtle Action Decorator */}
              <div className="pt-6 mt-4 border-t border-slate-50 flex items-center text-xs font-semibold text-primary group-hover:translate-x-1 transition-transform">
                <span>Learn more</span>
                <span className="ml-1">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
