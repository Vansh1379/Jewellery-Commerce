import { FC } from "react";
import { Product } from "../shared/types";
import ProductFilters from "./ProductFilters";
import ProductTable from "../Admin Pannel/ProductTable";

type ProductsProps = {
  products: Product[];
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  onDeleteProduct: (id: string) => void;
  onAddProduct: () => void;
  onProductDeleted?: () => void; // Optional callback to refresh products after deletion
};

const Products: FC<ProductsProps> = ({
  products,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  onDeleteProduct,
  onAddProduct,
  onProductDeleted,
}) => {
  // Get unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Handle product deletion with local state update
  const handleDeleteProduct = (deletedProductId: string) => {
    // Call the original onDeleteProduct prop (for parent state management)
    onDeleteProduct(deletedProductId);

    // Call optional refresh callback if provided
    if (onProductDeleted) {
      onProductDeleted();
    }
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow mb-6">
        <ProductFilters
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          categories={categories}
          productCount={products.length}
          onAddProduct={onAddProduct}
        />
        <ProductTable
          products={products}
          onDeleteProduct={handleDeleteProduct}
          onProductDeleted={onProductDeleted}
        />
      </div>
    </div>
  );
};

export default Products;
