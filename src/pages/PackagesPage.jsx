// src/pages/PackagesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import serviceData from '../data/serviceData.js';

export default function PackagesPage() {
  const items = Object.entries(serviceData); // [ [key, {name, image,...}], ... ]

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-black mb-2">Paquetes</h1>
      <p className="text-gray-400 mb-6">Elegí tu mundo y empezá a construir tu proyecto.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(([key, g]) => (
          <div key={key} className="rounded-xl overflow-hidden border border-gray-800 bg-gray-900">
            <div className="aspect-video bg-gray-800"
                 style={{ backgroundImage: `url(${g.image||''})`, backgroundSize:'cover', backgroundPosition:'center' }} />
            <div className="p-4">
              <div className="text-lg font-bold">{g.name}</div>
              <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                Explorá ideas y armá tu plan de producción.
              </p>
              <Link
                to={`/quiz?genre=${encodeURIComponent(key)}`}
                className="mt-4 inline-flex px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100"
              >
                Explorar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
