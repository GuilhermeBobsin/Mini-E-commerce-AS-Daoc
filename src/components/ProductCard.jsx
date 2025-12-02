
import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const semEstoque = product.stock === 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col h-full border">

      <div className="flex justify-center items-center mb-4 h-52">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        {product.name}
      </h3>

      
      <p className="text-sm text-gray-600 mt-1 line-clamp-2">
        {product.description}
      </p>

      <p className="text-2xl font-bold text-green-600 mt-3">
        R$ {product.price.toFixed(2)}
      </p>


      <p
        className={`text-sm mt-1 font-medium ${
          semEstoque ? "text-red-600" : "text-gray-500"
        }`}
      >
        {semEstoque ? "Esgotado" : `Estoque: ${product.stock}`}
      </p>

      <div className="flex-grow" />

      <Link
        to={`/produto/${product.id}`}
        className={`mt-4 w-full text-center px-4 py-3 rounded-xl font-bold transition
          ${
            semEstoque
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-600 text-white hover:bg-yellow-700"
          }
        `}
      >
        {semEstoque ? "Indisponível" : "Ver Produto"}
      </Link>
    </div>
  );
};

export default ProductCard;
