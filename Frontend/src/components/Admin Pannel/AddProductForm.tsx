// components/Admin Pannel/AddProductForm.tsx
import { useState } from "react";

interface AddProductFormProps {
  onAddProduct: () => void;
  onCancel: () => void;
}

export default function AddProductForm({
  onAddProduct,
  onCancel,
}: AddProductFormProps) {
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

  const API_BASE =
    "https://melangjewelers-production.up.railway.app/api/product";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setError("");

      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
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

      const response = await fetch(`${API_BASE}/add`, {
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
    <div className="space-y-5 max-w-2xl mx-auto">
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
                className="w-32 h-32 object-cover rounded mx-auto border sm:w-40 sm:h-40"
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
