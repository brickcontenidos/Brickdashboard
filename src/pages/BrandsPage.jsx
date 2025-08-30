// src/pages/BrandsPage.jsx
import React from 'react';
import { loadBrands } from '../utils/storage.js';

export default function BrandsPage() {
  const brands = loadBrands();

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Marcas</h1>

      {brands.length === 0 ? (
        <p className="text-gray-400">Aún no hay marcas. Se crean al iniciar el quiz con el nombre de la marca.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {brands.map(b => (
            <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="text-lg font-bold">{b.name}</div>
              <div className="text-xs text-gray-400 mt-1">Creada: {new Date(b.createdAt).toLocaleString()}</div>
              <div className="mt-2 text-sm text-gray-300 space-y-1">
                {b.email && <div><strong>Email:</strong> {b.email}</div>}
                {b.instagram && <div><strong>IG:</strong> {b.instagram}</div>}
                {b.phone && <div><strong>Tel:</strong> {b.phone}</div>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
