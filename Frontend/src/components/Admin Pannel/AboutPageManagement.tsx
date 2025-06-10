// components/Admin Pannel/AboutPageManagement.tsx
import { useState, useEffect } from "react";
import { AboutPage } from "../shared/types";

interface AboutPageManagementProps {
  aboutPage: AboutPage | null;
  onAboutPageUpdate: () => void;
}

export default function AboutPageManagement({
  aboutPage,
  onAboutPageUpdate,
}: AboutPageManagementProps) {
  const [formData, setFormData] = useState({
    title: "",
    description1: "",
    description2: "",
    description3: "",
    whatWeDoTitle: "",
    whatWeDoDescription1: "",
    whatWeDoDescription2: "",
  });
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE = "http://localhost:3000/api/product";

  // Initialize form data when aboutPage changes
  useEffect(() => {
    if (aboutPage) {
      setFormData({
        title: aboutPage.title || "",
        description1: aboutPage.description1 || "",
        description2: aboutPage.description2 || "",
        description3: aboutPage.description3 || "",
        whatWeDoTitle: aboutPage.whatWeDoTitle || "",
        whatWeDoDescription1: aboutPage.whatWeDoDescription1 || "",
        whatWeDoDescription2: aboutPage.whatWeDoDescription2 || "",
      });
      setBannerPreview(aboutPage.Banner);
      setImgPreview(aboutPage.img);
    }
  }, [aboutPage]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const clearForm = () => {
    setFormData({
      title: "",
      description1: "",
      description2: "",
      description3: "",
      whatWeDoTitle: "",
      whatWeDoDescription1: "",
      whatWeDoDescription2: "",
    });
    setBannerFile(null);
    setBannerPreview(null);
    setImgFile(null);
    setImgPreview(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear messages when user starts typing
    if (successMessage) setSuccessMessage("");
    if (error) setError("");
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10MB");
        return;
      }

      setBannerFile(file);
      setError("");
      setSuccessMessage("");

      const reader = new FileReader();
      reader.onloadend = () => setBannerPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError("Image size must be less than 10MB");
        return;
      }

      setImgFile(file);
      setError("");
      setSuccessMessage("");

      const reader = new FileReader();
      reader.onloadend = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description1 ||
      !formData.whatWeDoTitle ||
      !formData.whatWeDoDescription1 ||
      !formData.whatWeDoDescription2
    ) {
      setError("Please fill in all required fields");
      return;
    }

    if (!bannerFile && !aboutPage) {
      setError("Please upload a banner image");
      return;
    }

    if (!imgFile && !aboutPage) {
      setError("Please upload an image");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const submitFormData = new FormData();
      // Send banner as 'image' field first, then img will be handled separately
      if (bannerFile) {
        submitFormData.append("image", bannerFile);
      }

      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitFormData.append(key, value);
      });

      const response = await fetch(`${API_BASE}/about-page`, {
        method: "POST",
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to save about page");
      }

      // If there's an img file, upload it separately
      if (imgFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", imgFile);

        const imgResponse = await fetch(`${API_BASE}/about-img`, {
          method: "PUT",
          body: imgFormData,
        });

        if (!imgResponse.ok) {
          throw new Error("Failed to save main image");
        }
      }

      // Success handling
      onAboutPageUpdate();
      setSuccessMessage(
        aboutPage
          ? "About page updated successfully!"
          : "About page created successfully!"
      );

      // Clear form only if creating new (not updating existing)
      if (!aboutPage) {
        clearForm();
      } else {
        // Just clear the file inputs for updates
        setBannerFile(null);
        setImgFile(null);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save about page"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBannerUpdate = async (file: File) => {
    try {
      setError("");
      setSuccessMessage("");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_BASE}/about-banner`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update banner");
      }

      onAboutPageUpdate();
      setSuccessMessage("Banner updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update banner");
    }
  };

  const handleImgUpdate = async (file: File) => {
    try {
      setError("");
      setSuccessMessage("");
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(`${API_BASE}/about-img`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update image");
      }

      onAboutPageUpdate();
      setSuccessMessage("Image updated successfully!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update image");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        About Page Management
      </h3>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded border border-green-200">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded border border-red-200">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Banner Image <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-4">
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={isSubmitting}
              />
              {aboutPage && (
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleBannerUpdate(file);
                    };
                    input.click();
                  }}
                  className="mt-2 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Update Banner Only
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Main Image */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Main Image <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start gap-4">
            {imgPreview && (
              <img
                src={imgPreview}
                alt="Main image preview"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImgChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={isSubmitting}
              />
              {aboutPage && (
                <button
                  type="button"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) handleImgUpdate(file);
                    };
                    input.click();
                  }}
                  className="mt-2 px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Update Image Only
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Descriptions */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label
              htmlFor="description1"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Description 1 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description1"
              name="description1"
              value={formData.description1}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description2"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Description 2
            </label>
            <textarea
              id="description2"
              name="description2"
              value={formData.description2}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label
              htmlFor="description3"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Description 3
            </label>
            <textarea
              id="description3"
              name="description3"
              value={formData.description3}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            />
          </div>
        </div>

        {/* What We Do Section */}
        <div>
          <label
            htmlFor="whatWeDoTitle"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            What We Do - Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="whatWeDoTitle"
            name="whatWeDoTitle"
            value={formData.whatWeDoTitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
            required
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="whatWeDoDescription1"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              What We Do - Description 1 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="whatWeDoDescription1"
              name="whatWeDoDescription1"
              value={formData.whatWeDoDescription1}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
          </div>
          <div>
            <label
              htmlFor="whatWeDoDescription2"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              What We Do - Description 2 <span className="text-red-500">*</span>
            </label>
            <textarea
              id="whatWeDoDescription2"
              name="whatWeDoDescription2"
              value={formData.whatWeDoDescription2}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : aboutPage
              ? "Update About Page"
              : "Create About Page"}
          </button>
        </div>
      </form>
    </div>
  );
}
