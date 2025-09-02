import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import logo from "../assets/ruvira.png";

interface DropdownItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  dropdown?: DropdownItem[];
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<{
    [key: string]: boolean;
  }>({});
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileDropdowns({});
  }, [location]);

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

  const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    {
      name: "Our Forte",
      path: "/service",
      dropdown: [
        { name: "What We Do", path: "/service" },
        { name: "Custom Design", path: "/custom-design" },
      ],
    },
    {
      name: "Products",
      path: "/collections",
      dropdown: [
        { name: "Earrings", path: "/collections/earrings" },
        { name: "Necklace", path: "/collections/necklaces" },
        { name: "Rings", path: "/collections/rings" },
        { name: "Bracelets", path: "/collections/bracelets" },
        { name: "Pendants", path: "/collections/pendants" },
        { name: "Gold", path: "/collections/gold" },
      ],
    },
    { name: "Contact", path: "/contact" },
  ];

  const toggleMobileDropdown = (itemName: string) => {
    setMobileDropdowns((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const isActiveParent = (item: NavItem) => {
    if (location.pathname === item.path) return true;
    if (item.dropdown) {
      return item.dropdown.some(
        (dropdownItem) => location.pathname === dropdownItem.path
      );
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900 py-3 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="relative z-10 flex items-center flex-shrink-0">
          <img
            src={logo || "/placeholder.svg"}
            alt="Navkar Designs"
            className="w-16 h-16 sm:w-16 sm:h-16 mr-2 object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.dropdown && setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                to={item.path}
                className={`text-sm xl:text-base text-white hover:text-[#d4b978] transition-colors relative group flex items-center ${
                  isActiveParent(item) ? "text-[#d4b978]" : ""
                }`}
              >
                {item.name}
                {item.dropdown && (
                  <FaChevronDown
                    className={`ml-1 text-xs transition-transform duration-200 ${
                      hoveredItem === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-[#d4b978] transition-all duration-300 ${
                    isActiveParent(item) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>

              {/* Desktop Dropdown */}
              {item.dropdown && (
                <AnimatePresence>
                  {hoveredItem === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50"
                    >
                      {item.dropdown.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.path}
                          className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#d4b978] transition-colors ${
                            location.pathname === dropdownItem.path
                              ? "bg-gray-100 text-[#d4b978]"
                              : ""
                          }`}
                        >
                          {dropdownItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
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
            <div className="flex flex-col items-center justify-center h-full -mt-16 px-4 overflow-y-auto">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full max-w-xs text-center"
                >
                  <div className="relative">
                    <div className="flex items-center justify-center">
                      <Link
                        to={item.path}
                        className={`text-xl sm:text-2xl text-white py-4 hover:text-[#d4b978] transition-colors ${
                          isActiveParent(item) ? "text-[#d4b978]" : ""
                        }`}
                        onClick={() =>
                          !item.dropdown && setIsMobileMenuOpen(false)
                        }
                      >
                        {item.name}
                      </Link>
                      {item.dropdown && (
                        <button
                          onClick={() => toggleMobileDropdown(item.name)}
                          className="ml-2 text-white hover:text-[#d4b978] transition-colors"
                        >
                          <FaChevronDown
                            className={`text-sm transition-transform duration-200 ${
                              mobileDropdowns[item.name] ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Dropdown */}
                    {item.dropdown && (
                      <AnimatePresence>
                        {mobileDropdowns[item.name] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2 pb-4 space-y-2">
                              {item.dropdown.map((dropdownItem) => (
                                <Link
                                  key={dropdownItem.name}
                                  to={dropdownItem.path}
                                  className={`block text-base text-gray-300 hover:text-[#d4b978] transition-colors py-2 ${
                                    location.pathname === dropdownItem.path
                                      ? "text-[#d4b978]"
                                      : ""
                                  }`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {dropdownItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile Logo (Optional - appears at bottom) */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex items-center opacity-50">
                <img
                  src={logo || "/placeholder.svg"}
                  alt="Navkar Designs"
                  className="w-16 h-16 mr-2 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-playfair text-white leading-tight">
                    RUVERA
                  </span>
                  <span className="text-xs tracking-widest text-[#C0C0C0] leading-tight">
                    ATELIER
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
