import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const ok = login(email, senha);

    if (ok) navigate("/");
    else setErro("Credenciais inválidas!");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-600 p-4">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        <h1 className="text-3xl font-extrabold text-center mb-2">
          🛒 <span className="text-indigo-600">OsGuri</span>Store
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Entre na sua conta
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

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
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-full focus:ring-2 focus:ring-indigo-500 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 transition font-bold text-lg"
          >
            Entrar
          </button>
        </form>

        {erro && (
          <p className="text-red-500 mt-4 text-center font-semibold">
            {erro}
          </p>
        )}

        <p className="text-center mt-6 text-sm text-gray-600">
          Ainda não tem conta?{" "}
          <Link to="/register" className="text-indigo-600 font-bold hover:underline">
            Criar agora
          </Link>
        </p>

      </div>
    </div>
  );
}
