import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';

const RedirectToHomeIfLoggedIn = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // Você pode exibir um loader ou simplesmente retornar null
    return <p>Carregando...</p>;
  }

  return user ? <Navigate to="/home" replace /> : <LoginPage />;
};

export default RedirectToHomeIfLoggedIn;
