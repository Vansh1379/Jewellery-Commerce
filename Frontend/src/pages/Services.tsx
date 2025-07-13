import React from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import servicesHeaderBg from "../assets/1a.jpg";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
}

interface FinishItem {
  title: string;
  description: string;
}

const Services: React.FC = () => {
  const services: ServiceItem[] = [
    {
      id: "silver",
      title: "925 Sterling Silver Jewelry Manufacturing",
      description:
        "Our sterling silver jewelry is a testament to our commitment to quality and craftsmanship. We use 925 sterling silver, renowned for its durability and shine, to create elegant and timeless pieces. From minimalist designs to intricate patterns, our skilled artisans bring each piece to life, ensuring it meets the highest standards of excellence.",
    },
    {
      id: "gold",
      title: "Gold Jewelry Production",
      description:
        "We specialize in crafting exquisite gold jewelry, offering a variety of karats to suit diverse preferences and styles. Whether it's 9kt, 14kt, 18kt, or 22kt gold, we combine traditional techniques with modern innovations to produce stunning gold jewelry that enhances every wearer's beauty and grace.",
    },
    {
      id: "gold-filled",
      title: "Gold-Filled Jewelry",
      description:
        "Our gold-filled jewelry provides an affordable yet luxurious alternative to solid gold. By bonding a thick layer of gold to a base metal, we ensure that our gold-filled pieces retain their beauty and durability, offering long-lasting value and elegance.",
    },
    {
      id: "brass",
      title: "Brass Jewelry Creation",
      description:
        "Brass is a versatile and affordable material that allows for a wide range of designs and finishes. Our brass jewelry is meticulously crafted to offer both style and durability, making it a popular choice for fashion-forward pieces that make a statement.",
    },
    {
      id: "enamel",
      title: "Enamel Jewelry",
      description:
        "Our enamel jewelry adds a vibrant splash of color to our collections. Utilizing high-quality enameling techniques, we create designs that feature beautiful, colorful details that stand out and captivate attention.",
    },
    {
      id: "plating",
      title: "Plating",
      description:
        "We offer a range of in-house jewelry plating services to enhance both the beauty and durability of your pieces. Choose from our various options including yellow gold flash, rose gold flash, yellow vermeil (available in 1, 2, or 3 microns), and rose vermeil (also in 1, 2, or 3 microns). Additionally, we provide black ruthenium for a modern edge, white rhodium for a bright, reflective finish, as well as E-coating and anti-tarnish coating to protect and preserve your jewelry.",
    },
  ];

  const finishes: FinishItem[] = [
    {
      title: "Matte Finish",
      description:
        "Offers a refined, subtle texture that adds sophistication and elegance to your jewelry.",
    },
    {
      title: "High Polish Finish",
      description:
        "Provides a mirror-like sheen that enhances the brilliance and sparkle of your pieces, creating a dazzling effect.",
    },
    {
      title: "Satin Finish",
      description:
        "Creates a smooth, velvety appearance with a soft luster, balancing matte and high polish.",
    },
    {
      title: "Hammered Finish",
      description:
        "Features textured indentations that catch and reflect light, adding character and dimension.",
    },
    {
      title: "Brushed Finish",
      description:
        "Displays fine, parallel lines that create a textured, contemporary look with a subtle sheen.",
    },
    {
      title: "Antique Finish",
      description:
        "Incorporates darkened recesses that highlight intricate designs, giving pieces a vintage appeal.",
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
        title="Our Services"
        subtitle="Discover our comprehensive range of jewelry manufacturing services"
        background={servicesHeaderBg}
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
              What We Do
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-4"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 font-serif"
            >
              At Melange Gems and Jewels, we turn your imagination into
              exquisite jewelry. Our team of expert designers and skilled
              artisans craft world-class jewelry at our state-of-the-art
              manufacturing facility in India.
            </motion.p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-8">
            {services.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-left"
              >
                <h3 className="text-xl md:text-2xl font-playfair mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-justify font-serif">
                  {service.description}
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
              Exquisite Finishes
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-4"
            ></motion.div>
            <motion.p
              variants={itemVariants}
              className="text-gray-700 font-serif"
            >
              Choose from a variety of exquisite finishes to achieve your
              desired look. Our expert craftsmen can apply these finishes to
              create the perfect aesthetic.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {finishes.map((finish, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-70px" }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-playfair mb-3">{finish.title}</h3>
                <div className="w-10 h-px bg-gold mb-3"></div>
                <p className="text-gray-700 text-sm font-serif">
                  {finish.description}
                </p>
              </motion.div>
            ))}
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
              Ready to Start Your Jewelry Project?
            </h2>
            <p className="text-gray-900 max-w-2xl mx-auto mb-6 font-serif">
              Contact us today to discuss your vision and requirements. Our team
              is ready to bring your jewelry dreams to life.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-2 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors rounded-md"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Services;
