import { Link, NavLink } from 'react-router-dom';
import { useUser } from '../context/UserContext.jsx';

export default function Navbar() {
  const { user, logout } = useUser();

  const item = 'px-3 py-2 rounded-lg hover:bg-gray-800';
  const active = ({ isActive }) => (isActive ? `${item} bg-gray-800` : item);

  return (
    <nav className="sticky top-0 z-40 border-b border-gray-800 bg-[#0a0a0a]/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-3 py-2 flex items-center justify-between">
        <Link to="/" className="font-black tracking-wide">BRICK</Link>
        <div className="flex items-center gap-1">
          <NavLink className={active} to="/calendar">Calendario</NavLink>
          <NavLink className={active} to="/packages">Paquetes</NavLink>
          <NavLink className={active} to="/brands">Marcas</NavLink>
          <NavLink className={active} to="/quiz">Quiz</NavLink>
          <NavLink className={active} to="/leads">Leads</NavLink>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="text-xs text-gray-400 hidden sm:block">
                Hola, <strong className="text-white">{user.email}</strong>
              </span>
              <button onClick={logout} className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">Salir</button>
            </>
          ) : (
            <Link to="/auth" className="px-3 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100">
              Entrar / Registrarse
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
