// components/Admin Pannel/HomeBannerManagement.tsx
import { useState, useEffect, useRef } from "react";
import { HomeBanner } from "../shared/types";

interface HomeBannerManagementProps {
  banners: HomeBanner;
  onBannerUpdate: () => void;
}

export default function HomeBannerManagement({
  banners,
  onBannerUpdate,
}: HomeBannerManagementProps) {
  const [uploading, setUploading] = useState<{
    banner1: boolean;
    banner2: boolean;
  }>({
    banner1: false,
    banner2: false,
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<{
    banner1: File | null;
    banner2: File | null;
  }>({
    banner1: null,
    banner2: null,
  });

  // File input refs
  const banner1InputRef = useRef<HTMLInputElement>(null);
  const banner2InputRef = useRef<HTMLInputElement>(null);

  const API_BASE = "http://localhost:3000/api/product";

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

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Please select a valid image file";
    }
    if (file.size > 10 * 1024 * 1024) {
      return "Image size must be less than 10MB";
    }
    return null;
  };

  const handleFileSelect = (position: "1" | "2", file: File) => {
    const validation = validateFile(file);
    if (validation) {
      setError(validation);
      return;
    }

    const bannerKey = position === "1" ? "banner1" : "banner2";
    setSelectedFiles((prev) => ({ ...prev, [bannerKey]: file }));
    setError("");
  };

  const handleBannerUpload = async (position: "1" | "2") => {
    const bannerKey = position === "1" ? "banner1" : "banner2";
    const file = selectedFiles[bannerKey];

    if (!file) {
      setError(`Please select a file for Banner ${position} first`);
      return;
    }

    setUploading((prev) => ({ ...prev, [bannerKey]: true }));
    setError("");
    setSuccessMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("position", position);

      const response = await fetch(`${API_BASE}/home-banner`, {
        method: "POST",
        body: formData,
        // Add headers for better CORS handling
        headers: {
          // Don't set Content-Type, let browser set it with boundary for FormData
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.msg || "Failed to upload banner");
      }

      // Clear selected file after successful upload
      setSelectedFiles((prev) => ({ ...prev, [bannerKey]: null }));

      // Clear file input
      if (position === "1" && banner1InputRef.current) {
        banner1InputRef.current.value = "";
      }
      if (position === "2" && banner2InputRef.current) {
        banner2InputRef.current.value = "";
      }

      onBannerUpdate();
      setSuccessMessage(
        `Banner ${position} ${
          banners[bannerKey] ? "updated" : "uploaded"
        } successfully!`
      );
    } catch (err) {
      console.error("Upload error:", err);
      setError(err instanceof Error ? err.message : "Failed to upload banner");
    } finally {
      setUploading((prev) => ({ ...prev, [bannerKey]: false }));
    }
  };

  const handleBannerDelete = async (position: "1" | "2") => {
    if (
      !window.confirm(`Are you sure you want to delete banner ${position}?`)
    ) {
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      // Fixed: Use position as bannerId since your backend expects :bannerId param
      const response = await fetch(`${API_BASE}/home-banner/${position}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.msg || "Failed to delete banner");
      }

      onBannerUpdate();
      setSuccessMessage(`Banner ${position} deleted successfully!`);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err instanceof Error ? err.message : "Failed to delete banner");
    }
  };

  const handleFileInputClick = (position: "1" | "2") => {
    const inputRef = position === "1" ? banner1InputRef : banner2InputRef;
    inputRef.current?.click();
  };

  const handleFileInputChange =
    (position: "1" | "2") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFileSelect(position, file);
      }
    };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Home Page Banners
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

      <div className="grid md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3">Banner 1</h4>

          {/* File input (hidden) */}
          <input
            type="file"
            ref={banner1InputRef}
            accept="image/*"
            onChange={handleFileInputChange("1")}
            className="hidden"
          />

          {banners.banner1 ? (
            <div className="space-y-3">
              <img
                src={banners.banner1}
                alt="Banner 1"
                className="w-full h-48 object-cover rounded border"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleFileInputClick("1")}
                  disabled={uploading.banner1}
                  className={`flex-1 px-3 py-2 text-center text-white rounded transition-colors ${
                    uploading.banner1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 cursor-pointer"
                  }`}
                >
                  {uploading.banner1 ? "Processing..." : "Select New Image"}
                </button>
                <button
                  onClick={() => handleBannerDelete("1")}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={uploading.banner1}
                >
                  Delete
                </button>
              </div>

              {/* Show selected file and upload button */}
              {selectedFiles.banner1 && (
                <div className="mt-3 p-3 bg-blue-50 rounded border">
                  <p className="text-sm text-gray-600 mb-2">
                    Selected: {selectedFiles.banner1.name}
                  </p>
                  <button
                    onClick={() => handleBannerUpload("1")}
                    disabled={uploading.banner1}
                    className={`w-full px-3 py-2 text-center text-white rounded transition-colors ${
                      uploading.banner1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    }`}
                  >
                    {uploading.banner1 ? "Uploading..." : "Upload New Banner"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <button
                  onClick={() => handleFileInputClick("1")}
                  disabled={uploading.banner1}
                  className={`w-full text-gray-500 transition-colors ${
                    uploading.banner1
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="mx-auto h-12 w-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p>Click to select Banner 1</p>
                  <p className="text-xs mt-1">Max size: 10MB</p>
                </button>
              </div>

              {/* Show selected file and upload button */}
              {selectedFiles.banner1 && (
                <div className="p-3 bg-blue-50 rounded border">
                  <p className="text-sm text-gray-600 mb-2">
                    Selected: {selectedFiles.banner1.name}
                  </p>
                  <button
                    onClick={() => handleBannerUpload("1")}
                    disabled={uploading.banner1}
                    className={`w-full px-3 py-2 text-center text-white rounded transition-colors ${
                      uploading.banner1
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    }`}
                  >
                    {uploading.banner1 ? "Uploading..." : "Upload Banner 1"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Banner 2 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3">Banner 2</h4>

          {/* File input (hidden) */}
          <input
            type="file"
            ref={banner2InputRef}
            accept="image/*"
            onChange={handleFileInputChange("2")}
            className="hidden"
          />

          {banners.banner2 ? (
            <div className="space-y-3">
              <img
                src={banners.banner2}
                alt="Banner 2"
                className="w-full h-48 object-cover rounded border"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleFileInputClick("2")}
                  disabled={uploading.banner2}
                  className={`flex-1 px-3 py-2 text-center text-white rounded transition-colors ${
                    uploading.banner2
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 cursor-pointer"
                  }`}
                >
                  {uploading.banner2 ? "Processing..." : "Select New Image"}
                </button>
                <button
                  onClick={() => handleBannerDelete("2")}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  disabled={uploading.banner2}
                >
                  Delete
                </button>
              </div>

              {/* Show selected file and upload button */}
              {selectedFiles.banner2 && (
                <div className="mt-3 p-3 bg-blue-50 rounded border">
                  <p className="text-sm text-gray-600 mb-2">
                    Selected: {selectedFiles.banner2.name}
                  </p>
                  <button
                    onClick={() => handleBannerUpload("2")}
                    disabled={uploading.banner2}
                    className={`w-full px-3 py-2 text-center text-white rounded transition-colors ${
                      uploading.banner2
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    }`}
                  >
                    {uploading.banner2 ? "Uploading..." : "Upload New Banner"}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <button
                  onClick={() => handleFileInputClick("2")}
                  disabled={uploading.banner2}
                  className={`w-full text-gray-500 transition-colors ${
                    uploading.banner2
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:text-gray-700"
                  }`}
                >
                  <svg
                    className="mx-auto h-12 w-12 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <p>Click to select Banner 2</p>
                  <p className="text-xs mt-1">Max size: 10MB</p>
                </button>
              </div>

              {/* Show selected file and upload button */}
              {selectedFiles.banner2 && (
                <div className="p-3 bg-blue-50 rounded border">
                  <p className="text-sm text-gray-600 mb-2">
                    Selected: {selectedFiles.banner2.name}
                  </p>
                  <button
                    onClick={() => handleBannerUpload("2")}
                    disabled={uploading.banner2}
                    className={`w-full px-3 py-2 text-center text-white rounded transition-colors ${
                      uploading.banner2
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    }`}
                  >
                    {uploading.banner2 ? "Uploading..." : "Upload Banner 2"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
