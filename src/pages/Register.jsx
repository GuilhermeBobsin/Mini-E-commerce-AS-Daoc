import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Preencha e-mail e senha.");
    if (password.length < 4) return setError("Senha precisa ter pelo menos 4 caracteres.");
    if (password !== confirm) return setError("As senhas não conferem.");

    setLoading(true);
    const res = register({ name, email, password });

    setLoading(false);
    if (!res.ok) {
      setError(res.message || "Erro ao cadastrar.");
      return;
    }

    
    navigate("/");
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Criar conta</h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm">Nome (opcional)</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">E-mail</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Senha</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full p-2 border rounded" />
        </div>

        <div>
          <label className="block text-sm">Confirmar senha</label>
          <input value={confirm} onChange={e => setConfirm(e.target.value)} type="password" className="w-full p-2 border rounded" />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>

          <Link to="/login" className="text-sm text-gray-600">Já tenho conta</Link>
        </div>
      </form>
    </div>
  );
}
