// src/pages/LeadsPage.jsx
import React, { useMemo, useState } from 'react';
import { loadLeads, updateLeadStatus } from '../utils/storage.js';

const statusStyles = {
  nuevo: 'bg-yellow-900/40 border-yellow-700 text-yellow-200',
  contactado: 'bg-blue-900/40 border-blue-700 text-blue-200',
  cerrado: 'bg-green-900/40 border-green-700 text-green-200',
};

export default function LeadsPage() {
  const [leads, setLeads] = useState(loadLeads());

  const updateStatus = (id, status) => {
    updateLeadStatus(id, status);
    setLeads(loadLeads());
  };

  const count = useMemo(() => ({
    total: leads.length,
    nuevo: leads.filter(l => l.status === 'nuevo').length,
    contactado: leads.filter(l => l.status === 'contactado').length,
    cerrado: leads.filter(l => l.status === 'cerrado').length,
  }), [leads]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Leads</h1>

      <div className="flex gap-3 mb-4 text-sm">
        <span className="px-2 py-1 bg-gray-800 rounded">Total: {count.total}</span>
        <span className="px-2 py-1 bg-yellow-800/60 rounded">Nuevo: {count.nuevo}</span>
        <span className="px-2 py-1 bg-blue-800/60 rounded">Contactado: {count.contactado}</span>
        <span className="px-2 py-1 bg-green-800/60 rounded">Cerrado: {count.cerrado}</span>
      </div>

      {leads.length === 0 ? (
        <p className="text-gray-400">Sin leads aún.</p>
      ) : (
        <div className="space-y-3">
          {leads.map(l => (
            <div key={l.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm text-gray-400">
                  <span>ID:</span> <span className="text-gray-300">{l.id}</span> ·{' '}
                  <span>{new Date(l.createdAt).toLocaleString()}</span>
                </div>
                <div className={`px-2 py-1 text-xs rounded border ${statusStyles[l.status] || 'bg-gray-800 border-gray-700 text-gray-300'}`}>
                  {l.status}
                </div>
              </div>

              <div className="mt-3 grid md:grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <div><strong>Marca:</strong> {l.brandName || '—'}</div>
                  <div><strong>Rubro/Escenario/Nivel:</strong> {l.rubro || '—'} / {l.escenario || '—'} / {l.nivel || '—'}</div>
                  {l.idea && <div><strong>Idea:</strong> {l.idea}</div>}
                  {l.links && <div><strong>Links:</strong> {l.links}</div>}
                </div>
                <div className="space-y-1">
                  <div><strong>Nombre:</strong> {l.name || '—'}</div>
                  <div><strong>Email:</strong> {l.email || '—'}</div>
                  <div><strong>Instagram:</strong> {l.instagram || '—'}</div>
                  <div><strong>Teléfono:</strong> {l.phone || '—'}</div>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <button onClick={()=>updateStatus(l.id,'nuevo')} className="px-3 py-1 rounded bg-yellow-700 hover:bg-yellow-600 text-white text-xs">Marcar nuevo</button>
                <button onClick={()=>updateStatus(l.id,'contactado')} className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-600 text-white text-xs">Marcar contactado</button>
                <button onClick={()=>updateStatus(l.id,'cerrado')} className="px-3 py-1 rounded bg-green-700 hover:bg-green-600 text-white text-xs">Marcar cerrado</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
