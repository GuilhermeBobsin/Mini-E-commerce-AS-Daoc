import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { items, updateQty, removeItem, total } = useCart();
  const navigate = useNavigate();

  const handleInc = (item) => {
    if (item.qty >= item.stock) return;
    updateQty(item.id, item.qty + 1);
  };

  const handleDec = (item) => {
    if (item.qty <= 1) return;
    updateQty(item.id, item.qty - 1);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Seu carrinho está vazio 🛒</h2>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-yellow-600 text-white rounded-lg font-bold hover:bg-yellow-700 transition"
        >
          Ver produtos
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        
        <h1 className="text-3xl font-semibold mb-8 text-gray-900">
          Seu carrinho 🛒
        </h1>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-6 border-b pb-6"
            >
              {}
              <div className="flex-1 w-full">
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-600">
                  Preço unitário: R$ {item.price.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">
                  Estoque disponível: {item.stock}
                </p>
              </div>

              {}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleDec(item)}
                  className="w-10 h-10 rounded-full border border-gray-400 text-lg hover:bg-gray-200 transition"
                >
                  -
                </button>

                <span className="font-semibold text-lg">
                  {item.qty}
                </span>

                <button
                  onClick={() => handleInc(item)}
                  className="w-10 h-10 rounded-full border border-gray-400 text-lg hover:bg-gray-200 transition"
                >
                  +
                </button>
              </div>

              {}
              <div className="text-right w-full md:w-44">
                <p className="text-gray-500 text-sm">Subtotal</p>
                <p className="font-bold text-lg">
                  R$ {(item.price * item.qty).toFixed(2)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Remover
                </button>

                {item.qty >= item.stock && (
                  <p className="text-sm text-red-500 mt-1">
                    Estoque máximo atingido
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-2xl text-gray-900">
            Total:{" "}
            <span className="font-bold text-green-600">
              R$ {total.toFixed(2)}
            </span>
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Continuar comprando
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition"
            >
              Finalizar compra
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
