import { FC } from "react";
import { Product } from "../shared/types";
import StatCard from "../Admin Pannel/StatCard";
import RecentProductsTable from "./RecentProductsTable";

type DashboardProps = {
  products: Product[];
};

const Dashboard: FC<DashboardProps> = ({ products }) => {
  // Calculate stats
  const totalProducts = products.length;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Products"
          value={totalProducts}
          color="indigo"
          icon={
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          }
        />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Recent Products
        </h3>
        <RecentProductsTable products={products} />
      </div>
    </div>
  );
};

export default Dashboard;
