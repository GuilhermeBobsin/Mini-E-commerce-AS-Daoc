import { createContext, useState, useEffect, useCallback, useContext } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário salvo no localStorage
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
      localStorage.removeItem("user");
    }
    setLoading(false);
  }, []);

  // LOGIN — mantém o admin fixo + usuários cadastrados
  const login = useCallback((email, password) => {
    // login do admin fixo
    if (email === "admin@email.com" && password === "123456") {
      const logged = { email, role: "admin" };
      setUser(logged);
      localStorage.setItem("user", JSON.stringify(logged));
      return true;
    }

    // login de usuários cadastrados
    try {
      const raw = localStorage.getItem("users_v1");
      const users = raw ? JSON.parse(raw) : [];

      const found = users.find((u) => u.email === email && u.password === password);

      if (found) {
        const logged = { email: found.email, name: found.name ?? null, role: "user" };
        setUser(logged);
        localStorage.setItem("user", JSON.stringify(logged));
        return true;
      }
    } catch (err) {
      console.error("Erro ao buscar usuários:", err);
    }

    return false;
  }, []);

  // CADASTRO — novo
  const register = useCallback(({ name, email, password }) => {
    if (!email || !password) return { ok: false, message: "E-mail e senha são obrigatórios." };

    try {
      const raw = localStorage.getItem("users_v1");
      const users = raw ? JSON.parse(raw) : [];

      const exists = users.some((u) => u.email === email);
      if (exists) return { ok: false, message: "E-mail já cadastrado." };

      const newUser = { name: name?.trim() || null, email, password };
      users.push(newUser);

      localStorage.setItem("users_v1", JSON.stringify(users));

      // já loga o usuário após cadastrar
      const logged = { email: newUser.email, name: newUser.name, role: "user" };
      setUser(logged);
      localStorage.setItem("user", JSON.stringify(logged));

      return { ok: true };
    } catch (err) {
      console.error(err);
      return { ok: false, message: "Erro ao salvar usuário." };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  return useContext(AuthContext);
}
