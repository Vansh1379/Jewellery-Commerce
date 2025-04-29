import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Collections from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import AboutPage from "./pages/AboutPage";
import AdminPanel from "./pages/Admin-Panel";
import LoginPage from "./components/Login";

// ScrollToTop component that will handle the scrolling behavior
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop /> {/* Add ScrollToTop component inside BrowserRouter */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Services />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
