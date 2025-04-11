import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import CollectionModal from "../components/CollectionModal";
import collectionsHeaderBg from "../assets/1a.jpg";
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
import Footer from "../components/Footer";

interface Collection {
  id: string;
  name: string;
  description: string;
  count: number;
  featured: boolean;
  images: string[];
}

const Collections: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState<Collection | null>(
    null
  );

  const collections: Collection[] = [
    {
      id: "earrings",
      name: "Earrings",
      description: "Elegant earrings crafted with precision and artistry",
      count: 48,
      featured: true,
      images: [earring1, earring2, earring3],
    },
    {
      id: "necklaces",
      name: "Necklaces",
      description: "Stunning necklaces that make a statement",
      count: 36,
      featured: true,
      images: [necklace1, necklace2],
    },
    {
      id: "rings",
      name: "Rings",
      description: "Exquisite rings for every occasion",
      count: 52,
      featured: true,
      images: [ring1, ring2],
    },
    {
      id: "bracelets",
      name: "Bracelets",
      description: "Beautiful bracelets that complement your style",
      count: 29,
      featured: false,
      images: [bracelet1],
    },
    {
      id: "pendants",
      name: "Pendants",
      description: "Unique pendants that tell your story",
      count: 41,
      featured: false,
      images: [pendant1],
    },
    {
      id: "custom",
      name: "Custom Designs",
      description: "Bespoke jewelry pieces created just for you",
      count: 15,
      featured: false,
      images: [],
    },
  ];

  const openModal = (collection: Collection) => {
    setActiveCollection(collection);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const featuredCollections = collections.filter((c) => c.featured);
  const otherCollections = collections.filter((c) => !c.featured);

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

  return (
    <>
      <Navbar />
      <PageHeader
        title="Our Collections"
        subtitle="Discover our exquisite range of handcrafted jewelry collections"
        background={collectionsHeaderBg}
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto flex flex-col items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair mb-4"
            >
              Explore Our Collections
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-6"
            ></motion.div>
            <motion.p variants={itemVariants} className="text-gray-700">
              Each piece in our collections tells a unique story of artistry and
              elegance. Browse through our carefully curated selections and find
              the perfect jewelry to complement your style.
            </motion.p>
          </motion.div>

          <div className="mb-16">
            <h3 className="text-2xl font-playfair mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-0.5 after:bg-gold after:-bottom-3">
              Featured Collections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-2"
                >
                  <div
                    className="relative overflow-hidden h-0 pb-[75%]"
                    onClick={() =>
                      collection.images.length > 0 && openModal(collection)
                    }
                    style={{
                      cursor:
                        collection.images.length > 0 ? "pointer" : "default",
                    }}
                  >
                    <img
                      src={collection.images[0] || "/placeholder.jpg"}
                      alt={collection.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="text-sm text-white/80">
                          {collection.count} pieces
                        </span>
                        {collection.images.length > 0 && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-gray-900 px-4 py-2 rounded font-medium"
                          >
                            View Collection
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {collection.description}
                    </p>
                    <Link
                      to={`/collections/${collection.id}`}
                      className="text-gold-dark font-medium hover:text-gold transition-colors inline-flex items-center"
                    >
                      Browse {collection.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-playfair mb-8 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-20 after:h-0.5 after:bg-gold after:-bottom-3">
              More Collections
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherCollections.map((collection, index) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-2"
                >
                  <div
                    className="relative overflow-hidden h-0 pb-[75%]"
                    onClick={() =>
                      collection.images.length > 0 && openModal(collection)
                    }
                    style={{
                      cursor:
                        collection.images.length > 0 ? "pointer" : "default",
                    }}
                  >
                    <img
                      src={collection.images[0] || "/placeholder.jpg"}
                      alt={collection.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <span className="text-sm text-white/80">
                          {collection.count} pieces
                        </span>
                        {collection.images.length > 0 && (
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-gray-900 px-4 py-2 rounded font-medium"
                          >
                            View Collection
                          </motion.span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-playfair mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {collection.description}
                    </p>
                    <Link
                      to={`/collections/${collection.id}`}
                      className="text-gold-dark font-medium hover:text-gold transition-colors inline-flex items-center"
                    >
                      Browse {collection.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <CollectionModal
        isOpen={modalOpen}
        onClose={closeModal}
        images={activeCollection?.images || []}
        title={activeCollection?.name || ""}
      />
    </>
  );
};

export default Collections;
