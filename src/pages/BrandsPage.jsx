import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase.js';

export default function BrandsPage() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const [creating, setCreating] = useState(false);
  const [brandName, setBrandName] = useState('');

  const [brands, setBrands] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [membersByBrand, setMembersByBrand] = useState({}); // { [brandId]: members[] }

  // 1) Cargar usuario actual
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoadingUser(true);
      const { data, error } = await supabase.auth.getUser();
      if (!mounted) return;
      if (error) {
        console.error('auth.getUser error', error);
      } else {
        setUser(data.user || null);
      }
      setLoadingUser(false);
    })();
    return () => { mounted = false; };
  }, []);

  // 2) Cargar marcas visibles según RLS
  const fetchBrands = async () => {
    setLoadingBrands(true);
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading brands', error);
      setBrands([]);
    } else {
      setBrands(data || []);
    }
    setLoadingBrands(false);
  };

  // 3) Por cada marca, cargar miembros (RLS deja ver tu propia fila y, si sos owner/controller/admin, todo el equipo)
  const fetchMembersFor = async (brandId) => {
    const { data, error } = await supabase
      .from('brand_members')
      .select('*')
      .eq('brand_id', brandId);

    if (error) {
      console.error('Error loading members', error);
      return [];
    }
    return data || [];
  };

  const fetchAllMembers = async (list) => {
    const mapping = {};
    for (const b of list) {
      const m = await fetchMembersFor(b.id);
      mapping[b.id] = m;
    }
    setMembersByBrand(mapping);
  };

  useEffect(() => {
    if (!loadingUser) {
      fetchBrands().then(() => {
        // cuando hay brands, traemos sus miembros
      });
    }
  }, [loadingUser]);

  useEffect(() => {
    if (brands.length > 0) {
      fetchAllMembers(brands);
    } else {
      setMembersByBrand({});
    }
  }, [brands]);

  // 4) Crear marca
  const onCreateBrand = async (e) => {
    e.preventDefault();
    if (!user) return;

    const name = brandName.trim();
    if (!name) return;

    setCreating(true);
    const { error } = await supabase.from('brands').insert({
      name,
      owner_id: user.id, // 👈 queda asociado al dueño
    });

    setCreating(false);
    if (error) {
      alert('Error creando la marca: ' + error.message);
      return;
    }
    setBrandName('');
    await fetchBrands();
  };

  // 5) ¿Soy miembro controller ya?
  const amController = (brandId) => {
    const members = membersByBrand[brandId] || [];
    return members.some((m) => m.user_id === user?.id && m.role === 'controller');
  };

  // 6) AgregarME como controller (si soy owner o admin, las policies lo permiten)
  const addMeAsController = async (brandId) => {
    if (!user) return;
    const { error } = await supabase.from('brand_members').insert({
      brand_id: brandId,
      user_id: user.id,
      role: 'controller',
    });
    if (error) {
      alert('No se pudo agregar tu rol: ' + error.message);
      return;
    }
    await fetchAllMembers(brands);
  };

  if (loadingUser) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Marcas</h1>
        <p className="text-gray-400">Cargando usuario…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Marcas</h1>
        <p className="text-gray-400">Necesitás iniciar sesión para ver y crear marcas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <span className="text-sm text-gray-400">Usuario: <strong className="text-white">{user.email}</strong></span>
      </div>

      {/* Crear marca */}
      <form onSubmit={onCreateBrand} className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8">
        <h2 className="font-semibold mb-3">Crear nueva marca</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Nombre de tu marca (ej: Barbería Brick)"
            className="flex-1 px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#E63946]"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
          />
          <button
            type="submit"
            disabled={creating || !brandName.trim()}
            className="px-5 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 disabled:bg-gray-600 disabled:text-gray-300"
          >
            {creating ? 'Creando…' : 'Crear'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Al crear una marca quedás como <strong>owner</strong>. Podés sumarte también como <strong>controller</strong> para probar permisos de edición global.
        </p>
      </form>

      {/* Listado de marcas visibles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Mis marcas</h2>
          <button
            onClick={fetchBrands}
            className="text-sm px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700"
          >
            Refrescar
          </button>
        </div>

        {loadingBrands && <p className="text-gray-400">Cargando marcas…</p>}

        {!loadingBrands && brands.length === 0 && (
          <div className="text-gray-400">Aún no tenés marcas visibles.</div>
        )}

        {!loadingBrands && brands.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {brands.map((b) => (
              <div key={b.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold">{b.name}</h3>
                  <span className="text-xs text-gray-500">ID: {b.id}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Owner: {b.owner_id ? b.owner_id : <em>—</em>}
                </p>

                {/* Miembros */}
                <div className="mt-4">
                  <p className="text-sm text-gray-300 mb-2">Miembros</p>
                  <div className="space-y-1">
                    {(membersByBrand[b.id] || []).length === 0 && (
                      <p className="text-xs text-gray-500">Sin miembros visibles.</p>
                    )}
                    {(membersByBrand[b.id] || []).map((m) => (
                      <div key={`${m.brand_id}-${m.user_id}`} className="text-xs text-gray-400">
                        <span className="text-white">{m.user_id}</span> — <span className="uppercase">{m.role}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Botón: agregarME como controller (si no lo soy aún) */}
                <div className="mt-4">
                  {!amController(b.id) ? (
                    <button
                      onClick={() => addMeAsController(b.id)}
                      className="w-full px-4 py-2 rounded-lg bg-[#E63946] hover:bg-red-700 font-semibold"
                    >
                      Agregarme como CONTROLLER
                    </button>
                  ) : (
                    <p className="text-xs text-green-400 text-center">
                      Ya sos <strong>controller</strong> en esta marca.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
