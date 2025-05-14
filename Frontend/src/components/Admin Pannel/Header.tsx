import { FC } from "react";

type HeaderProps = {
  activeSection: "dashboard" | "products" | "addProduct";
  searchTerm: string;
  setSearchTerm: (term: string) => void;
};

const Header: FC<HeaderProps> = ({
  activeSection,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center px-6">
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">
          {activeSection === "dashboard" && "Dashboard"}
          {activeSection === "products" && "All Products"}
          {activeSection === "addProduct" && "Add New Product"}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2.5">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-sm">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
