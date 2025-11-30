import React, { useRef, useState } from "react";
import { createProduct } from "../api/productsService";
import { useNavigate } from "react-router-dom";

export default function Cadastro() {
  const navigate = useNavigate();
  const nameRef = useRef();
  const [form, setForm] = useState({ name: "", description: "", price: "", image: "", stock: "" });
  const [errors, setErrors] = useState({});
  const [showImageHint, setShowImageHint] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nome obrigatório";
    if (!form.description.trim()) e.description = "Descrição obrigatória";
    if (form.price === "" || isNaN(Number(form.price)) || Number(form.price) < 0) e.price = "Preço inválido (≥ 0)";
    if (!form.image.trim()) e.image = "URL da imagem obrigatória";
    if (form.stock === "" || isNaN(Number(form.stock)) || Number(form.stock) < 0) e.stock = "Estoque inválido (≥ 0)";
    setErrors(e);
    if (Object.keys(e).length > 0) {
      if (e.name) nameRef.current?.focus();
      else if (e.description) document.getElementById("description")?.focus();
      else if (e.price) document.getElementById("price")?.focus();
      else if (e.image) document.getElementById("image")?.focus();
      else if (e.stock) document.getElementById("stock")?.focus();
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
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Cadastro de Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Nome</label>
          <input ref={nameRef} id="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className={`w-full border p-2 rounded ${errors.name ? 'border-red-500' : ''}`} />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block">Descrição</label>
          <textarea id="description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
            className={`w-full border p-2 rounded ${errors.description ? 'border-red-500' : ''}`} />
          {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label>Preço</label>
          <input id="price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })}
            className={`w-full border p-2 rounded ${errors.price ? 'border-red-500' : ''}`} />
          {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label>URL da imagem</label>
          <div className="relative">
            <input id="image" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
              className={`w-full border p-2 rounded ${errors.image ? 'border-red-500' : ''}`}
              onMouseEnter={() => setShowImageHint(true)}
              onMouseLeave={() => setShowImageHint(false)}
            />
            {showImageHint && (
              <p className="absolute text-sm text-gray-600 mt-1 bg-yellow-100 p-2 rounded-md shadow-md w-full">
                Para uma melhor visualização, adicione uma imagem de dimensões 300x400.
              </p>
            )}
          </div>
          {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
        </div>

        <div>
          <label>Estoque</label>
          <input id="stock" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })}
            className={`w-full border p-2 rounded ${errors.stock ? 'border-red-500' : ''}`} />
          {errors.stock && <p className="text-red-600 text-sm mt-1">{errors.stock}</p>}
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded">Criar</button>
          <button type="button" onClick={() => navigate("/")} className="px-4 py-2 border rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
