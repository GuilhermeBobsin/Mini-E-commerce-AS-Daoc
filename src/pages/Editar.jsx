import React, { useEffect, useRef, useState } from "react";
import { getProductById, updateProduct, deleteProduct } from "../api/productsService";
import { useNavigate, useParams } from "react-router-dom";

export default function Editar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const nameRef = useRef();
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then((prod) => {
        setForm({
          name: prod.name,
          description: prod.description,
          price: prod.price,
          image: prod.image,
          stock: prod.stock,
        });
      })
      .catch(() => alert("Erro ao carregar"))
      .finally(() => setLoading(false));
  }, [id]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.description.trim()) e.description = "Descrição obrigatória";
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0) e.price = "Preço inválido (≥ 0)";
    if (!form.image.trim()) e.image = "URL obrigatória";
    if (form.stock === "" || isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = "Estoque inválido (≥ 0)";

    setErrors(e);
    if (Object.keys(e).length > 0) {
      if (e.name) nameRef.current?.focus();
      else if (e.description) document.getElementById("description")?.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;

    try {
      await updateProduct(id, {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        image: form.image,
        stock: Number(form.stock),
      });
      navigate("/");
    } catch (err) {
      alert("Erro ao atualizar: " + err.message);
    }
  };

  const handleDelete = () => {
    if (window.confirm("⚠️ Tem certeza que deseja excluir este produto?")) {
      deleteProduct(id)
        .then(() => navigate("/"))
        .catch((err) => alert("Erro ao excluir: " + err.message));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-gray-600 animate-pulse">Carregando produto...</p>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-lg text-red-500">Produto não encontrado 😢</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen py-12 px-4">
      <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-3xl shadow-xl border">

        <h1 className="text-3xl font-extrabold text-center mb-8">
          ✏️ Editar Produto
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="text-sm font-semibold">Nome do produto</label>
            <input
              ref={nameRef}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ex: Camiseta dos Guri"
              className={`mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-semibold">Descrição</label>
            <textarea
              id="description"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descreva o produto"
              className={`mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none resize-none ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold">Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="29.90"
                className={`mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="text-red-600 text-sm mt-1">{errors.price}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-semibold">Estoque</label>
              <input
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
                placeholder="10"
                className={`mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none ${
                  errors.stock ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.stock && (
                <p className="text-red-600 text-sm mt-1">{errors.stock}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold">Imagem (URL)</label>
            <input
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              placeholder="https://..."
              className={`mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none ${
                errors.image ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.image && (
              <p className="text-red-600 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 pt-4">
            <button className="w-full md:w-1/2 py-3 bg-indigo-600 hover:bg-indigo-700 transition text-white font-bold rounded-xl shadow-lg">
              💾 Salvar alterações
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full md:w-1/2 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-100 transition font-semibold"
            >
              Cancelar
            </button>
          </div>
        </form>

        {/* DELETAR */}
        <div className="mt-8 border-t pt-6 text-center">
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 transition text-white font-bold rounded-xl shadow-lg"
          >
            🗑️ Deletar Produto
          </button>
        </div>
      </div>
    </div>
  );
}
