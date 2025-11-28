import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../api/productsService";
import Loading from "../components/Loading";
import { useCart } from "../context/CartContext";

export default function ProductDetails(){
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { items, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .catch(e => setError(e.message || "Erro"))
      .finally(()=>setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <div className="text-red-600">{error}</div>;
  if (!product) return <div>Produto não encontrado</div>;

  const inCart = items.find(i => i.id === product.id);
  const reachedStock = inCart ? inCart.qty >= product.stock : false;

  const handleAdd = () => {
    if (product.stock === 0) return;
    if (reachedStock) return;
    addToCart(product, 1);
    navigate("/carrinho");
  };

  return (
    <div className="bg-white p-6 rounded shadow md:flex gap-6">
      <img src={product.image} alt={product.name} className="w-full md:w-1/3 h-64 object-cover rounded" />
      <div className="flex-1">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="mt-2 text-gray-700">{product.description}</p>
        <p className="mt-4 text-xl font-semibold">R$ {product.price.toFixed(2)}</p>
        <p className="mt-2">Estoque: {product.stock}</p>

        {product.stock === 0 ? (
          <button className="mt-4 w-full bg-gray-400 text-white py-2 rounded" disabled>Produto Esgotado</button>
        ) : (
          <>
            <button
              onClick={handleAdd}
              disabled={reachedStock}
              className={`mt-4 w-full py-2 rounded text-white ${reachedStock ? 'bg-gray-400' : 'bg-green-600'}`}
            >
              {reachedStock ? 'Estoque máximo atingido' : 'Adicionar ao Carrinho'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
