import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaBrain } from "react-icons/fa";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "#features" },
    { name: "About", path: "#about" },
    { name: "Contact", path: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 p-2 text-white shadow-md">
              <FaBrain className="h-6 w-6" />
            </div>

            <span className="text-2xl font-bold">
              Learn<span className="text-primary">Sphere</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) =>
              link.path.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.path}
                  className="font-medium text-gray-700 hover:text-primary transition"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-medium text-gray-700 hover:text-primary transition"
                >
                  {link.name}
                </Link>
              ),
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="font-medium text-gray-700 hover:text-primary transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-3xl text-gray-700"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl border-t">
          <div className="px-6 py-5 flex flex-col gap-5">
            {navLinks.map((link) =>
              link.path.startsWith("#") ? (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-700 hover:text-primary"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="font-medium text-gray-700 hover:text-primary"
                >
                  {link.name}
                </Link>
              ),
            )}

            <hr />

            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="text-center border rounded-lg py-2 font-semibold"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
