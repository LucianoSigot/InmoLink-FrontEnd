import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function RutaProtegida({ children }) {
  const [auth, setAuth] = useState(null);
  const location = useLocation();
  useEffect(() => {
    fetch("http://localhost:4000/api/checkOut", {
      credentials: "include"
    })
      .then(res => {
        // Si el token expiró o no existe
        if (res.status === 401) {
          setAuth(false);
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setAuth(data.auth);
      })
      .catch(() => setAuth(false));
  }, [location.pathname]);

  if (auth === null) {
    return <p>Cargando...</p>;
  }

  return auth ? children : <Navigate to="/login" replace />;
}
