import { Navigate } from 'react-router-dom';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  // Comprobamos si existe el token en el localStorage
  const token = localStorage.getItem('token');

  // Si no hay token, redirigimos al login "a tomar por culo"
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, dejamos pasar al usuario y pintamos la página protegida
  return <>{children}</>;
}