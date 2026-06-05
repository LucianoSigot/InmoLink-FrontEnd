import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Cuando Google OAuth es exitoso, el Backend redirige aquí
    // La cookie ya está establecida por el Backend
    // Esperamos un poco para asegurar que la cookie se procesó
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg font-semibold">Completando autenticación...</p>
        <p className="text-sm text-gray-500">Redirigiendo...</p>
      </div>
    </div>
  );
}
