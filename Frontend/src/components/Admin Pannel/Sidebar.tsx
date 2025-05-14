import { FC } from "react";

type SidebarProps = {
  activeSection: "dashboard" | "products" | "addProduct";
  setActiveSection: (section: "dashboard" | "products" | "addProduct") => void;
};

const Sidebar: FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  return (
    <div className="w-64 bg-indigo-800 text-white">
      <div className="p-4 h-16 flex items-center border-b border-indigo-700">
        <h1 className="text-xl font-bold">Products Admin</h1>
      </div>
      <nav className="mt-6">
        <div
          className={`px-4 py-3 flex items-center cursor-pointer ${
            activeSection === "dashboard"
              ? "bg-indigo-900"
              : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveSection("dashboard")}
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          Dashboard
        </div>
        <div
          className={`px-4 py-3 flex items-center cursor-pointer ${
            activeSection === "products"
              ? "bg-indigo-900"
              : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveSection("products")}
        >
          <svg
            className="w-5 h-5 mr-3"
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
          Products
        </div>
        <div
          className={`px-4 py-3 flex items-center cursor-pointer ${
            activeSection === "addProduct"
              ? "bg-indigo-900"
              : "hover:bg-indigo-700"
          }`}
          onClick={() => setActiveSection("addProduct")}
        >
          <svg
            className="w-5 h-5 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Product
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
