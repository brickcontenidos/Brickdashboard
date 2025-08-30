// src/pages/QuizPage.jsx
import React, { useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { saveLead, saveBrand, linkLeadToBrand } from '../utils/storage.js';
import serviceData from '../data/serviceData.js';

export default function QuizPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [brandName, setBrandName] = useState('');
  const [contact, setContact] = useState({ email: '', phone: '', instagram: '' });

  const preselectedGenre = params.get('genre');
  const [know, setKnow] = useState(null);

  const [genreKey, setGenreKey] = useState(preselectedGenre || '');
  const [scenarioIndex, setScenarioIndex] = useState(null);
  const [levelKey, setLevelKey] = useState('');

  const [freeIdea, setFreeIdea] = useState('');

  const genre = useMemo(() => (genreKey ? serviceData[genreKey] : null), [genreKey]);
  const scenario = useMemo(() => {
    if (!genre || scenarioIndex === null) return null;
    return genre.scenarios?.[scenarioIndex] || null;
  }, [genre, scenarioIndex]);

  const canGoStep2 = brandName.trim().length >= 2;
  const canFinishGuided =
    brandName.trim() &&
    genreKey &&
    (scenarioIndex !== null) &&
    (
      (scenario?.name?.toLowerCase().includes('guion abierto')) ||
      !!levelKey
    );

  const submitLead = () => {
    const brand = saveBrand({ name: brandName, ...contact });

    let payload;
    if (know === 'si') {
      payload = {
        brandId: brand.id,
        brandName: brand.name,
        path: 'idea_clara',
        idea: freeIdea,
        ...contact,
      };
    } else {
      const chosenLevel = levelKey && scenario && scenario.levels ? scenario.levels[levelKey] : null;
      payload = {
        brandId: brand.id,
        brandName: brand.name,
        path: 'guiado',
        genre: genre?.name || '',
        scenario: scenario?.name || '',
        level: chosenLevel?.name || (scenario?.name?.toLowerCase().includes('guion abierto') ? 'Proyecto a medida' : ''),
        summary: buildSummaryText({ genre, scenario, level: chosenLevel }),
        ...contact,
      };
    }

    const leadId = saveLead(payload);
    linkLeadToBrand(brand.id, leadId);

    alert('¡Listo! Registramos tu proyecto. Te vamos a contactar :)');
    navigate('/leads');
  };

  const buildSummaryText = ({ genre, scenario, level }) => {
    let lines = [];
    if (genre) lines.push(`Rubro: ${genre.name}`);
    if (scenario) lines.push(`Escenario: ${scenario.name}`);
    if (level) {
      lines.push(level.name);
      if (typeof level.desc === 'object') {
        if (level.desc.utilidad) lines.push(`Utilidad: ${level.desc.utilidad}`);
        if (level.desc.equipo) lines.push(`Equipo: ${level.desc.equipo}`);
        if (level.desc.edicion) lines.push(`Edición: ${level.desc.edicion}`);
        if (level.desc.entregables) lines.push(`Entregables: ${level.desc.entregables}`);
      }
    }
    return lines.join('\n');
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-black mb-6">Explorar / Quiz</h1>

      {/* Paso 0: Nombre de marca */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">Tu marca</h2>
        <p className="text-gray-400 mb-4">Empezá creando tu panel: escribí el nombre de tu marca y un contacto.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 w-full"
            placeholder="Nombre de tu marca"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 w-full"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact(prev => ({ ...prev, email: e.target.value }))}
          />
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 w-full"
            placeholder="Instagram (opcional)"
            value={contact.instagram}
            onChange={(e) => setContact(prev => ({ ...prev, instagram: e.target.value }))}
          />
          <input
            className="bg-gray-800 border border-gray-700 rounded-lg p-3 w-full"
            placeholder="Teléfono (opcional)"
            value={contact.phone}
            onChange={(e) => setContact(prev => ({ ...prev, phone: e.target.value }))}
          />
        </div>
        {!canGoStep2 && <p className="text-sm text-gray-500 mt-2">Escribí el nombre de tu marca para continuar.</p>}
      </section>

      {/* Paso 1: ¿Sabés lo que querés? */}
      <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">¿Sabés lo que querés?</h2>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 rounded-lg ${know==='si' ? 'bg-red-600' : 'bg-gray-800'}`}
            disabled={!canGoStep2}
            onClick={() => setKnow('si')}
          >Sí</button>
          <button
            className={`px-4 py-2 rounded-lg ${know==='no' ? 'bg-red-600' : 'bg-gray-800'}`}
            disabled={!canGoStep2}
            onClick={() => setKnow('no')}
          >No, guiame</button>
        </div>
      </section>

      {/* Paso 1A: idea libre */}
      {know === 'si' && (
        <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-bold mb-2">Contanos tu idea</h3>
          <textarea
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 min-h-[140px]"
            placeholder="Ej: Queremos un reel como este https://instagram.com/... + fotos de 10 productos..."
            value={freeIdea}
            onChange={(e) => setFreeIdea(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              className="px-5 py-3 rounded-lg bg-red-600"
              disabled={!brandName.trim() || !freeIdea.trim()}
              onClick={submitLead}
            >
              Crear proyecto
            </button>
          </div>
        </section>
      )}

      {/* Paso 1B: guiado */}
      {know === 'no' && (
        <>
          {/* Ladrillo 1: Rubro */}
          <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">Ladrillo 1: Rubro</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {Object.entries(serviceData).map(([key, g]) => (
                <button key={key}
                  className={`p-4 rounded-lg border ${genreKey===key?'border-red-400 bg-gray-800':'border-gray-700 bg-gray-800/60'}`}
                  onClick={() => { setGenreKey(key); setScenarioIndex(null); setLevelKey(''); }}
                >
                  <div className="text-left">
                    <div className="text-red-400 font-bold">{g.name}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Ladrillo 2: Escenario */}
          {genre && (
            <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-2">Ladrillo 2: Escenario</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {genre.scenarios?.map((sc, i) => (
                  <button key={sc.name}
                    className={`p-4 rounded-lg border text-left ${scenarioIndex===i?'border-red-400 bg-gray-800':'border-gray-700 bg-gray-800/60'}`}
                    onClick={() => { setScenarioIndex(i); setLevelKey(''); }}
                  >
                    <div className="text-red-400 font-bold">{sc.name}</div>
                    <div className="text-sm text-gray-300 mt-1">{sc.desc}</div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Ladrillo 3: Nivel */}
          {scenario && (
            <section className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-bold mb-2">Ladrillo 3: Nivel</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {scenario.levels && Object.entries(scenario.levels).map(([k, lv]) => (
                  <button key={k}
                    className={`p-4 rounded-lg border text-left ${levelKey===k?'border-red-400 bg-gray-800':'border-gray-700 bg-gray-800/60'}`}
                    onClick={() => setLevelKey(k)}
                  >
                    <div className="text-red-400 font-bold">{lv.name}</div>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="px-5 py-3 rounded-lg bg-red-600"
                  disabled={!canFinishGuided}
                  onClick={submitLead}
                >
                  Crear proyecto
                </button>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
