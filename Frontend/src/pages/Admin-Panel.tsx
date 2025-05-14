import { useState } from "react";
import Sidebar from "../components/Admin Pannel/Sidebar";
import Header from "../components/Admin Pannel/Header";
import Dashboard from "../components/Admin Pannel/Dashboard";
import Products from "../components/Admin Pannel/Products";
import { Product } from "../components/shared/types";

export default function AdminPanel() {
  // State for products list
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Modern Desk Chair",
      description: "Ergonomic office chair with lumbar support",
      price: 199.99,
      category: "Furniture",
      imageUrl: "/api/placeholder/150/100",
      stock: 24,
      createdAt: "2025-03-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Wireless Headphones",
      description:
        "Noise-cancelling over-ear headphones with 30-hour battery life",
      price: 149.99,
      category: "Electronics",
      imageUrl: "/api/placeholder/150/100",
      stock: 56,
      createdAt: "2025-03-20T14:45:00Z",
    },
    {
      id: "3",
      name: "Smart Watch Series 5",
      description: "Health and fitness tracking with heart rate monitor",
      price: 299.99,
      category: "Electronics",
      imageUrl: "/api/placeholder/150/100",
      stock: 18,
      createdAt: "2025-03-25T09:15:00Z",
    },
    {
      id: "4",
      name: "Leather Messenger Bag",
      description: "Handcrafted full-grain leather laptop bag",
      price: 179.99,
      category: "Accessories",
      imageUrl: "/api/placeholder/150/100",
      stock: 12,
      createdAt: "2025-04-01T11:20:00Z",
    },
  ]);

  // State for active section
  const [activeSection, setActiveSection] = useState<
    "dashboard" | "products" | "addProduct"
  >("dashboard");

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Delete product handler
  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  // Add product handler
  const handleAddProduct = (
    name: string,
    category: string,
    imageUrl: string
  ) => {
    // Create a new product with default values
    const newProduct: Product = {
      id: (products.length + 1).toString(), // Simple ID generation
      name,
      category,
      imageUrl: imageUrl || "/api/placeholder/150/100", // Use uploaded image or default placeholder
      description: "", // Empty default description
      price: 0, // Default price
      stock: 0, // Default stock
      createdAt: new Date().toISOString(), // Current timestamp
    };

    // Add new product to state
    setProducts([...products, newProduct]);

    // Navigate back to products list
    setActiveSection("products");
  };

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      } else if (sortBy === "priceHigh") {
        return b.price - a.price;
      } else {
        return a.price - b.price;
      }
    });

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        {/* Header */}
        <Header
          activeSection={activeSection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Main content */}
        <main className="p-6">
          {/* Dashboard Section */}
          {activeSection === "dashboard" && <Dashboard products={products} />}

          {/* Products List Section */}
          {activeSection === "products" && (
            <Products
              products={filteredProducts}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onDeleteProduct={handleDeleteProduct}
              onAddProduct={() => setActiveSection("addProduct")}
            />
          )}

          {/* Add Product Section */}
          {activeSection === "addProduct" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Add New Product
              </h3>
              <AddProductForm
                onAddProduct={handleAddProduct}
                onCancel={() => setActiveSection("products")}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Add Product Form Component
function AddProductForm({
  onAddProduct,
  onCancel,
}: {
  onAddProduct: (name: string, category: string, imageUrl: string) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // List of categories derived from your existing products
  const categories = [
    "Electronics",
    "Furniture",
    "Accessories",
    "Clothing",
    "Home & Kitchen",
    "Other",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (!name.trim()) {
      setError("Product name is required");
      return;
    }

    if (!category) {
      setError("Please select a category");
      return;
    }

    if (!imagePreview) {
      setError("Please upload a product image");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // In a real app, you would upload the image to a server here
    // and get back a URL. For now, we'll just use the preview as the URL.

    // Simulate a brief loading state
    setTimeout(() => {
      onAddProduct(name, category, imagePreview);
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="p-3 rounded text-sm bg-red-100 text-red-700">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter product name"
        />
      </div>

      {/* Product Category */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Product Image Upload */}
      <div>
        <label
          htmlFor="product-image"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Product Image <span className="text-red-500">*</span>
        </label>

        <div
          className={`mt-1 border-2 border-dashed rounded-lg p-4 transition-colors duration-200 ease-in-out cursor-pointer ${
            imagePreview
              ? "border-blue-300 bg-blue-50"
              : "border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => document.getElementById("product-image")?.click()}
        >
          {imagePreview ? (
            <div className="flex flex-col items-center">
              <img
                src={imagePreview}
                alt="Product preview"
                className="h-40 object-contain mb-2"
              />
              <p className="text-sm text-blue-600">Click to change image</p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="mt-1 text-sm text-gray-500">
                Click to upload a product image
              </p>
              <p className="text-xs text-gray-400 mt-1">
                PNG, JPG, GIF up to 5MB
              </p>
            </div>
          )}

          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 mt-6">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-4 py-2 text-white font-medium rounded-md ${
            isSubmitting
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}
