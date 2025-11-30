import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { getProducts } from "../api/productsService";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

export default function Home() {
  const { data, loading, error } = useFetch(getProducts, []);
  
  // Estado para controlar a pesquisa, o filtro de preço e o ordenamento
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" para menor a maior, "desc" para maior a menor
  const [minPrice, setMinPrice] = useState(""); // Preço mínimo
  const [maxPrice, setMaxPrice] = useState(""); // Preço máximo

  // Função para filtrar os produtos pela pesquisa, preço e ordenação
  const filteredProducts = data
    ? data
        .filter((prod) => {
          // Filtro por nome
          return prod.name.toLowerCase().includes(search.toLowerCase());
        })
        .filter((prod) => {
          // Filtro por preço mínimo
          const min = minPrice ? prod.price >= minPrice : true;
          // Filtro por preço máximo
          const max = maxPrice ? prod.price <= maxPrice : true;
          return min && max;
        })
        .sort((a, b) => {
          if (sortOrder === "asc") {
            return a.price - b.price; // Menor a maior
          } else {
            return b.price - a.price; // Maior a menor
          }
        })
    : [];

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-blue-600">Explore nossas ofertas!</h1>
        <Link
          to="/cadastro"
          className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition duration-300 font-bold"
        >
          + Novo Produto
        </Link>
      </div>

      {/* Barra de Pesquisa e Filtro */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* Barra de Pesquisa */}
        <input
          type="text"
          placeholder="Busca por nome"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 w-full sm:w-1/3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* Filtro por Preço e Ordenação */}
        <div className="flex gap-2 items-center">
          {/* Preço Mínimo */}
          <input
            type="number"
            placeholder="Preço Mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="px-4 py-2 w-full sm:w-40 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Preço Máximo */}
          <input
            type="number"
            placeholder="Preço Máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="px-4 py-2 w-full sm:w-40 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          {/* Filtro por Ordenação */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="asc">Preço: Menor a Maior</option>
            <option value="desc">Preço: Maior a Menor</option>
          </select>
        </div>

      </div>

      {/* Se estiver carregando ou houve erro */}
      {loading && <Loading />}
      {error && <div className="text-red-600 mb-4">Erro ao carregar produtos</div>}

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => <ProductCard key={prod.id} product={prod} />)
        ) : (
          <div className="col-span-full text-center text-gray-500">Nenhum produto encontrado</div>
        )}
      </div>
    </div>
  );
}
