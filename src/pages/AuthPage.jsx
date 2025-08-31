// src/pages/AuthPage.jsx
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.js';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('Procesando autenticación…');

  useEffect(() => {
    const sub = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[auth] event:', event, { session });
      if (event === 'SIGNED_IN') {
        setMsg('¡Listo! Iniciaste sesión ✅');
        setTimeout(() => navigate('/'), 600);
      } else if (event === 'SIGNED_OUT') {
        setMsg('Sesión cerrada.');
      } else if (event === 'USER_UPDATED') {
        setMsg('Usuario actualizado.');
        setTimeout(() => navigate('/'), 600);
      }
    });

    // Por si el callback llegó y la sesión ya está
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) console.error(error);
      if (data?.session) {
        setMsg('¡Listo! Iniciaste sesión ✅');
        setTimeout(() => navigate('/'), 600);
      }
    });

    return () => {
      sub?.data?.subscription?.unsubscribe?.();
    };
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Autenticación</h1>
      <p className="text-gray-300">{msg}</p>
      <p className="text-xs text-gray-500 mt-4">
        Si esto tarda, revisá la consola del navegador (F12) por errores de redirección u orígenes no autorizados.
      </p>
    </div>
  );
}
