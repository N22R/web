import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ItemPage from "./pages/ItemPage";
import Cart from "./pages/Сart";   

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/book/:id" element={<ItemPage />} />
          <Route path="/cart" element={<Cart />} />   {}
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;