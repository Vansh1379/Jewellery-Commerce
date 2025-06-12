import { FC, useState } from "react";
import { Product } from "../shared/types";

type ProductTableProps = {
  products: Product[];
  onDeleteProduct: (id: string) => void;
  onProductDeleted?: () => void; // Optional callback to refresh the products list
};

const ProductTable: FC<ProductTableProps> = ({
  products,
  onDeleteProduct,
  onProductDeleted,
}) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // API function to delete product
  const deleteProductAPI = async (productId: string): Promise<unknown> => {
    try {
      // Fixed the API endpoint URL - removed duplicate 'product' and fixed protocol
      const response = await fetch(
        `https://melangjewelers-production-1.up.railway.app/api/product/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Failed to delete product");
      }

      return await response.json();
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  // Handle delete with confirmation and API call
  const handleDeleteProduct = async (
    productId: string,
    productName: string
  ) => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      // Set loading state
      setDeletingId(productId);

      // Call the API to delete from backend
      await deleteProductAPI(productId);

      // Call the parent component's onDeleteProduct to update local state
      onDeleteProduct(productId);

      // Call optional refresh callback if provided
      if (onProductDeleted) {
        onProductDeleted();
      }

      // Show success message
      alert("Product deleted successfully!");
    } catch (error) {
      // Handle error
      console.error("Failed to delete product:", error);
      alert(
        `Failed to delete product: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      // Clear loading state
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Product
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-md object-cover"
                        src={product.imageUrl}
                        alt={product.name}
                        onError={(e) => {
                          // Fallback image if the original fails to load
                          (e.target as HTMLImageElement).src =
                            "/placeholder-image.png";
                        }}
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className={`${
                      deletingId === product.id
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-red-600 hover:text-red-900"
                    } transition-colors duration-200`}
                    onClick={() =>
                      handleDeleteProduct(product.id, product.name)
                    }
                    disabled={deletingId === product.id}
                  >
                    {deletingId === product.id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {products.length === 0 && (
        <div className="p-6 text-center">
          <p className="text-gray-500">
            No products found matching your criteria.
          </p>
        </div>
      )}
    </>
  );
};

export default ProductTable;
