import React, { useEffect, useRef, useState } from "react";
import { getProductById, updateProduct, deleteProduct } from "../api/productsService"; // Certifique-se de que deleteProduct está importado
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
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este produto?");
    if (confirmDelete) {
      deleteProduct(id)
        .then(() => {
          navigate("/");
        })
        .catch((err) => alert("Erro ao excluir: " + err.message));
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!form) return <div>Produto não encontrado</div>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">Editar Produto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nome</label>
          <input
            ref={nameRef}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full border p-2 rounded ${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label>Descrição</label>
          <textarea
            id="description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`w-full border p-2 rounded ${errors.description ? "border-red-500" : ""}`}
          />
          {errors.description && <p className="text-red-600 text-sm">{errors.description}</p>}
        </div>
        <div>
          <label>Preço</label>
          <input
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className={`w-full border p-2 rounded ${errors.price ? "border-red-500" : ""}`}
          />
          {errors.price && <p className="text-red-600 text-sm">{errors.price}</p>}
        </div>
        <div>
          <label>URL imagem</label>
          <input
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className={`w-full border p-2 rounded ${errors.image ? "border-red-500" : ""}`}
          />
          {errors.image && <p className="text-red-600 text-sm">{errors.image}</p>}
        </div>
        <div>
          <label>Estoque</label>
          <input
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className={`w-full border p-2 rounded ${errors.stock ? "border-red-500" : ""}`}
          />
          {errors.stock && <p className="text-red-600 text-sm">{errors.stock}</p>}
        </div>

        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
          <button type="button" onClick={() => navigate("/")} className="px-4 py-2 border rounded">
            Cancelar
          </button>
        </div>
      </form>

      {/* Botão de Deletar Produto */}
      <div className="mt-4 text-center">
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-white rounded-lg hover:bg-red-700"
          style={{ backgroundColor: "#f02424ff" }} // gambiarra pq a cor vermelha some se fizer no classname
        >
          Deletar Produto
        </button>
      </div>
    </div>
  );
}
