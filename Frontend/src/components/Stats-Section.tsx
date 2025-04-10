import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import img2 from "../assets/16a.jpg";

export default function StatsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  const stats = [
    {
      number: 6,
      label: "Master Craftsmen",
      image: img2,
    },
    {
      number: 2000,
      label: "Unique Designs",
      image: img2,
    },
    {
      number: 400,
      label: "Projects Completed",
      image: img2,
    },
    {
      number: 11,
      label: "Years of Expertise",
      image: img2,
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-widest text-[#a38d5d]"
          >
            Excellence in Numbers
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl md:text-4xl font-serif mt-2 mb-4"
          >
            Stats And Numbers
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-24 h-[1px] bg-[#d4b978] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
              className="bg-[#f9f5f0] group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={stat.image || "/placeholder.svg"}
                  alt={stat.label}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 text-center">
                <div className="relative">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasAnimated ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
                    className="block text-5xl font-serif text-[#a38d5d] mb-2"
                  >
                    {stat.number === 2000 ? "2K+" : stat.number}
                  </motion.span>
                </div>
                <span className="uppercase text-sm tracking-wider text-gray-600">
                  {stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
