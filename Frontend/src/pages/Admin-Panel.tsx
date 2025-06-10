// AdminPanel.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Admin Pannel/Sidebar";
import Header from "../components/Admin Pannel/Header";
import Dashboard from "../components/Admin Pannel/Dashboard";
import Products from "../components/Admin Pannel/Products";
import AddProductForm from "../components/Admin Pannel/AddProductForm";
import HomeBannerManagement from "../components/Admin Pannel/HomeBannerManagement";
import AboutPageManagement from "../components/Admin Pannel/AboutPageManagement";
import { Product, HomeBanner, AboutPage } from "../components/shared/types";

export default function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [homeBanners, setHomeBanners] = useState<HomeBanner>({
    banner1: null,
    banner2: null,
  });
  const [aboutPage, setAboutPage] = useState<AboutPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState<
    "dashboard" | "products" | "addProduct" | "homeBanners" | "aboutPage"
  >("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Fixed API base URL
  const API_BASE = "http://localhost:3000/api/product";

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setAuthToken(token);
      setIsAuthenticated(true);
    } else {
      // No token found, redirect to login
      navigate("/login");
      return;
    }
    setAuthLoading(false);
  }, [navigate]);

  // Handle token expiration or invalid token
  const handleTokenExpired = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
    localStorage.removeItem("adminToken");
    // Reset all data
    setProducts([]);
    setHomeBanners({ banner1: null, banner2: null });
    setAboutPage(null);
    setActiveSection("dashboard");
    // Redirect to login page
    navigate("/login");
  };

  // Fetch products from API with authentication
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      // Add authorization header if token exists
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(`${API_BASE}/products`, { headers });

      if (!response.ok) {
        if (response.status === 401) {
          // Token expired or invalid
          handleTokenExpired();
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const productsData = Array.isArray(data)
        ? data
        : data.products || data.data || [];

      interface ApiProduct {
        id: number | string;
        name: string;
        img?: string;
        imageUrl?: string;
        catageory?: string;
        category?: string;
      }

      const mappedProducts = productsData.map((product: ApiProduct) => ({
        id: product.id?.toString() || product.id,
        name: product.name,
        category: product.catageory || product.category,
        imageUrl: product.img || product.imageUrl,
      }));

      setProducts(mappedProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch home banners with authentication
  const fetchHomeBanners = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(`${API_BASE}/home-banners`, { headers });
      if (response.ok) {
        const data = await response.json();
        setHomeBanners({
          banner1: data.banner1,
          banner2: data.banner2,
        });
      } else if (response.status === 401) {
        handleTokenExpired();
      }
    } catch (err) {
      console.error("Failed to fetch home banners:", err);
    }
  };

  // Fetch about page with authentication
  const fetchAboutPage = async () => {
    try {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };

      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(`${API_BASE}/about-page`, { headers });
      if (response.ok) {
        const data = await response.json();
        setAboutPage(data.aboutPage);
      } else if (response.status === 401) {
        handleTokenExpired();
      }
    } catch (err) {
      console.error("Failed to fetch about page:", err);
    }
  };

  // Fetch all data when authenticated
  useEffect(() => {
    if (isAuthenticated && authToken) {
      fetchProducts();
      fetchHomeBanners();
      fetchAboutPage();
    }
  }, [isAuthenticated, authToken]);

  // Handle delete product - this will be called by the ProductTable component
  const handleDeleteProduct = (id: string) => {
    // Remove the product from local state immediately
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleAddProduct = () => {
    fetchProducts();
    setActiveSection("products");
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category &&
        product.category.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Show loading screen while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, return null (user will be redirected)
  if (!isAuthenticated) {
    return null;
  }

  // Show loading screen while fetching data
  if (loading) {
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <div className="flex-1 flex items-center justify-center p-4 text-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6">
        <Header
          activeSection={activeSection}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <main className="p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <div className="flex items-center justify-between">
                <span>Error: {error}</span>
                <button
                  onClick={fetchProducts}
                  className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {activeSection === "dashboard" && <Dashboard products={products} />}

          {activeSection === "products" && (
            <Products
              products={filteredProducts}
              categoryFilter={categoryFilter}
              setCategoryFilter={setCategoryFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onDeleteProduct={handleDeleteProduct}
              onAddProduct={() => setActiveSection("addProduct")}
              onProductDeleted={fetchProducts}
            />
          )}

          {activeSection === "addProduct" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">
                Add New Product
              </h3>
              <AddProductForm
                onAddProduct={handleAddProduct}
                onCancel={() => setActiveSection("products")}
              />
            </div>
          )}

          {activeSection === "homeBanners" && (
            <HomeBannerManagement
              banners={homeBanners}
              onBannerUpdate={fetchHomeBanners}
            />
          )}

          {activeSection === "aboutPage" && (
            <AboutPageManagement
              aboutPage={aboutPage}
              onAboutPageUpdate={fetchAboutPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}
