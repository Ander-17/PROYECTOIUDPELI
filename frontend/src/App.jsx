import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Inicio } from './pages/Inicio';
import { Genero } from './pages/Genero';
import { Director } from './pages/Director';
import { Productora } from './pages/Productora';
import { Tipo } from './pages/Tipo';
import { Media } from './pages/Media';

function App() {
  return (
    // Conservamos este div para que el Footer siga pegado abajo
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <BrowserRouter>
        <Navbar />

        <main className="container flex-grow-1 mt-4 mb-5">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/generos" element={<Genero />} />
            <Route path="/directores" element={<Director />} />
            <Route path="/productoras" element={<Productora />} />
            <Route path="/tipos" element={<Tipo />} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </main>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;