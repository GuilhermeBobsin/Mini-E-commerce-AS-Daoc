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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        
        <h2 className="text-3xl font-semibold text-gray-900 text-center mb-6">
          Bem-vindo 👋
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Entre na sua conta para continuar
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div>
            <label className="text-sm text-gray-600">E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 mt-1 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border border-gray-300 mt-1 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            />
          </div>

          {erro && <p className="text-red-500 text-sm text-center">{erro}</p>}

          <button
            type="submit"
            className="mt-2 w-full bg-yellow-600 text-white py-3 rounded-lg font-bold hover:bg-yellow-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Não tem conta?{" "}
          <Link to="/register" className="text-yellow-600 font-semibold hover:underline">
            Crie uma agora
          </Link>
        </p>
      </div>
    </div>
  );
}
