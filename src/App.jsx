import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Cadastro from "./pages/Cadastro";
import Editar from "./pages/Editar";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register"; 
import Header from "./components/Header";
import ProtectedRoute from "./ProtectedRoute";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductDetails />} />

          <Route
            path="/carrinho"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cadastro"
            element={
              <ProtectedRoute>
                <Cadastro />
              </ProtectedRoute>
            }
          />

          <Route
            path="/editar/:id"
            element={
              <ProtectedRoute>
                <Editar />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}
