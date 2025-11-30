// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col items-center text-center h-full">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-contain rounded-md mb-4"
      />
      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{product.description}</p>
      <p className="text-xl font-bold text-blue-600 mt-2">
        R$ {product.price.toFixed(2)}
      </p>
      <p className="text-sm text-green-600 mt-1">
        {product.stock > 0 ? `Em estoque: ${product.stock}` : 'Esgotado'}
      </p>

      {/* Alinha o botão ao final do card */}
      <div className="flex-grow"></div>
      <Link
        to={`/produto/${product.id}`}
        className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Ver Detalhes
      </Link>
    </div>
  );
};

export default ProductCard;
