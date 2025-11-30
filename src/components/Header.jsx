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
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        
        <Link to="/" className="text-xl font-bold">
          MiniEcom
        </Link>

        <nav className="flex gap-4 items-center">

          {}
          {user && (
            <Link
              to="/cadastro"
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Cadastro
            </Link>
          )}

          <Link
            to="/carrinho"
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Carrinho ({count})
          </Link>

          {}
          {user && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 border rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          )}

          {}
          {!user && (
            <>
              <Link
                to="/login"
                className="px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-1 border rounded bg-green-500 text-white hover:bg-green-600"
              >
                Registrar
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
