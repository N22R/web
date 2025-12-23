import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ItemPage from "./pages/ItemPage";
import Cart from "./pages/Cart"; 
import CheckoutPage from "./pages/CheckoutPage";
import SuccessPage from "./pages/SuccessPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";


import BootstrapAuth from "./components/BootstrapAuth";

function App() {
  return (
    <Router>
      {}
      <BootstrapAuth />

      <Header />

      <main>
        <Routes>
          {}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><ItemPage /></ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />   
          <Route path="/success" element={<ProtectedRoute><SuccessPage /></ProtectedRoute>} />     
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;