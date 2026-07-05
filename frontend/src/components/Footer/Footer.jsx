import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaBrain } from 'react-icons/fa';
export default function Footer() {
  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '#features' },
    { name: 'Courses', path: '#courses' },
    { name: 'Contact', path: '#contact' },
  ];
  const resources = [
    { name: 'Privacy Policy', path: '#privacy' },
    { name: 'Terms of Service', path: '#terms' },
    { name: 'FAQs', path: '#faqs' },
  ];
  const socials = [
    { icon: <FaGithub className="w-5 h-5" />, url: 'https://github.com', label: 'GitHub' },
    { icon: <FaLinkedin className="w-5 h-5" />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaEnvelope className="w-5 h-5" />, url: 'mailto:contact@LearnSphere.com', label: 'Email' },
  ];
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-primary p-2 rounded-xl text-white">
                <FaBrain className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Learn<span className="text-primary-light">Sphere</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering students and teachers globally with cutting-edge, AI-driven learning tools and interactive content.
            </p>
            {/* Socials */}
            <div className="flex space-x-4 pt-2">
              {socials.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-800 hover:bg-primary rounded-xl text-slate-400 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path.startsWith('#') ? link.path : undefined}
                    className="hover:text-primary-light transition-colors duration-200 text-sm text-slate-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Resources */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2">
              {resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="hover:text-primary-light transition-colors duration-200 text-sm text-slate-400"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter / Contact Hint */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm text-slate-400">Subscribe to get notified when we launch new courses and AI features.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-slate-800 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary-light w-full"
                required
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white rounded-xl px-4 py-2 text-sm font-semibold transition-all hover:shadow-lg hover:shadow-primary/20"
              >
                Go
              </button>
            </form>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 LearnSphere. All Rights Reserved.</p>
          <p className="mt-2 sm:mt-0">Designed for modern educational excellence.</p>
        </div>
      </div>
    </footer>
  );
}
