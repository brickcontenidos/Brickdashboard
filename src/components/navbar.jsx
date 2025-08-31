// src/components/navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.js';

export default function Navbar() {
  const [user, setUser] = useState(null);

  // lee sesión
  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (mounted) setUser(data.user || null);
    })();
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user || null);
    });
    return () => sub?.subscription?.unsubscribe?.();
  }, []);

  const item = 'px-3 py-2 rounded-lg hover:bg-gray-800';
  const active = ({ isActive }) => (isActive ? `${item} bg-gray-800` : item);

  const loginWithGoogle = async () => {
    const redirectTo = `${window.location.origin}/auth`; // coincide con Supabase Redirect URLs
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
    if (error) {
      console.error('Error signInWithOAuth', error);
      alert('No se pudo iniciar sesión con Google: ' + error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

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
              <button onClick={logout} className="px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700">
                Salir
              </button>
            </>
          ) : (
            <button onClick={loginWithGoogle} className="px-3 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100">
              Entrar con Google
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
