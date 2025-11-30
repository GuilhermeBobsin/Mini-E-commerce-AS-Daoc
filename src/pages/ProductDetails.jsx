import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productsService";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .catch((e) => setError(e.message || "Erro"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div>Produto não encontrado</div>;

  const inCart = items.find((i) => i.id === product.id);
  const reachedStock = inCart ? inCart.qty >= product.stock : false;

  const handleAdd = () => {
    if (product.stock === 0) return;
    if (reachedStock) return;
    addToCart(product, 1);
    navigate("/carrinho");
  };

  const handleEdit = () => {
    navigate(`/editar/${id}`);  // Redireciona para a página de edição
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Imagem do Produto */}
        <div className="flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full h-auto object-contain rounded-lg shadow-lg"
          />
        </div>

        {/* Detalhes do Produto */}
        <div className="flex flex-col justify-start">
          <h2 className="text-3xl font-semibold text-gray-900">{product.name}</h2>
          <p className="mt-2 text-lg text-gray-600">{product.description}</p>

          {/* Preço */}
          <div className="mt-4">
            <span className="text-3xl font-bold text-green-600">
              R$ {product.price.toFixed(2)}
            </span>
            <p className="text-sm text-gray-500">Preço à vista</p>
          </div>

          {/* Estoque */}
          <div className="mt-4">
            <p className="text-lg text-gray-700">Estoque disponível: {product.stock}</p>
            {product.stock === 0 && (
              <p className="text-red-500 text-sm mt-2">Produto fora de estoque!</p>
            )}
          </div>

          {/* Ações */}
          <div className="mt-6 flex flex-col gap-4">
            {product.stock === 0 ? (
              <button
                className="w-44 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed font-bold"
                disabled
              >
                Produto Esgotado
              </button>
            ) : (
              <>
                <button
                  onClick={handleAdd}
                  disabled={reachedStock}
                  className={`w-44 py-3 rounded-lg text-white transition-colors duration-200 ${
                    reachedStock ? "bg-gray-400 cursor-not-allowed font-bold" : "bg-yellow-600 hover:bg-yellow-700 font-bold"
                  }`}
                >
                  {reachedStock ? "Estoque máximo atingido" : "Adicionar ao Carrinho"}
                </button>
                <button
                  onClick={() => navigate("/carrinho")}
                  className="w-44 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-bold"
                >
                  Ir para o Carrinho
                </button>
              </>
            )}

            {/* Botão de Editar Produto */}
            <button
              onClick={handleEdit}
              className="w-44 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-bold"
            >
              Editar Produto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
