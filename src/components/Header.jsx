import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          {"</MiniECom>"}
        </Link>

        <nav className="flex gap-6 items-center">
          <Link
            to="/carrinho"
            className="flex items-center px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            <i className="fas fa-shopping-cart mr-2"></i>
            Carrinho ({count})
          </Link>

          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border rounded-md bg-red-500 text-white hover:bg-red-600"
            >
              Fazer logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Entrar
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 border rounded-md bg-green-500 text-white hover:bg-green-600"
              >
                Crie sua conta
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
