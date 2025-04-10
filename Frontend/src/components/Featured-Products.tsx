import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import img1 from "../assets/14a.jpg";
import img2 from "../assets/15a.jpg";
import img3 from "../assets/15b.jpg";
import img4 from "../assets/16a.jpg";

const FeaturedProducts: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      name: "Gold Circular Stud Earrings",
      category: "Earrings",
      price: "$1,250",
      image: img1,
    },
    {
      id: 2,
      name: "Blue Sapphire Diamond Earrings",
      category: "Earrings",
      price: "$2,450",
      image: img2,
    },
    {
      id: 3,
      name: "Ruby Gemstone Gold Earrings",
      category: "Earrings",
      price: "$1,850",
      image: img3,
    },
    {
      id: 4,
      name: "Emerald Gold Stud Earrings",
      category: "Earrings",
      price: "$1,650",
      image: img4,
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-[#a38d5d]"
          >
            Exquisite Collection
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif mt-2 mb-4"
          >
            Featured Pieces
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-24 h-[1px] bg-[#d4b978] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="relative overflow-hidden mb-6 bg-[#f0f0f0]">
                  <div className="aspect-square relative">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div
                    className={`absolute inset-0 bg-black/10 opacity-0 transition-opacity duration-300 ${
                      hoveredIndex === index ? "opacity-100" : ""
                    }`}
                  ></div>
                </div>
                <h3 className="text-lg font-serif mb-1 transition-colors group-hover:text-[#a38d5d]">
                  {product.name}
                </h3>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                  <span className="font-medium">{product.price}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/collections"
            className="inline-flex items-center text-[#a38d5d] hover:text-[#7d6a43] transition-colors group"
          >
            View All Collections{" "}
            <ArrowRight
              size={16}
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
