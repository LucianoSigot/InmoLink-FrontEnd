import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "../servicios/auth.service";

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile()
      .then((data) => setUser(data))
      .catch(() => navigate("/login"));
  }, []);

  const navItems = [
    { to: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" },
    { to: "/admin/propiedades", label: "Propiedades", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { to: "/admin/usuarios", label: "Usuarios", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
  ];

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#f8f7f4]">
      {/* Top bar */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-8 w-8 bg-red-600 rounded-lg flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="font-['Cormorant_Garamond'] font-bold text-xl tracking-tight text-gray-900">INMOLINK</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-600 bg-red-50 px-2 py-1 rounded-full">Admin</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-sm text-gray-500 hover:text-black transition-colors uppercase tracking-widest">
              Volver al sitio
            </Link>
            <span className="text-sm font-medium text-gray-700">{user?.name || user?.email}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <aside className="w-64 shrink-0">
          <nav className="bg-white rounded-2xl luxury-shadow p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(item.to)
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-black"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
