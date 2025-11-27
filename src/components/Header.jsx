import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header(){
  const { items } = useCart();
  const count = items.reduce((s,i)=>s+i.qty,0);
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">MiniEcom</Link>
        <nav className="flex gap-4 items-center">
          <Link to="/cadastro" className="px-3 py-1 border rounded hover:bg-gray-100">Cadastro</Link>
          <Link to="/carrinho" className="px-3 py-1 border rounded hover:bg-gray-100">
            Carrinho ({count})
          </Link>
        </nav>
      </div>
    </header>
  );
}
