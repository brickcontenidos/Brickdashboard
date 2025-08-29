import React from 'react';
import serviceData from "../data/serviceData.js";

const PackagesPage = ({ onNavigate }) => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0a0a0a] to-gray-800 text-white font-sans p-4 sm:p-8">
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={() => onNavigate('home')}
        className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
        Paquetes de Producción
      </h1>
      <div className="w-12"></div>
    </div>
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Object.entries(serviceData).map(([key, data]) => (
        <div
          key={key}
          className="group bg-gray-900 rounded-2xl overflow-hidden shadow-xl border border-gray-700 hover:border-[#E63946] transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <div className="relative overflow-hidden">
            <img
              src={data.image}
              alt={`${data.name} service`}
              className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/1f2c37/d1d5db?text=Image+Not+Found"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute top-4 left-4 text-3xl bg-black/20 backdrop-blur-sm rounded-full p-2">
              {data.icon}
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-3 text-white">{data.name}</h2>
            {/* ... resto del contenido ... */}
            <button
              onClick={() => alert(`Configurando ${data.name}`)}
              className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-[#E63946] to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300"
            >
              Configurar Proyecto
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PackagesPage;

