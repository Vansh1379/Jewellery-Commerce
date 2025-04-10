import { motion } from "framer-motion";

export default function ContactCta() {
  return (
    <section className="py-24 bg-[#f0ebe3]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif mb-6"
          >
            Let's Create Your Perfect Jewelry Piece
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 mb-8"
          >
            Whether you're looking for a bespoke piece or interested in our
            collections, we're here to help bring your vision to life. Contact
            us today to start your jewelry journey.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-[#1a1a1a] text-white font-medium hover:bg-[#333] transition-colors"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
