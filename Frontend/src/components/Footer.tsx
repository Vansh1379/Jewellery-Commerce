import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] text-white/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/images/logo.png"
                alt="Navkar Designs"
                width={50}
                height={50}
                className="mr-3"
              />
              <div>
                <span className="text-xl font-serif text-white">NAVKAR</span>
                <span className="block text-xs tracking-widest text-[#d4b978]">
                  DESIGNS INDIA
                </span>
              </div>
            </div>
            <p className="mb-6">
              We are into Jewellery Manufacturing Services where we bring the
              concept of jewellery from a sketch on paper to a live manufactured
              jewellery piece in any base metal, combined with colour stones,
              diamonds, CVD diamonds, and Cubic Zirconia.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white/80 hover:text-[#d4b978] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-[#d4b978] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-white/80 hover:text-[#d4b978] transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                "Home",
                "Collections",
                "About Us",
                "Services",
                "Products",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:text-[#d4b978] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif mb-6 text-white">Collections</h3>
            <ul className="space-y-3">
              {[
                "Earrings",
                "Necklaces",
                "Rings",
                "Bracelets",
                "Pendants",
                "Custom Designs",
              ].map((item) => (
                <li key={item}>
                  <a
                    href={`/collections/${item
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="hover:text-[#d4b978] transition-colors"
                  >
                    {item}
                  </a>
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
                <span>
                  1-TA-04 Jawaharnagar, Near Tatkaleshwar Mahadev Mandir,
                  Jaipur-302004, India
                </span>
              </li>
              <li className="flex">
                <Mail size={20} className="mr-3 flex-shrink-0 text-[#d4b978]" />
                <a
                  href="mailto:info@navkardesigns.com"
                  className="hover:text-[#d4b978] transition-colors"
                >
                  info@navkardesigns.com
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
            © {new Date().getFullYear()} Navkar Designs India. All rights
            reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-4">
              <span className="text-sm">Shipping Partners:</span>
              <img
                src="/images/fedex.png"
                alt="FedEx"
                width={60}
                height={30}
                className="h-6 w-auto"
              />
              <img
                src="/images/ups.png"
                alt="UPS"
                width={60}
                height={30}
                className="h-6 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
