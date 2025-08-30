// src/utils/storage.js

// ====== CALENDARIO ======
const CAL_KEY = 'brick_calendar';
export function loadWeek(weekKey) {
  const db = JSON.parse(localStorage.getItem(CAL_KEY) || '{}');
  return db[weekKey] || null;
}
export function saveWeek(weekKey, weekData) {
  const db = JSON.parse(localStorage.getItem(CAL_KEY) || '{}');
  db[weekKey] = weekData;
  localStorage.setItem(CAL_KEY, JSON.stringify(db));
}

// ====== LEADS ======
const LEADS_KEY = 'leads';

export const loadLeads = () => {
  try { return JSON.parse(localStorage.getItem(LEADS_KEY) || '[]'); }
  catch { return []; }
};

export const saveLead = (lead) => {
  const all = loadLeads();
  const id = (crypto?.randomUUID?.() || `lead_${Date.now()}`);
  const createdAt = new Date().toISOString();
  // estados: nuevo | contactado | cerrado
  all.unshift({ id, createdAt, status: 'nuevo', ...lead });
  localStorage.setItem(LEADS_KEY, JSON.stringify(all));
  return id; // ⬅ devuelve el id para poder linkear
};

export const updateLeadStatus = (id, status) => {
  const all = loadLeads();
  const idx = all.findIndex(l => l.id === id);
  if (idx >= 0) {
    all[idx].status = status;
    localStorage.setItem(LEADS_KEY, JSON.stringify(all));
  }
};

// ====== MARCAS ======
const BRANDS_KEY = 'brands';

export const loadBrands = () => {
  try { return JSON.parse(localStorage.getItem(BRANDS_KEY) || '[]'); }
  catch { return []; }
};

export const saveBrand = (brand) => {
  const all = loadBrands();
  // si ya existe por nombre (case-insensitive), devolvé esa
  const exists = all.find(b => b.name.trim().toLowerCase() === brand.name.trim().toLowerCase());
  if (exists) return exists;

  const newBrand = {
    id: (crypto?.randomUUID?.() || `brand_${Date.now()}`),
    createdAt: new Date().toISOString(),
    // opcional: owner (cuando activemos auth real)
    owner: brand.owner || null,
    name: brand.name.trim(),
    instagram: brand.instagram || '',
    email: brand.email || '',
    phone: brand.phone || '',
    notes: brand.notes || '',
    lastLeadId: null, // lo actualizamos cuando se genera un lead
  };
  all.unshift(newBrand);
  localStorage.setItem(BRANDS_KEY, JSON.stringify(all));
  return newBrand;
};

export const linkLeadToBrand = (brandId, leadId) => {
  const all = loadBrands();
  const idx = all.findIndex(b => b.id === brandId);
  if (idx >= 0) {
    all[idx].lastLeadId = leadId;
    localStorage.setItem(BRANDS_KEY, JSON.stringify(all));
  }
};
