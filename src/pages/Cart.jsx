import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart(){
  const { items, updateQty, removeItem, total } = useCart();

  const handleInc = (item) => {
    if (item.qty >= item.stock) return;
    updateQty(item.id, item.qty + 1);
  };
  const handleDec = (item) => {
    if (item.qty <= 1) return;
    updateQty(item.id, item.qty - 1);
  };

  if (items.length === 0) {
    return <div className="text-center py-8">Seu carrinho está vazio.</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="bg-white p-6 rounded shadow flex items-center gap-4">
            <div className="flex-1">
              <h3 className="font-semibold">{item.name}</h3>
              <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
              <p>Máx: {item.stock}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleDec(item)} className="px-3 py-1 border rounded">-</button>
              <div>{item.qty}</div>
              <button onClick={() => handleInc(item)} className="px-3 py-1 border rounded">+</button>
            </div>
            <div className="w-48 text-right">
              <p>Subtotal</p>
              <p className="font-semibold">R$ {(item.price * item.qty).toFixed(2)}</p>
              <button onClick={() => removeItem(item.id)} className="mt-2 text-sm text-red-600">Remover</button>
              {item.qty >= item.stock && <p className="text-sm text-red-500">Estoque máximo atingido</p>}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-xl">Total: <span className="font-bold">R$ {total.toFixed(2)}</span></p>
      </div>
    </div>
  );
}
