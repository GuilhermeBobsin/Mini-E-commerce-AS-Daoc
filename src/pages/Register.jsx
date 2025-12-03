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

    const res = await register({ name, email, password });

    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Erro ao cadastrar.");
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-extrabold text-center mb-2">
          🛒 <span className="text-indigo-600">OsGuri</span>Store
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Crie sua conta
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          {error && (
            <p className="text-red-500 text-center font-semibold">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition font-bold text-lg disabled:opacity-60"
          >
            {loading ? "Cadastrando..." : "Criar conta"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Já tem conta?{" "}
          <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Entrar agora
          </Link>
        </p>

      </div>
    </div>
  );
}
