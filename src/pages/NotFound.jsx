import React from "react";
import { Link } from "react-router-dom";

export default function NotFound(){
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-4">Página não encontrada</p>
      <Link to="/" className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded font-bold">Voltar para a página inicial</Link>
    </div>
  );
}
