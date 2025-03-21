import { createContext, useContext, useEffect, useState } from "react";

// Criando o contexto
const AuthContext = createContext();

// Hook para facilitar o acesso ao contexto
export const useAuth = () => useContext(AuthContext);

// Componente Provider para gerenciar a autenticação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simula a verificação de autenticação no backend
  useEffect(() => {
    fetch("http://3.88.34.201:8000/auth/api/check-session/", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setUser(data.user);
          
        }
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Função de login (exemplo)
  const login = async (credentials) => {
    const res = await fetch("http://localhost:8000/auth/api/login/", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      const data = await res.json();
      setUser(data.user);
      return true;
    } else {
      throw new Error("Credenciais inválidas");
    }
  };

  // Função de logout
  const logout = async () => {
    await fetch("http://localhost:8000/auth/api/logout/", { method: "POST", credentials: "include" });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;