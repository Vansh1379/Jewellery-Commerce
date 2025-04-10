import React, { useState } from "react";
import { motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import contactHeaderBg from "../assets/1a.jpg";

interface FormData {
  name: string;
  email: string;
  service: string;
  phone: string;
  message: string;
}

interface FormStatus {
  submitted: boolean;
  success: boolean;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    service: "",
    phone: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulate form submission
    setFormStatus({
      submitted: true,
      success: true,
      message: "Thank you for your message. We will get back to you shortly!",
    });

    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      service: "",
      phone: "",
      message: "",
    });

    // Reset form status after 5 seconds
    setTimeout(() => {
      setFormStatus({
        submitted: false,
        success: false,
        message: "",
      });
    }, 5000);
  };

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
      <PageHeader
        title="Contact Us"
        subtitle="Let's discuss your vision and bring your jewelry dreams to life"
        background={contactHeaderBg}
      />

      <section className="py-16 md:py-24">
        <div className="container">
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
              Let's Talk About Your Project
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="w-24 h-px bg-gold mx-auto mb-6"
            ></motion.div>
            <motion.p variants={itemVariants} className="text-gray-700">
              Whether you're looking for a bespoke piece or interested in our
              collections, we're here to help bring your vision to life.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white rounded-md"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Service You're Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white rounded-md"
                      >
                        <option value="">Select a service</option>
                        <option value="custom-design">Custom Design</option>
                        <option value="ready-collection">
                          Ready Collection
                        </option>
                        <option value="jewelry-repair">Jewelry Repair</option>
                        <option value="bulk-order">Bulk Order</option>
                        <option value="consultation">
                          Design Consultation
                        </option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold bg-white rounded-md resize-y"
                    ></textarea>
                  </div>

                  {formStatus.submitted && (
                    <div
                      className={`p-4 mb-6 rounded-md ${
                        formStatus.success
                          ? "bg-green-50 text-green-800 border border-green-200"
                          : "bg-red-50 text-red-800 border border-red-200"
                      }`}
                    >
                      {formStatus.message}
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors rounded-md"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white p-8 border border-gray-200 rounded-lg shadow-sm">
                <div className="mb-8">
                  <h3 className="text-xl font-playfair mb-4">Jaipur Office</h3>
                  <div className="w-16 h-px bg-gold mb-6"></div>
                </div>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gold mr-4 flex-shrink-0">
                      <FaMapMarkerAlt size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Address</h4>
                      <p className="text-gray-600">
                        1-TA-04 Jawaharnagar, Near Tatkaleshwar Mahadev Mandir,
                        Jaipur-302004, India
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gold mr-4 flex-shrink-0">
                      <FaEnvelope size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Email</h4>
                      <p className="text-gray-600">
                        <a
                          href="mailto:info@navkardesigns.com"
                          className="hover:text-gold transition-colors"
                        >
                          info@navkardesigns.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gold mr-4 flex-shrink-0">
                      <FaPhone size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Phone</h4>
                      <p className="text-gray-600">
                        <a
                          href="tel:+919876543210"
                          className="hover:text-gold transition-colors"
                        >
                          +91 98765 43210
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h4 className="font-medium mb-4">Connect With Us</h4>
                  <div className="flex space-x-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white transition-colors"
                    >
                      <FaFacebookF />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white transition-colors"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 hover:bg-gold hover:text-white transition-colors"
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.8673810077223!2d75.7967!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db4a4b7a29c05%3A0x4c7a553e9d054cdf!2sJaipur%2C%20Rajasthan%2C%20India!5e0!3m2!1sen!2sus!4v1650450879000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Navkar Designs Location"
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
