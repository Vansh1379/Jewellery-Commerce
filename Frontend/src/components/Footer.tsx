import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import logo from "../assets/logo.jpeg";

interface NavItem {
  name: string;
  path: string;
}

const Footer: React.FC = () => {
  const quickLinks: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/collections" },
    { name: "About Us", path: "/about" },
    { name: "Service", path: "/service" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];

  const collections: NavItem[] = [
    { name: "Earrings", path: "/collections" },
    { name: "Necklaces", path: "/collections" },
    { name: "Rings", path: "/collections" },
    { name: "Bracelets", path: "/collections" },
    { name: "Pendants", path: "/collections" },
    { name: "Custom Designs", path: "/collections" },
  ];

  return (
    <footer className="bg-[#1a1a1a] text-white/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-6">
              <img
                src={logo}
                alt="Melange Designs"
                width={50}
                height={50}
                className="mr-3"
              />
              <div>
                <span className="text-xl font-serif text-white">MELANGE</span>
                <span className="block text-xs tracking-widest text-[#d4b978]">
                  GEMS AND JEWELS
                </span>
              </div>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://facebook.com/your-page"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#d4b978] transition-colors"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#d4b978] transition-colors"
                aria-label="Visit our Instagram page"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-[#d4b978] transition-colors"
                aria-label="Visit our Twitter page"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((item: NavItem) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#d4b978] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6 text-white">Collections</h3>
            <ul className="space-y-3">
              {collections.map((item: NavItem) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="hover:text-[#d4b978] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6 text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin
                  size={20}
                  className="mr-3 flex-shrink-0 text-[#d4b978]"
                />
                <span>1- TA Jawarharnagar, Near Ahmedabad, India</span>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-3 flex-shrink-0 text-[#d4b978]" />
                <a
                  href="mailto:info@melange.com"
                  className="hover:text-[#d4b978] transition-colors"
                >
                  info@melange.com
                </a>
              </li>
              <li className="flex">
                <Phone
                  size={20}
                  className="mr-3 flex-shrink-0 text-[#d4b978]"
                />
                <a
                  href="tel:+919876543210"
                  className="hover:text-[#d4b978] transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Melange Gems And Jewels. All rights
            reserved
          </p>
          <div className="mt-4 md:mt-0"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
