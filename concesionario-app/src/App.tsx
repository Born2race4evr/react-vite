import { useState, useEffect } from 'react'; // Importamos useState y useEffect
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { PageLoader } from './components/PageLoader'; // Importamos el nuevo cargador
import { Home } from './pages/Home';
import { AdminPanel } from './pages/AdminPanel';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuthStore();
  const location = useLocation(); // Hook para detectar la URL actual

  // Estado para controlar el cargador entre páginas
  const [pageLoading, setPageLoading] = useState(false);

  // EFECTO DE CARGA ENTRE PÁGINAS
  // Dentro de tu componente AppContent en App.tsx

  useEffect(() => {
    // Solo activamos la carga si ya hay un usuario (evitamos el login inicial)
    if (!user) return;

    setPageLoading(true);

    // Aumentamos a 2 segundos para que la animación sea visible y fluida
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname, user]);

  // 1. LÓGICA DE PROTECCIÓN (Mismo muro de autenticación)
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="public-layout">
      {/* Efecto de luces desde abajo */}
      <div className="speed-beams">
        <div className="ground-glow"></div>
        {/* Generamos varios haces con posiciones y retrasos distintos */}
        <div className="beam" style={{ left: '10%', animationDelay: '0s' }}></div>
        <div className="beam" style={{ left: '25%', animationDelay: '1.5s', width: '3px', height: '300px' }}></div>
        <div className="beam" style={{ left: '45%', animationDelay: '0.5s' }}></div>
        <div className="beam" style={{ left: '60%', animationDelay: '2.2s', height: '400px' }}></div>
        <div className="beam" style={{ left: '85%', animationDelay: '1s', width: '3px' }}></div>
        <div className="beam" style={{ left: '95%', animationDelay: '3s' }}></div>
      </div>

      <PageLoader isLoading={pageLoading} />
      <Navbar />

      <main style={{ padding: '2rem 5%', maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          {/* ... resto de rutas */}
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;