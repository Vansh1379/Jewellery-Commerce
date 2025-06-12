import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import collectionsHeaderBg from "../assets/1a.jpg";
import silverJewelryImg from "../assets/8a.jpg";
import goldJewelryImg from "../assets/12a.jpg";
import goldFilledImg from "../assets/26a.jpg";
import brassJewelryImg from "../assets/11a.jpg";
import enamelJewelryImg from "../assets/24a.jpg";
import platingImg from "../assets/7a.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: number;
  name: string;
  img: string;
  catageory: string;
}

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryInfo, setCategoryInfo] = useState<{
    name: string;
    background: string;
  } | null>(null);

  // Category configuration with specific background images
  const categoryConfig: {
    [key: string]: { name: string; apiName: string; background: string };
  } = {
    earrings: {
      name: "Earrings",
      apiName: "Earings", // Note: API uses 'Earings' (typo in API)
      background: silverJewelryImg,
    },
    necklaces: {
      name: "Necklaces",
      apiName: "Necklaces",
      background: goldJewelryImg,
    },
    rings: {
      name: "Rings",
      apiName: "Rings",
      background: goldFilledImg,
    },
    bracelets: {
      name: "Bracelets",
      apiName: "Bracelets",
      background: brassJewelryImg,
    },
    pendants: {
      name: "Pendants",
      apiName: "Pendants",
      background: enamelJewelryImg,
    },
    custom: {
      name: "Custom Designs",
      apiName: "Custom",
      background: platingImg,
    },
  };

  // Fetch products for the category
  useEffect(() => {
    const fetchProducts = async () => {
      if (!categoryId || !categoryConfig[categoryId]) {
        setError("Category not found");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setCategoryInfo({
        name: categoryConfig[categoryId].name,
        background: categoryConfig[categoryId].background,
      });

      try {
        if (categoryId === "custom") {
          // Skip API call for custom designs
          setProducts([]);
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://melangjewelers-production-1.up.railway.app/api/product/category/${categoryConfig[categoryId].apiName}`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${categoryConfig[categoryId].name} products`
          );
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products. Please try again later.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <PageHeader
          title={categoryInfo?.name || "Loading..."}
          subtitle="Discover our exquisite collection"
          background={categoryInfo?.background || collectionsHeaderBg}
        />
        <div className="py-16 md:py-24 flex justify-center items-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !categoryInfo) {
    return (
      <>
        <Navbar />
        <PageHeader
          title="Error"
          subtitle="Something went wrong"
          background={collectionsHeaderBg}
        />
        <div className="py-16 md:py-24 flex justify-center items-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error || "Category not found"}</p>
            <button
              onClick={() => (window.location.href = "/collections")}
              className="bg-gold text-gray-900 px-6 py-2 rounded hover:bg-gold-dark transition-colors"
            >
              Back to Collections
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PageHeader
        title={categoryInfo.name}
        subtitle={`Explore our ${categoryInfo.name.toLowerCase()} collection`}
        background={categoryInfo.background}
      />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair mb-3"
            >
              {categoryInfo.name} Collection
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-4"
            ></motion.div>
          </motion.div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 mb-4">
                {categoryId === "custom"
                  ? "Contact us to discuss your custom jewelry design requirements."
                  : "No products available in this category at the moment."}
              </p>
              {categoryId === "custom" && (
                <a
                  href="/contact"
                  className="inline-block px-6 py-2 bg-gold text-gray-900 font-medium hover:bg-gold-dark transition-colors rounded-md"
                >
                  Get in Touch
                </a>
              )}
            </div>
          ) : (
            <div className="space-y-12">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? "lg:rtl" : ""
                  }`}
                >
                  <div
                    className={`relative overflow-hidden rounded-lg shadow-md ${
                      index % 2 === 1 ? "lg:ltr" : ""
                    }`}
                  >
                    <img
                      src={product.img || "/placeholder.jpg"}
                      alt={product.name}
                      className="w-full h-auto max-h-80 object-cover transition-transform duration-700 hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className={index % 2 === 1 ? "lg:ltr" : ""}>
                    <h3 className="text-2xl font-playfair mb-3">
                      {product.name}
                    </h3>
                    <div className="w-16 h-px bg-gold mb-4"></div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="font-medium">Category:</span>
                      <span className="ml-2">{product.catageory}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gold p-8 md:p-12 rounded-lg text-center"
          >
            <h2 className="text-2xl font-playfair mb-3 text-gray-900">
              Interested in Our {categoryInfo.name}?
            </h2>
            <p className="text-gray-900 max-w-2xl mx-auto mb-6">
              Contact us to learn more about our{" "}
              {categoryInfo.name.toLowerCase()} collection or to discuss custom
              designs tailored to your preferences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors rounded-md"
              >
                Contact Us
              </a>
              <a
                href="/collections"
                className="inline-block px-6 py-2 border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition-colors rounded-md"
              >
                View All Collections
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CategoryPage;
