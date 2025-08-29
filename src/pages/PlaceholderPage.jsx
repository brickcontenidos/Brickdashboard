import React from 'react';

// Esta es una página genérica para mostrar mientras construimos las demás.
const PlaceholderPage = ({ pageName, onNavigate }) => (
  <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
    <h1 className="text-4xl font-bold mb-8">Página: {pageName}</h1>
    <p className="text-gray-400 mb-8">Esta sección está en construcción.</p>
    <button
      onClick={() => onNavigate('home')}
      className="px-6 py-3 bg-[#E63946] text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
    >
      Volver al Inicio
    </button>
  </div>
);

export default PlaceholderPage;
