import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import earring1 from "../assets/1a.jpg";
import earring2 from "../assets/1a.jpg";
import earring3 from "../assets/1a.jpg";
import necklace1 from "../assets/1a.jpg";
import necklace2 from "../assets/1a.jpg";
import ring1 from "../assets/1a.jpg";
import ring2 from "../assets/1a.jpg";
import bracelet1 from "../assets/1a.jpg";
import pendant1 from "../assets/1a.jpg";
import Navbar from "../components/Navbar";

interface Product {
  name: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  material: string;
  dimensions: string;
  weight: string;
  images: string[];
  features: string[];
}

interface ProductsData {
  [key: string]: Product;
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImage, setCurrentImage] = useState(0);

  // This would normally come from an API or database
  const products: ProductsData = {
    earrings: {
      name: "Gold Circular Stud Earrings",
      description:
        "Exquisite handcrafted gold stud earrings featuring intricate detailing and a timeless circular design. These elegant pieces are perfect for both everyday wear and special occasions.",
      price: "$1,250",
      rating: 4.9,
      reviews: 28,
      material: "18K Gold",
      dimensions: "15mm diameter",
      weight: "4.2g per earring",
      images: [earring1, earring2, earring3],
      features: [
        "Handcrafted by master artisans",
        "18K gold with intricate detailing",
        "Secure butterfly backs",
        "Comes in a luxury gift box",
        "Certificate of authenticity included",
      ],
    },
    necklaces: {
      name: "Diamond Pendant Necklace",
      description:
        "Stunning diamond pendant necklace featuring a brilliant-cut center stone surrounded by smaller diamonds. The pendant hangs from a delicate 18K gold chain that complements the piece perfectly.",
      price: "$2,450",
      rating: 4.8,
      reviews: 19,
      material: "18K Gold, Diamonds",
      dimensions: "18-inch chain, 12mm pendant",
      weight: "5.8g total",
      images: [necklace1, necklace2],
      features: [
        "Ethically sourced diamonds",
        "VS clarity, F-G color diamonds",
        "Adjustable chain length",
        "Secure lobster clasp",
        "Includes luxury presentation box",
      ],
    },
    rings: {
      name: "Sapphire Halo Ring",
      description:
        "Elegant sapphire ring featuring a deep blue center stone surrounded by a halo of brilliant-cut diamonds. Set in 18K white gold, this ring makes a perfect statement piece or engagement ring.",
      price: "$3,150",
      rating: 5.0,
      reviews: 12,
      material: "18K White Gold, Sapphire, Diamonds",
      dimensions: "Size 7 (resizable)",
      weight: "4.5g",
      images: [ring1, ring2],
      features: [
        "Natural blue sapphire (1.2 carats)",
        "Diamond halo (0.5 carats total)",
        "Comfort-fit band",
        "Custom sizing available",
        "Includes appraisal certificate",
      ],
    },
    bracelets: {
      name: "Gold Chain Bracelet",
      description:
        "Sophisticated gold chain bracelet with a modern design. Versatile enough for everyday wear yet elegant enough for special occasions.",
      price: "$980",
      rating: 4.7,
      reviews: 15,
      material: "14K Gold",
      dimensions: "7.5 inches",
      weight: "8.3g",
      images: [bracelet1],
      features: [
        "Handcrafted links",
        "Secure box clasp with safety catch",
        "High polish finish",
        "Adjustable length",
        "Tarnish-resistant",
      ],
    },
    pendants: {
      name: "Emerald Drop Pendant",
      description:
        "Exquisite emerald pendant featuring a pear-shaped stone set in 18K gold with diamond accents. The vibrant green emerald catches the light beautifully.",
      price: "$1,850",
      rating: 4.9,
      reviews: 8,
      material: "18K Gold, Emerald, Diamonds",
      dimensions: "22mm drop length",
      weight: "3.6g",
      images: [pendant1],
      features: [
        "Colombian emerald (0.85 carats)",
        "Diamond accents (0.2 carats total)",
        "Chain sold separately",
        "Secure bail design",
        "Includes certificate of authenticity",
      ],
    },
  };

  const product = id ? products[id] : null;

  useEffect(() => {
    // Reset current image when product changes
    setCurrentImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="container py-20 mt-20">
        <div className="text-center py-16">
          <h2 className="text-3xl font-playfair mb-4">Product Not Found</h2>
          <p className="text-gray-700 mb-8">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link to="/collections" className="btn btn-primary">
            Back to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20">
      <Navbar />
      <div className="container py-16">
        <Link
          to="/collections"
          className="inline-flex items-center text-gray-600 hover:text-gold transition-colors mb-8"
        >
          <FaArrowLeft size={16} className="mr-2" /> Back to Collections
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gray-50 aspect-square relative rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[currentImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            </div>

            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className={`bg-gray-50 aspect-square relative rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                      index === currentImage
                        ? "border-gold"
                        : "border-transparent hover:border-gold/50"
                    }`}
                    onClick={() => setCurrentImage(index)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-contain p-4"
                    />
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-playfair">{product.name}</h1>

            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(product.rating)
                        ? "text-gold fill-gold"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="text-2xl font-medium">{product.price}</div>

            <p className="text-gray-700">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <span className="text-sm text-gray-500">Material</span>
                <p className="font-medium">{product.material}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Dimensions</span>
                <p className="font-medium">{product.dimensions}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Weight</span>
                <p className="font-medium">{product.weight}</p>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-lg font-medium mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-gold mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-6 space-y-4 md:space-y-0 md:space-x-4 md:flex">
              <button className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-colors rounded">
                Add to Cart
              </button>
              <button className="w-full md:w-auto px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors rounded">
                Request Custom Design
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
