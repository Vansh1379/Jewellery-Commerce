import React from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import customDesignHeaderBg from "../assets/1a.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

const CustomDesign: React.FC = () => {
  const processSteps: ProcessStep[] = [
    {
      id: "consultation",
      title: "1. Initial Consultation:",
      description:
        "Share your ideas, sketches, or inspirations with our design team. We'll discuss your preferences, budget, and any specific requirements.",
    },
    {
      id: "development",
      title: "2. Design Development:",
      description:
        "Our talented designers will create detailed renderings or prototypes based on your input, ensuring the design aligns with your vision.",
    },
    {
      id: "refinement",
      title: "3. Review and Refinement:",
      description:
        "Review the design with us and make any adjustments needed. We will refine the details to ensure complete satisfaction.",
    },
    {
      id: "production",
      title: "4. Crafting and Production:",
      description:
        "Once the design is finalized, our expert craftsmen will bring your jewelry to life with meticulous attention to detail and quality.",
    },
    {
      id: "delivery",
      title: "5. Delivery:",
      description:
        "Receive your bespoke piece, crafted to perfection and ready to be cherished.",
    },
  ];

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
        title="Custom Jewelry Design"
        subtitle="Bring your unique vision to life with our bespoke jewelry design service"
        background={customDesignHeaderBg}
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
              Bring Your Vision to Life
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-4"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 font-serif"
            >
              At RUVIRA ATELIER, we turn your unique ideas into exquisite
              jewelry. Our custom design service allows you to collaborate with
              our skilled artisans to create bespoke pieces that perfectly
              reflect your vision and style.
            </motion.p>
          </motion.div>

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
              How It Works:
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-8"
            ></motion.div>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {processSteps.map((step) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-left"
              >
                <h3 className="text-xl md:text-2xl font-playfair mb-4 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-justify font-serif">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-70px" }}
            variants={containerVariants}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-playfair mb-3"
            >
              Why Choose Custom Design?
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-4"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 font-serif"
            >
              Create jewelry that is uniquely yours. Express your personality,
              commemorate special moments, or bring your creative vision to life
              with our custom design service.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0 }}
              viewport={{ once: true, margin: "-70px" }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-playfair mb-3">
                Personalized Design
              </h3>
              <div className="w-10 h-px bg-gold mb-3"></div>
              <p className="text-gray-700 text-sm font-serif">
                Create pieces that reflect your unique style and personality,
                tailored specifically to your preferences and vision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              viewport={{ once: true, margin: "-70px" }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-playfair mb-3">
                Expert Craftsmanship
              </h3>
              <div className="w-10 h-px bg-gold mb-3"></div>
              <p className="text-gray-700 text-sm font-serif">
                Our skilled artisans bring decades of experience and attention
                to detail to every custom piece we create.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true, margin: "-70px" }}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-playfair mb-3">Quality Materials</h3>
              <div className="w-10 h-px bg-gold mb-3"></div>
              <p className="text-gray-700 text-sm font-serif">
                We use only the finest materials including sterling silver,
                gold, and precious stones to ensure lasting beauty.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gold p-8 md:p-12 rounded-lg text-center"
          >
            <h2 className="text-2xl font-playfair mb-3 text-gray-900">
              Ready to Create Your Dream Jewelry?
            </h2>
            <p className="text-gray-900 max-w-2xl mx-auto mb-6 font-serif">
              Let's bring your vision to life. Contact us today to start your
              custom jewelry design journey and create a piece that's uniquely
              yours.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors rounded-md"
            >
              Start Your Custom Design
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CustomDesign;
