import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const count = items.reduce((s, i) => s + i.qty, 0);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        {}
        <Link 
          to="/" 
          className="text-2xl font-extrabold text-white tracking-wide"
        >
          🛒 <span className="text-yellow-300">OsGuri</span>Store
        </Link>

        <nav className="flex items-center gap-5">

          {}
          <Link
            to="/carrinho"
            className="relative px-4 py-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition flex items-center gap-2"
          >
            🛍️ Carrinho
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full">
                {count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center gap-4">

              {}
              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-white">
                <img
                  src="https://ui-avatars.com/api/?name=User"
                  alt="User"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-sm font-semibold">
                  {user.name || "Minha conta"}
                </span>
              </div>

              {}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition font-semibold"
              >
                Sair
              </button>

            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 bg-white text-indigo-600 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Entrar
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-yellow-400 text-black rounded-full font-semibold hover:bg-yellow-500 transition"
              >
                Criar conta
              </Link>
            </>
          )}

        </nav>
      </div>
    </header>
  );
}
