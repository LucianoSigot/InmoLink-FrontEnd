import { useEffect, useState } from 'react';

export default function DiagnosticPage() {
  const [backendStatus, setBackendStatus] = useState('Verificando...');
  const [cookies, setCookies] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar conexión con backend
    fetch('http://localhost:4000/api/checkOut', {
      credentials: 'include'
    })
      .then(res => {
        setBackendStatus(`Backend respondiendo: Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log('Respuesta del backend:', data);
      })
      .catch(err => {
        setError(`Error: ${err.message}`);
        setBackendStatus('Backend NO accesible');
      });

    // Ver cookies
    setCookies(document.cookie || 'No hay cookies');
  }, []);

  return (
    <div className="p-8 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Diagnóstico de la Aplicación</h1>
      
      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold">Estado del Backend:</h2>
        <p>{backendStatus}</p>
      </div>

      <div className="mb-4 p-4 bg-gray-100 rounded">
        <h2 className="font-bold">Cookies:</h2>
        <p>{cookies}</p>
      </div>

      {error && (
        <div className="p-4 bg-red-100 text-red-800 rounded">
          <h2 className="font-bold">Error:</h2>
          <p>{error}</p>
        </div>
      )}

      <div className="p-4 bg-blue-100 rounded">
        <h2 className="font-bold">Puertos esperados:</h2>
        <ul>
          <li>Frontend: http://localhost:5173 o 5174</li>
          <li>Backend: http://localhost:4000</li>
        </ul>
      </div>
    </div>
  );
}
