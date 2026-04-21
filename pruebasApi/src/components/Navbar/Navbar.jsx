import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Título de la App */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 hover:opacity-80 transition-opacity"
            >
              🚀 AstroApp
            </Link>
          </div>

          {/* Enlaces de navegación */}
          <div className="flex gap-2 sm:gap-6">
            <Link
              to="/"
              className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              Inicio
            </Link>
            <Link
              to="/mars"
              className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              Marte
            </Link>
            <Link
              to="/asteroids"
              className="text-slate-300 hover:text-white hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              Asteroides
            </Link>
            <Link
              to="/favorites"
              className="text-purple-400 hover:text-purple-300 hover:bg-slate-800 px-3 py-2 rounded-md text-sm font-medium transition-all"
            >
              ⭐ Favoritos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
