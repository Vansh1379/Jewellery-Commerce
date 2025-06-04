import { useState, useEffect } from "react";
import Sidebar from "../components/Admin Pannel/Sidebar";
import Header from "../components/Admin Pannel/Header";
import Dashboard from "../components/Admin Pannel/Dashboard";
import Products from "../components/Admin Pannel/Products";
import { Product } from "../components/shared/types";

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState<
    "dashboard" | "products" | "addProduct"
  >("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "http://localhost:3000/api/product/products"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle different possible response structures
      const productsData = Array.isArray(data)
        ? data
        : data.products || data.data || [];

      // Define the API response type
      interface ApiProduct {
        id: number | string;
        name: string;
        img?: string;
        imageUrl?: string;
        catageory?: string;
        category?: string;
      }

      // Map the API response to match your component's expected structure
      const mappedProducts = productsData.map((product: ApiProduct) => ({
        id: product.id?.toString() || product.id, // Ensure id is string
        name: product.name,
        category: product.catageory || product.category, // Handle both spellings
        imageUrl: product.img || product.imageUrl, // Map 'img' to 'imageUrl'
      }));

      setProducts(mappedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch products");

      // Fallback to sample data if API fails
      setProducts([
        {
          id: "1",
          name: "Modern Desk Chair",
          category: "Furniture",
          imageUrl:
            "https://via.placeholder.com/150x100/cccccc/666666?text=Chair",
        },
        {
          id: "2",
          name: "Wireless Headphones",
          category: "Electronics",
          imageUrl:
            "https://via.placeholder.com/150x100/cccccc/666666?text=Headphones",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/product/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove product from local state
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleAddProduct = () => {
    // Refresh products list after adding new product
    fetchProducts();
    setActiveSection("products");
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

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
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <div className="flex items-center justify-between">
                <span>Error: {error}</span>
                <button
                  onClick={fetchProducts}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

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
  onAddProduct: () => void;
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
      // Validate file type
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setError(""); // Clear any previous errors

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.onerror = () => {
        setError("Failed to read image file");
        setImagePreview(null);
      };
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Reset form
      setName("");
      setCategory("");
      setImagePreview(null);
      setFile(null);

      onAddProduct();
    } catch (err) {
      console.error("Add product error:", err);
      setError(err instanceof Error ? err.message : "Failed to add product");
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter product name"
          disabled={isSubmitting}
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isSubmitting}
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
          className={`mt-1 border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${
            imagePreview
              ? "border-blue-300 bg-blue-50"
              : "border-gray-300 hover:bg-gray-50"
          } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={() =>
            !isSubmitting && document.getElementById("product-image")?.click()
          }
        >
          {imagePreview ? (
            <div className="text-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded mx-auto border"
                onError={(e) => {
                  console.error("Image preview failed to load:", imagePreview);
                  e.currentTarget.src =
                    "https://via.placeholder.com/128x128/cccccc/666666?text=Error";
                }}
              />
              <p className="text-xs text-gray-500 mt-2">
                Click to change image
              </p>
            </div>
          ) : (
            <div className="text-center py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm text-gray-500 mt-2">
                Click to upload image
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
            </div>
          )}
        </div>
        <input
          id="product-image"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
          disabled={isSubmitting}
        />
        {file && (
          <p className="text-xs text-gray-500 mt-1">
            Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </div>
    </div>
  );
}
