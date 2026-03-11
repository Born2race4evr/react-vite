import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Componentes
import { Navbar } from './components/Navbar';
import { PageLoader } from './components/PageLoader';

// Páginas
import { Home } from './pages/Home';
import { AdminPanel } from './pages/AdminPanel';
import { CreateCar } from './pages/CreateCar';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CarDetail } from './pages/CarDetail';
import { EditCar } from './pages/EditCar';
import { UserControl } from './pages/UserControl';
import { UserProfile } from './pages/UserProfile';

// Estado Global
import { useAuthStore } from './store/useAuthStore';

// Estilos
import './index.css';

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // EFECTO DE CARGA ENTRE PÁGINAS (Sincronización de boxes)
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [location.pathname, user]);

  // 1. MURO DE AUTENTICACIÓN (Rutas públicas)
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // 2. LAYOUT PRINCIPAL (Zona Privada)
  return (
    <div className="public-layout">
      {/* CAPA DE ANIMACIÓN: Brillo Ambiental */}
      <div className="ambient-glow" />

      {/* CAPA DE ANIMACIÓN: Haces de luz ascendentes */}
      <div className="speed-beams">
        <div className="ground-light" />
        <div className="beam" style={{ left: '5%', animationDelay: '0s' }} />
        <div className="beam" style={{ left: '15%', animationDelay: '2s', height: '450px' }} />
        <div className="beam" style={{ left: '35%', animationDelay: '1s', width: '3px' }} />
        <div className="beam" style={{ left: '50%', animationDelay: '3.5s' }} />
        <div className="beam" style={{ left: '65%', animationDelay: '0.5s', height: '400px' }} />
        <div className="beam" style={{ left: '80%', animationDelay: '1.8s' }} />
        <div className="beam" style={{ left: '95%', animationDelay: '2.5s', width: '3px' }} />
      </div>

      <PageLoader isLoading={loading} />
      <Navbar />

      <main style={{
        padding: '2rem 5%',
        maxWidth: '1400px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <Routes>
          {/* ACCESO UNIVERSAL */}
          <Route path="/" element={<Home />} />
          <Route path="/car/:id" element={<CarDetail />} />

          {/* GESTIÓN DE FLOTA Y TALLER */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/create" element={<CreateCar />} />
          <Route path="/admin/edit/:id" element={<EditCar />} />

          {/* RUTA DE PERFIL DINÁMICA */}
          <Route path="/profile/:username?" element={<UserProfile />} />

          {/* ACCESO RESTRINGIDO: Solo el Director (admin) */}
          <Route
            path="/admin/users"
            element={user.role === 'admin' ? <UserControl /> : <Navigate to="/" replace />}
          />

          {/* Redirecciones de seguridad */}
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}