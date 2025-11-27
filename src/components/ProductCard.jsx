import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <img src={product.image} alt={product.name} className="h-40 object-cover rounded" />
      <h3 className="font-semibold mt-2">{product.name}</h3>
      <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
      {product.stock === 0 ? (
        <span className="text-red-600 font-bold mt-2">Esgotado</span>
      ) : (
        <span className="text-green-600 font-medium mt-2">Em estoque: {product.stock}</span>
      )}
      <div className="mt-auto pt-4">
        <Link to={`/produto/${product.id}`} className="block text-center w-full bg-blue-600 text-white py-2 rounded">
          Ver Detalhes
        </Link>
      </div>
    </div>
  );
}
