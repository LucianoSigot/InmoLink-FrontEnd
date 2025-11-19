import { BrowserRouter, Routes, Route } from "react-router-dom";
import TemplateLogin from "./componentes/plantillas/TemplateLogin.jsx";
import TemplateRegister from "./componentes/plantillas/TemplateRegister.jsx";
import Home from "./componentes/organismo/Home.jsx";
import RutaProtegida from "./componentes/atomos/RutaProtegida.jsx";
import YaLogeado from "./componentes/atomos/YaLogeado.jsx";
import GoogleCallback from "./componentes/organismo/GoogleCallback.jsx";
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
          path="/"
          element={
            <RutaProtegida>
              <Home />
            </RutaProtegida>
          }
        />
        <Route
          path="/auth/google/callback"
          element={<GoogleCallback />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
