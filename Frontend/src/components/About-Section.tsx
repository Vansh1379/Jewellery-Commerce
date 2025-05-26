import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import imm1 from "../assets/17a.jpg";
import img2 from "../assets/17b.jpg";

export default function AboutSection() {
  return (
    <section className="py-24 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="text-sm uppercase tracking-widest text-[#d4b978]">
              Our Heritage
            </span>
            <h2 className="text-3xl md:text-4xl font-serif mt-2 mb-6">
              We Are Passionate And Always Produce Better Designs For You
            </h2>
            <div className="w-20 h-[1px] bg-[#d4b978] mb-8"></div>

            <p className="mb-6 text-white/80">
              Welcome to MELANGE GEMS AND JEWELS, where creativity meets
              craftsmanship to bring your jewelry dreams to life! Situated in
              the heart of Rajasthan's vibrant city, Jaipur, also known as the
              Pink City, we are the epitome of heritage and modernity in the
              jewelry industry.
            </p>

            <p className="mb-8 text-white/80">
              At MELANGE GEMS AND JEWELS, we specialize in transforming sketches
              into stunning, bespoke jewelry pieces that capture the essence of
              elegance and individuality. As a leading 925 sterling jewelry
              manufacturer and OEM jewelry manufacturer, our team utilizes
              cutting-edge processing technologies and a diverse array of
              jewelry-making techniques to ensure impeccable quality and
              exquisite design.
            </p>

            <Link
              to="/about"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#d4b978] text-[#1a1a1a] font-medium hover:bg-[#c4aa68] transition-colors duration-300"
            >
              Discover Our Story
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 border-[3px] border-[#d4b978]">
              <div className="transform translate-x-4 translate-y-4">
                <img
                  src={imm1}
                  alt="Jewelry craftsmanship"
                  width={600}
                  height={700}
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 w-2/3 z-0">
              <img
                src={img2}
                alt="Jewelry detail"
                width={400}
                height={300}
                className="w-full h-auto object-cover border-[3px] border-[#d4b978]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
