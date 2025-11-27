import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Cadastro from "./pages/Cadastro";
import Editar from "./pages/Editar";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";

export default function App(){
  return (
    
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/editar/:id" element={<Editar />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
