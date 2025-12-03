import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getProducts } from "../api/productsService";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, loading, error } = useFetch(getProducts, []);

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = data
    ? data
        .filter((prod) =>
          prod.name.toLowerCase().includes(search.toLowerCase())
        )
        .filter((prod) => {
          const min = minPrice ? prod.price >= minPrice : true;
          const max = maxPrice ? prod.price <= maxPrice : true;
          return min && max;
        })
        .sort((a, b) =>
          sortOrder === "asc" ? a.price - b.price : b.price - a.price
        )
    : [];

  return (
    <div className="bg-white min-h-screen py-10 px-4 text-gray-800">
      
      {/* TOPO */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold">
            🛒 E-Commerce dos <span className="text-indigo-600">Guri</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Os melhores produtos no precinho 😎
          </p>
        </div>

        <Link
          to="/cadastro"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-full font-bold shadow-lg"
        >
          + Novo Produto
        </Link>
      </div>

      <div className="max-w-7xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-md mb-10 border">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">

          <input
            type="text"
            placeholder="🔎 Buscar produto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <div className="flex flex-wrap gap-3 items-center w-full lg:w-auto justify-center">
            <input
              type="number"
              placeholder="Preço mín"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white border border-gray-300 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <input
              type="number"
              placeholder="Preço máx"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white border border-gray-300 w-32 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="asc">Menor preço</option>
              <option value="desc">Maior preço</option>
            </select>
          </div>

        </div>
      </div>

      
      {loading && <Loading />}
      {error && (
        <div className="text-red-500 text-center mb-6">
          Erro ao carregar produtos 😢
        </div>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-lg">
            Nenhum produto encontrado 🚫
          </div>
        )}
      </div>
    </div>
  );
}
