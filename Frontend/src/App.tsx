import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Collections from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service" element={<Services />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
