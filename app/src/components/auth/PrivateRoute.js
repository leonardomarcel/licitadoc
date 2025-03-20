import { Navigate, Outlet } from "react-router-dom";
import {useAuth}  from "../auth/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
