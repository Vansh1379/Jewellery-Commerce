import { FC, ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  color: "indigo" | "green" | "red" | "yellow";
};

const StatCard: FC<StatCardProps> = ({ title, value, icon, color }) => {
  const colorClasses = {
    indigo: "bg-indigo-100 text-indigo-500",
    green: "bg-green-100 text-green-500",
    red: "bg-red-100 text-red-500",
    yellow: "bg-yellow-100 text-yellow-500",
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${colorClasses[color]}`}>{icon}</div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
