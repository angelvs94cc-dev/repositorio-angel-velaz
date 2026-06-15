import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import NewProductPage from './pages/NewProductPage';
import NotFoundPage from './pages/NotFoundPage';

// Cambiamos JSX.Element por React.ReactNode, que es el estándar infalible de React
function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem('auth_token');
  
  // Si no hay token guardado, te expulsa inmediatamente a la pantalla negra de Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Al entrar a la web, te redirige al catálogo protegido */}
        <Route path="/" element={<Navigate to="/products" replace />} />
        
        {/* Todas estas rutas ahora vuelven a estar bajo candado */}
        <Route path="/products" element={<AuthGuard><ProductsPage /></AuthGuard>} />
        <Route path="/products/:id" element={<AuthGuard><ProductPage /></AuthGuard>} />
        <Route path="/products/new" element={<AuthGuard><NewProductPage /></AuthGuard>} />
        
        {/* La pantalla de login siempre está accesible */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}