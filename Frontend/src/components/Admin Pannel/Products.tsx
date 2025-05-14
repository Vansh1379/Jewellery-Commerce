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
};

const Products: FC<ProductsProps> = ({
  products,
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  onDeleteProduct,
  onAddProduct,
}) => {
  // Get unique categories
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

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

        <ProductTable products={products} onDeleteProduct={onDeleteProduct} />
      </div>
    </div>
  );
};

export default Products;
