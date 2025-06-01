import { useState } from "react";
import Sidebar from "../components/Admin Pannel/Sidebar";
import Header from "../components/Admin Pannel/Header";
import Dashboard from "../components/Admin Pannel/Dashboard";
import Products from "../components/Admin Pannel/Products";
import { Product } from "../components/shared/types";

export default function AdminPanel() {
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

  const [activeSection, setActiveSection] = useState<
    "dashboard" | "products" | "addProduct"
  >("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  const handleAddProduct = (
    name: string,
    category: string,
    imageUrl: string
  ) => {
    const newProduct: Product = {
      id: (products.length + 1).toString(),
      name,
      category,
      imageUrl: imageUrl || "/api/placeholder/150/100",
      description: "",
      price: 0,
      stock: 0,
      createdAt: new Date().toISOString(),
    };

    setProducts([...products, newProduct]);
    setActiveSection("products");
  };

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
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <Header
          activeSection={activeSection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="p-6">
          {activeSection === "dashboard" && <Dashboard products={products} />}
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
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const categories = [
    "Earings",
    "Necklaces",
    "Rings",
    "Bracelets",
    "Pendants",
    "Custom Designs",
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) return setError("Product name is required");
    if (!category) return setError("Please select a category");
    if (!file) return setError("Please upload a product image");

    setIsSubmitting(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("name", name);
      formData.append("category", category);

      const response = await fetch("http://localhost:3000/api/product/add", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const imageUrl = data.imageUrl;
      if (!imageUrl) throw new Error("Image upload failed");

      onAddProduct(name, category, imageUrl);
    } catch (err) {
      console.error(err);
      setError("Failed to upload image.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="p-3 rounded text-sm bg-red-100 text-red-700">
          {error}
        </div>
      )}

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
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Enter product name"
        />
      </div>

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
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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

      <div>
        <label
          htmlFor="product-image"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Product Image <span className="text-red-500">*</span>
        </label>
        <div
          className={`mt-1 border-2 border-dashed rounded-lg p-4 cursor-pointer ${
            imagePreview
              ? "border-blue-300 bg-blue-50"
              : "border-gray-300 hover:bg-gray-50"
          }`}
          onClick={() => document.getElementById("product-image")?.click()}
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-w-xs object-cover rounded"
            />
          ) : (
            <p className="text-sm text-gray-500 text-center">
              Click to upload image
            </p>
          )}
        </div>
        <input
          id="product-image"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}
