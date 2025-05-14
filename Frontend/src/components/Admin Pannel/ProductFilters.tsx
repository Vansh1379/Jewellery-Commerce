import { FC } from "react";

type ProductFiltersProps = {
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  categories: string[];
  productCount: number;
  onAddProduct: () => void;
};

const ProductFilters: FC<ProductFiltersProps> = ({
  categoryFilter,
  setCategoryFilter,
  sortBy,
  setSortBy,
  categories,
  productCount,
  onAddProduct,
}) => {
  return (
    <div className="p-4 flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200">
      <div className="flex items-center mb-4 md:mb-0">
        <h3 className="text-lg font-semibold text-gray-700">Product List</h3>
        <span className="ml-2 bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded">
          {productCount} items
        </span>
      </div>
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        <select
          className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceHigh">Price: High to Low</option>
          <option value="priceLow">Price: Low to High</option>
        </select>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md text-sm"
          onClick={onAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
