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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingBanner, setIsUpdatingBanner] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const API_BASE = "https://melangjewelers.onrender.com/api/product";

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

  // Populate form with existing data when aboutPage changes
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
    }
  }, [aboutPage]);

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

    // For new about page, banner is required
    if (!aboutPage && !bannerFile) {
      setError("Please upload a banner image");
      return;
    }

    // For updating existing about page, if no new banner is selected,
    // we need to handle it differently
    if (aboutPage && !bannerFile) {
      await handleContentOnlyUpdate();
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      const submitFormData = new FormData();

      // Add banner image if provided
      if (bannerFile) {
        submitFormData.append("image", bannerFile);
      }

      // Add all form data
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

      // Success handling
      onAboutPageUpdate();
      setSuccessMessage(
        aboutPage
          ? "About page updated successfully!"
          : "About page created successfully!"
      );

      // Clear banner file and preview after successful submission
      setBannerFile(null);
      setBannerPreview(null);

      // Only clear form if it was a new creation
      if (!aboutPage) {
        clearForm();
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save about page"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // New function to handle content-only updates for existing about page
  const handleContentOnlyUpdate = async () => {
    setIsSubmitting(true);
    setError("");
    setSuccessMessage("");

    try {
      // Create a dummy 1x1 transparent pixel image for backend compatibility
      const canvas = document.createElement("canvas");
      canvas.width = 1;
      canvas.height = 1;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalAlpha = 0;
        ctx.fillRect(0, 0, 1, 1);
      }

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob || new Blob());
        }, "image/png");
      });

      const dummyFile = new File([blob], "dummy.png", { type: "image/png" });

      const submitFormData = new FormData();
      submitFormData.append("image", dummyFile);

      // Add all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value) submitFormData.append(key, value);
      });

      const response = await fetch(`${API_BASE}/about-page`, {
        method: "POST",
        body: submitFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to update about page");
      }

      onAboutPageUpdate();
      setSuccessMessage("About page content updated successfully!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update about page"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBannerOnlyUpdate = async () => {
    if (!bannerFile) {
      setError("Please select a banner image to update");
      return;
    }

    if (!aboutPage) {
      setError("No about page exists to update banner");
      return;
    }

    setIsUpdatingBanner(true);
    setError("");
    setSuccessMessage("");

    try {
      const bannerFormData = new FormData();
      bannerFormData.append("image", bannerFile);

      const response = await fetch(`${API_BASE}/about-banner`, {
        method: "PUT",
        body: bannerFormData,
      });

      if (!response.ok) {
        throw new Error("Failed to update banner");
      }

      onAboutPageUpdate();
      setSuccessMessage("Banner updated successfully!");
      setBannerFile(null);
      setBannerPreview(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update banner");
    } finally {
      setIsUpdatingBanner(false);
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

      {/* Info Message for existing about page */}
      {aboutPage && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-blue-800">
              About page exists. You can update the content below (banner is
              optional for updates) or just update the banner separately.
            </span>
          </div>
        </div>
      )}

      {/* Banner Update Section (only show if about page exists) */}
      {aboutPage && (
        <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h4 className="text-md font-medium text-gray-700 mb-4">
            Update Banner Only
          </h4>
          <div className="flex items-start gap-4">
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="New banner preview"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            {aboutPage.Banner && !bannerPreview && (
              <div>
                <p className="text-sm text-gray-600 mb-2">Current Banner:</p>
                <img
                  src={aboutPage.Banner}
                  alt="Current banner"
                  className="w-32 h-20 object-cover rounded border"
                />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-3"
                disabled={isUpdatingBanner}
              />
              <button
                type="button"
                onClick={handleBannerOnlyUpdate}
                disabled={isUpdatingBanner || !bannerFile}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              >
                {isUpdatingBanner ? "Updating Banner..." : "Update Banner Only"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Banner Image - Required for new, optional for update */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Banner Image {!aboutPage && <span className="text-red-500">*</span>}
            {aboutPage && (
              <span className="text-gray-500">
                (optional - leave empty to keep current banner, or upload to
                replace)
              </span>
            )}
          </label>
          <div className="flex items-start gap-4">
            {bannerPreview && (
              <img
                src={bannerPreview}
                alt="Banner preview"
                className="w-32 h-20 object-cover rounded border"
              />
            )}
            {aboutPage && aboutPage.Banner && !bannerPreview && (
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Banner:</p>
                <img
                  src={aboutPage.Banner}
                  alt="Current banner"
                  className="w-32 h-20 object-cover rounded border"
                />
              </div>
            )}
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleBannerChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={isSubmitting}
              />
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
              ? aboutPage
                ? "Updating..."
                : "Creating..."
              : aboutPage
              ? "Update About Page"
              : "Create About Page"}
          </button>
        </div>
      </form>

      {/* Current About Page Details */}
      {aboutPage && (
        <div className="mt-8 border-t pt-8">
          <h4 className="text-lg font-semibold text-gray-700 mb-6">
            Current About Page Details
          </h4>

          <div className="bg-gray-50 rounded-lg p-6 space-y-6">
            {/* Images Section */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Banner Image</h5>
                {aboutPage.Banner && (
                  <img
                    src={aboutPage.Banner}
                    alt="Current banner"
                    className="w-full h-32 object-cover rounded border"
                  />
                )}
              </div>
              <div>
                <h5 className="font-medium text-gray-700 mb-2">Main Image</h5>
                {aboutPage.img && (
                  <img
                    src={aboutPage.img}
                    alt="Current main image"
                    className="w-full h-32 object-cover rounded border"
                  />
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-4">
              <div>
                <h5 className="font-medium text-gray-700 mb-1">Title</h5>
                <p className="text-gray-600 bg-white p-3 rounded border">
                  {aboutPage.title}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">
                    Description 1
                  </h5>
                  <p className="text-gray-600 bg-white p-3 rounded border text-sm">
                    {aboutPage.description1}
                  </p>
                </div>
                {aboutPage.description2 && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">
                      Description 2
                    </h5>
                    <p className="text-gray-600 bg-white p-3 rounded border text-sm">
                      {aboutPage.description2}
                    </p>
                  </div>
                )}
                {aboutPage.description3 && (
                  <div>
                    <h5 className="font-medium text-gray-700 mb-1">
                      Description 3
                    </h5>
                    <p className="text-gray-600 bg-white p-3 rounded border text-sm">
                      {aboutPage.description3}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h5 className="font-medium text-gray-700 mb-1">
                  What We Do - Title
                </h5>
                <p className="text-gray-600 bg-white p-3 rounded border">
                  {aboutPage.whatWeDoTitle}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">
                    What We Do - Description 1
                  </h5>
                  <p className="text-gray-600 bg-white p-3 rounded border text-sm">
                    {aboutPage.whatWeDoDescription1}
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-1">
                    What We Do - Description 2
                  </h5>
                  <p className="text-gray-600 bg-white p-3 rounded border text-sm">
                    {aboutPage.whatWeDoDescription2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
