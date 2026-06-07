import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
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
import EditarPublicacion from './pages/EditarPublicacion.jsx'
import CrearPublicacion from './pages/CrearPublicacion.jsx';
import MisCasas from './pages/MisCasas.jsx';
import AdminLayout from './componentesAdmin/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProperties from './pages/admin/AdminProperties.jsx';
import AdminUsers from './pages/admin/AdminUsers.jsx';
import AdminUserDetail from './pages/admin/AdminUserDetail.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<TemplateLogin />} />
        <Route path="/register" element={<TemplateRegister />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route path="*" element={<NoFoundPage />} />
        
        <Route path="/" element={
          <RutaProtegida>
            <HomeInmoLink />
          </RutaProtegida>
        } />

        {/* Rutas de perfil */}
        <Route path="/perfil" element={<RutaProtegida><PerfilUsuario /></RutaProtegida>} />
        <Route path="/perfil/editar" element={<RutaProtegida><EditarUsuario /></RutaProtegida>} />
        <Route path="/perfil/reserva" element={<RutaProtegida><Reserva /></RutaProtegida>} />
        
        <Route path="/perfil/alquiler/:id" element={
          <RutaProtegida>
            <Alquilo />
          </RutaProtegida>
        } />
        
        <Route path="/publicar" element={<RutaProtegida><CrearPublicacion /></RutaProtegida>} />
        <Route path="/anuncio/crear" element={<RutaProtegida><CrearPublicacion /></RutaProtegida>} />
        <Route path="/anuncio/editar-publicacion" element={<RutaProtegida><EditarPublicacion /></RutaProtegida>} />
        <Route path="/perfil/mis-casas" element={<RutaProtegida><MisCasas /></RutaProtegida>} />

        <Route path="/contacto" element={<RutaProtegida><Contacto /></RutaProtegida>} />

        {/* Admin routes */}
        <Route path="/admin" element={<RutaProtegida adminOnly><AdminLayout><AdminDashboard /></AdminLayout></RutaProtegida>} />
        <Route path="/admin/propiedades" element={<RutaProtegida adminOnly><AdminLayout><AdminProperties /></AdminLayout></RutaProtegida>} />
        <Route path="/admin/usuarios" element={<RutaProtegida adminOnly><AdminLayout><AdminUsers /></AdminLayout></RutaProtegida>} />
        <Route path="/admin/usuarios/:id" element={<RutaProtegida adminOnly><AdminUserDetail /></RutaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;