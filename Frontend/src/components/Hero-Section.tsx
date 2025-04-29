import { useEffect, useState } from "react";
import img from "../assets/11a.jpg";
import img2 from "../assets/12a.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Exquisite Craftsmanship",
      subtitle: "Handcrafted Luxury Jewelry",
      description:
        "Transforming precious metals and gemstones into timeless pieces of art",
      image: img,
      cta: "Explore Collections",
      link: "/collections",
    },
    {
      title: "Timeless Elegance",
      subtitle: "Premium Jewelry Design",
      description:
        "Where tradition meets contemporary design for the modern connoisseur",
      image: img2,
      cta: "Discover Our Story",
      link: "/about",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="relative h-screen md:h-[80vh] lg:h-[75vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="object-cover object-center w-full h-full"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: currentSlide === index ? 1 : 0,
                y: currentSlide === index ? 0 : 20,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl"
            >
              <span className="block text-[#d4b978] text-sm uppercase tracking-widest mb-2">
                {slide.subtitle}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-4">
                {slide.title}
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                {slide.description}
              </p>
              <Link
                to={slide.link}
                className="inline-flex items-center px-8 py-3 bg-[#d4b978] text-[#1a1a1a] font-medium hover:bg-[#c4aa68] transition-colors duration-300"
              >
                {slide.cta}
              </Link>
            </motion.div>
          </div>
        </div>
      ))}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-[#d4b978]" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
