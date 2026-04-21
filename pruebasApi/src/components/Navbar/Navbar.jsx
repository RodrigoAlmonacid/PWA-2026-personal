import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex gap-6">
      <Link to="/">Inicio</Link>
      <Link to="/mars">Marte</Link>
      <Link to="/asteroids">Asteroides</Link>
      <Link to="/favorites">Favoritos</Link>
    </nav>
  );
}