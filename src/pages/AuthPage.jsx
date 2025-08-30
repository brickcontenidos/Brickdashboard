import { useState } from 'react';
import { useUser } from '../context/UserContext.jsx';

export default function AuthPage() {
  const {
    user,
    loginWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    resetPassword,
    logout,
    error,
    setError,
  } = useUser();

  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'reset'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return (
      <div className="max-w-md mx-auto p-6">
        <h1 className="text-2xl font-bold mb-2">Estás conectado</h1>
        <p className="text-gray-300 mb-6">{user.email}</p>
        <button
          onClick={logout}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="mb-6 flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg ${mode === 'login' ? 'bg-white text-gray-900' : 'bg-gray-800'}`}
          onClick={() => { setMode('login'); setError(null); }}
        >
          Entrar
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${mode === 'signup' ? 'bg-white text-gray-900' : 'bg-gray-800'}`}
          onClick={() => { setMode('signup'); setError(null); }}
        >
          Crear cuenta
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${mode === 'reset' ? 'bg-white text-gray-900' : 'bg-gray-800'}`}
          onClick={() => { setMode('reset'); setError(null); }}
        >
          Recuperar
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-900/40 border border-red-700 text-red-200">
          {error}
        </div>
      )}

      {(mode === 'login' || mode === 'signup') && (
        <>
          <div className="space-y-4 mb-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tumarca@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Contraseña</label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>

          {mode === 'login' ? (
            <button
              onClick={async () => { await signInWithEmail(email, password); }}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-100 mb-3"
            >
              Entrar
            </button>
          ) : (
            <button
              onClick={async () => {
                const ok = await signUpWithEmail(email, password);
                if (ok) {
                  alert('Te enviamos un email de verificación. Revisá tu bandeja.');
                }
              }}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-100 mb-3"
            >
              Crear cuenta
            </button>
          )}
        </>
      )}

      {mode === 'reset' && (
        <>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tumarca@gmail.com"
            />
          </div>
          <button
            onClick={async () => {
              const ok = await resetPassword(email);
              if (ok) alert('Si el email existe, te enviamos un enlace para restablecer la contraseña.');
            }}
            className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 hover:bg-gray-100 mb-3"
          >
            Enviar instrucciones
          </button>
        </>
      )}

      <div className="mt-6">
        <button
          onClick={loginWithGoogle}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700"
        >
          Entrar con Google
        </button>
      </div>
    </div>
  );
}
