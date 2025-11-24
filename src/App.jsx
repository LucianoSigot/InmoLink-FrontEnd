import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateLogin from "./componentesLogin/plantillas/TemplateLogin.jsx";
import TemplateRegister from "./componentesLogin/plantillas/TemplateRegister.jsx";
import RutaProtegida from "./componentesLogin/atomos/RutaProtegida.jsx";
import YaLogeado from "./componentesLogin/atomos/YaLogeado.jsx";
import GoogleCallback from "./componentesLogin/organismo/GoogleCallback.jsx";
import NoFoundPage from "./componentesLogin/plantillas/NoFoundPage.jsx";
import HomeInmoLink from './pages/HomeInmoLink.jsx'
import PerfilUsuario from './pages/PerfilUsuario.jsx'
import EditarUsuario from './pages/EditarUsuario.jsx'
import Reserva from './pages/Reserva.jsx'
import Alquilo from './pages/Alquilo.jsx'
import Contacto from './pages/Contacto.jsx'
import Anuncio from './pages/Anuncio.jsx'
import EditarPublicacion from './pages/EditarPublicacion.jsx'
import CrearPublicacion from './pages/CrearPublicacion.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={
          <TemplateLogin />
        }
        />
        <Route path="/register" element={
          <TemplateRegister />
        }
        />
        <Route
          path="/auth/google/callback"
          element={<GoogleCallback />}
        />
        <Route
          path="*" element={<NoFoundPage />}
        />
        <Route path="/" element={
          <RutaProtegida>
            <HomeInmoLink />
          </RutaProtegida>
        } />
        <Route path="/perfil" element={
          <RutaProtegida>
            <PerfilUsuario />
          </RutaProtegida>
        } />
        <Route path="/perfil/editar" element={
          <RutaProtegida>
            <EditarUsuario />
          </RutaProtegida>
        } />
        <Route path="/perfil/reserva" element={
          <RutaProtegida>
            <Reserva />
          </RutaProtegida>
        } />
        <Route path="/perfil/alquilo" element={
          <RutaProtegida>
            <Alquilo />
          </RutaProtegida>
        } />
        <Route path="/contacto" element={
          <RutaProtegida>
            <Contacto />
          </RutaProtegida>
        } />
        <Route path="/anuncio" element={
          <RutaProtegida>
            <Anuncio />
          </RutaProtegida>
        } />
        <Route path="/anuncio/editar-publicacion" element={
          <RutaProtegida>
            <EditarPublicacion />
          </RutaProtegida>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
