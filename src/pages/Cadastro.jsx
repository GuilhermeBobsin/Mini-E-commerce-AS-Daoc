import React, { useRef, useState } from "react";
import { createProduct } from "../api/productsService";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const nameRef = useRef();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: ""
  });

  const [errors, setErrors] = useState({});
  const [showImageHint, setShowImageHint] = useState(false);

  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.description.trim()) e.description = "Descrição obrigatória";
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0)
      e.price = "Preço inválido (≥ 0)";
    if (!form.image.trim()) e.image = "URL da imagem obrigatória";
    if (form.stock === "" || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      e.stock = "Estoque inválido (≥ 0)";

    setErrors(e);

    if (Object.keys(e).length > 0) {
      if (e.name) nameRef.current?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      await createProduct({
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        stock: Number(form.stock)
      });

      navigate("/");
    } catch (err) {
      alert("Erro ao criar produto: " + err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-extrabold text-center mb-2">
          📦 <span className="text-indigo-600">Cadastro</span> de Produto
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Adicione um novo produto na GuriStore
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            ref={nameRef}
            type="text"
            placeholder="Nome do produto"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full border p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm text-center">{errors.name}</p>}

          <textarea
            placeholder="Descrição do produto"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`w-full border p-3 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none h-24 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && <p className="text-red-500 text-sm text-center">{errors.description}</p>}

          {/* PREÇO */}
          <input
            type="number"
            placeholder="Preço (R$)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={`w-full border p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && <p className="text-red-500 text-sm text-center">{errors.price}</p>}

          <div className="relative">
            <input
              type="text"
              placeholder="URL da imagem do produto"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              onMouseEnter={() => setShowImageHint(true)}
              onMouseLeave={() => setShowImageHint(false)}
              className={`w-full border p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />

            {showImageHint && (
              <p className="absolute text-sm text-gray-600 mt-2 bg-yellow-100 p-2 rounded-md shadow-md w-full z-10">
                Dica: Use imagens 300x400 para melhor visual.
              </p>
            )}
          </div>
          {errors.image && <p className="text-red-500 text-sm text-center">{errors.image}</p>}

          <input
            type="number"
            placeholder="Quantidade em estoque"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className={`w-full border p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none ${
              errors.stock ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.stock && <p className="text-red-500 text-sm text-center">{errors.stock}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-3 rounded-full font-bold hover:bg-indigo-700 transition"
            >
              Criar Produto
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex-1 border py-3 rounded-full hover:bg-gray-100"
            >
              Cancelar
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
