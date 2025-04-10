import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function CollectionGrid() {
  const collections = [
    {
      id: 1,
      name: "Earrings",
      image: "/images/collection-earrings.jpg",
      count: 48,
      featured: true,
    },
    {
      id: 2,
      name: "Necklaces",
      image: "/images/collection-necklaces.jpg",
      count: 36,
      featured: true,
    },
    {
      id: 3,
      name: "Rings",
      image: "/images/collection-rings.jpg",
      count: 52,
      featured: true,
    },
    {
      id: 4,
      name: "Bracelets",
      image: "/images/collection-bracelets.jpg",
      count: 29,
      featured: false,
    },
    {
      id: 5,
      name: "Pendants",
      image: "/images/collection-pendants.jpg",
      count: 41,
      featured: false,
    },
  ];

  const featuredCollections = collections.filter((c) => c.featured);
  const otherCollections = collections.filter((c) => !c.featured);

  return (
    <section className="py-24 bg-[#f9f5f0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-sm uppercase tracking-widest text-[#a38d5d]"
          >
            Browse Our Collections
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif mt-2 mb-4"
          >
            Curated Jewelry Collections
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="w-24 h-[1px] bg-[#d4b978] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/collections/${collection.id}`} className="block">
                <div className="relative overflow-hidden mb-4">
                  <div className="aspect-[3/4] relative">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-serif mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {collection.count} pieces
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {otherCollections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: (index + featuredCollections.length) * 0.1,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <Link to={`/collections/${collection.id}`} className="block">
                <div className="relative overflow-hidden mb-4">
                  <div className="aspect-[16/9] relative">
                    <img
                      src={collection.image || "/placeholder.svg"}
                      alt={collection.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-serif mb-1">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {collection.count} pieces
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/collections"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#1a1a1a] text-white font-medium hover:bg-[#333] transition-colors"
          >
            Explore All Collections
          </Link>
        </div>
      </div>
    </section>
  );
}
