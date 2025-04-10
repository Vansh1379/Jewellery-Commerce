import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  images,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when modal opens with new images
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
    }
  }, [isOpen, images]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, images?.length, onClose]);

  if (!isOpen || !images || images.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/85 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[90%] max-w-4xl max-h-[90vh] rounded overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-white w-10 h-10 rounded-full flex items-center justify-center z-10 shadow-md hover:bg-gold transition-colors"
              onClick={onClose}
            >
              <FaTimes />
            </button>

            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-playfair">{title}</h2>
            </div>

            <div className="relative h-[60vh] bg-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <img
                    src={images[currentIndex] || "/placeholder.svg"}
                    alt={`${title} - ${currentIndex + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-gold transition-colors"
                onClick={prevSlide}
              >
                <FaChevronLeft />
              </button>

              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 w-12 h-12 bg-white/80 rounded-full flex items-center justify-center shadow-md hover:bg-gold transition-colors"
                onClick={nextSlide}
              >
                <FaChevronRight />
              </button>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-gold scale-125"
                        : "bg-gray-400"
                    }`}
                    onClick={() => goToSlide(index)}
                  ></button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 text-center">
              <span className="text-sm text-gray-600">
                {currentIndex + 1} / {images.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CollectionModal;
