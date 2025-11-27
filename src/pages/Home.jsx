import React from "react";
import useFetch from "../hooks/useFetch";
import { getProducts } from "../api/productsService";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";

export default function Home(){
  const { data, loading, error } = useFetch(getProducts, []);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600">Produtos</h1>
        <Link to="/cadastro" className="px-3 py-1 border rounded">+ Novo Produto</Link>
      </div>

      {loading && <Loading />}
      {error && <div className="text-red-600">Erro ao carregar produtos</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data && data.map(prod => <ProductCard key={prod.id} product={prod} />)}
      </div>
    </div>
  );
}
