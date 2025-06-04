import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.jpeg";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "What We Do", path: "/service" },
    { name: "Products", path: "/collections" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 py-3 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center flex-shrink-0">
          <img
            src={logo || "/placeholder.svg"}
            alt="Navkar Designs"
            className="w-8 h-8 sm:w-10 sm:h-10 mr-2 object-contain"
          />
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-playfair text-white leading-tight">
              MELANGE
            </span>
            <span className="text-xs tracking-widest text-[#C0C0C0] leading-tight">
              GEMS AND JEWELS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm xl:text-base text-white hover:text-[#d4b978] transition-colors relative group ${
                location.pathname === item.path ? "text-[#d4b978]" : ""
              }`}
            >
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-[#d4b978] transition-all duration-300 ${
                  location.pathname === item.path
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2 -mr-2 hover:bg-gray-800 rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open mobile menu"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-900 z-50 lg:hidden"
          >
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:bg-gray-800 rounded-md transition-colors"
                aria-label="Close mobile menu"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Mobile Navigation Items */}
            <div className="flex flex-col items-center justify-center h-full -mt-16 px-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-xs text-center"
                >
                  <Link
                    to={item.path}
                    className={`text-xl sm:text-2xl text-white py-4 hover:text-[#d4b978] transition-colors block ${
                      location.pathname === item.path ? "text-[#d4b978]" : ""
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Logo (Optional - appears at bottom) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center opacity-50">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Navkar Designs"
                  className="w-6 h-6 mr-2 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-playfair text-white leading-tight">
                    MELANGE
                  </span>
                  <span className="text-xs tracking-widest text-[#C0C0C0] leading-tight">
                    GEMS AND JEWELS
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
