// components/Admin Pannel/HomeBannerManagement.tsx
import { useState } from "react";
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

  const API_BASE =
    "https://melangjewelers-production.up.railway.app/api/product";

  const handleBannerUpload = async (position: "1" | "2", file: File) => {
    const bannerKey = position === "1" ? "banner1" : "banner2";
    setUploading((prev) => ({ ...prev, [bannerKey]: true }));
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("position", position);

      const response = await fetch(`${API_BASE}/home-banner`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload banner");
      }

      onBannerUpdate();
    } catch (err) {
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

    try {
      const response = await fetch(`${API_BASE}/home-banner/${position}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete banner");
      }

      onBannerUpdate();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete banner");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-6">
        Home Page Banners
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Banner 1 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3">Banner 1</h4>
          {banners.banner1 ? (
            <div className="space-y-3">
              <img
                src={banners.banner1}
                alt="Banner 1"
                className="w-full h-48 object-cover rounded border"
              />
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleBannerUpload("1", file);
                    }}
                    disabled={uploading.banner1}
                  />
                  <div className="w-full px-3 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                    {uploading.banner1 ? "Updating..." : "Update"}
                  </div>
                </label>
                <button
                  onClick={() => handleBannerDelete("1")}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBannerUpload("1", file);
                  }}
                  disabled={uploading.banner1}
                />
                <div className="text-gray-500">
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
                  <p>
                    {uploading.banner1
                      ? "Uploading..."
                      : "Click to upload Banner 1"}
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>

        {/* Banner 2 */}
        <div className="border rounded-lg p-4">
          <h4 className="font-medium text-gray-700 mb-3">Banner 2</h4>
          {banners.banner2 ? (
            <div className="space-y-3">
              <img
                src={banners.banner2}
                alt="Banner 2"
                className="w-full h-48 object-cover rounded border"
              />
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleBannerUpload("2", file);
                    }}
                    disabled={uploading.banner2}
                  />
                  <div className="w-full px-3 py-2 text-center bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                    {uploading.banner2 ? "Updating..." : "Update"}
                  </div>
                </label>
                <button
                  onClick={() => handleBannerDelete("2")}
                  className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleBannerUpload("2", file);
                  }}
                  disabled={uploading.banner2}
                />
                <div className="text-gray-500">
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
                  <p>
                    {uploading.banner2
                      ? "Uploading..."
                      : "Click to upload Banner 2"}
                  </p>
                </div>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
