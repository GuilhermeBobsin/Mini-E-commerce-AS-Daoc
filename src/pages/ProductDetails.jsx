import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { getProductById, deleteProduct } from "../api/productsService";
import Loading from "../components/Loading";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const { data: product, loading, error } = useFetch(
    () => getProductById(id),
    [id]
  );

  async function handleDelete() {
    if (!user) {
      alert("Você precisa estar logado para excluir produtos.");
      return navigate("/login");
    }

    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Produto excluído com sucesso ✅");
      navigate("/");
    } catch (err) {
      alert("Erro ao excluir produto ❌");
    }
  }

  function handleAddToCart() {
    if (product.stock === 0) {
      alert("Este produto está sem estoque ❌");
      return;
    }

    addToCart(product);
    alert("Produto adicionado ao carrinho 🛒✅");
  }

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-red-500 text-center">
        Erro ao carregar o produto 😢
      </p>
    );

  return (
    <div className="bg-white min-h-screen py-10 px-4 text-gray-800">
      <div className="max-w-5xl mx-auto mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          📦 Detalhes do <span className="text-indigo-600">Produto</span>
        </h1>
        <p className="text-gray-500 mt-2">
          Confira todas as informações abaixo
        </p>
      </div>

      <div className="max-w-5xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg border flex flex-col md:flex-row gap-8 items-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-80 object-contain rounded-xl bg-white p-4"
        />

        <div className="flex flex-col gap-4 w-full">
          <h2 className="text-2xl font-bold">{product.name}</h2>

          <p className="text-gray-600 text-lg">
            {product.description}
          </p>

          <span className="text-3xl font-extrabold text-indigo-600">
            R$ {Number(product.price).toFixed(2)}
          </span>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`px-6 py-3 rounded-full font-bold transition shadow text-white
                ${product.stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"}`}
            >
              🛒 Adicionar ao Carrinho
            </button>

            <Link
              to={`/editar/${product.id}`}
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 transition shadow"
            >
              ✏️ Editar
            </Link>

            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition shadow"
            >
              🗑️ Excluir
            </button>

            <Link
              to="/"
              className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full font-bold hover:bg-gray-400 transition shadow"
            >
              ⬅️ Voltar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
