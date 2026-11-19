import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importaciones de Autenticación y Seguridad
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Componentes generales
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Páginas
import { Login } from './pages/Login';
import { Inicio } from './pages/Inicio';
import { Genero } from './pages/Genero';
import { Director } from './pages/Director';
import { Productora } from './pages/Productora';
import { Tipo } from './pages/Tipo';
import { Media } from './pages/Media';

function App() {
  return (
    <AuthProvider>
      <div className="d-flex flex-column min-vh-100 bg-dark text-light">
        <BrowserRouter>
          <Navbar />

          <main className="container flex-grow-1 mt-4 mb-5">
            <Routes>
              {/* --- RUTAS PÚBLICAS --- */}
              <Route path="/" element={<Inicio />} />
              <Route path="/login" element={<Login />} />

              {/* --- RUTAS PROTEGIDAS (PANEL ADMINISTRATIVO) --- */}
              <Route element={<ProtectedRoute />}>
                <Route path="/generos" element={<Genero />} />
                <Route path="/directores" element={<Director />} />
                <Route path="/productoras" element={<Productora />} />
                <Route path="/tipos" element={<Tipo />} />
                <Route path="/media" element={<Media />} />
              </Route>
            </Routes>
          </main>

          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;