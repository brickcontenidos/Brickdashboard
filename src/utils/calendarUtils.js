// utils/calendarUtils.js
export function generateWeekData(baseDate = new Date()) {
  // Lunes como inicio de semana:
  const d = new Date(baseDate);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const start = new Date(d.setDate(diff));

  const days = Array.from({ length: 7 }).map((_, i) => {
    const date = new Date(start);
    date.setDate(start.getDate() + i);
    return {
      id: `day-${i}`,
      day: ["LUN","MAR","MIÉ","JUE","VIE","SAB","DOM"][i],
      date: date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit" }),
      sessions: [
        { title: "", description: "", status: "vacío" }, // 12-15
        { title: "", description: "", status: "vacío" }, // 16-19
      ],
      teams: { title: "", status: "vacío" }
    };
  });

  return days;
}

export function getStatusColor(status) {
  switch (status) {
    case "ocupado": return "bg-green-400";
    case "oportunidad": return "bg-yellow-400";
    case "rojo": return "bg-red-400";
    case "vacío":
    default: return "bg-gray-200";
  }
}
export function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setHours(0,0,0,0);
  return new Date(d.setDate(diff));
}

export function getWeekKey(date) {
  const start = getWeekStart(date);
  const y = start.getFullYear();
  const m = String(start.getMonth() + 1).padStart(2, '0');
  const day = String(start.getDate()).padStart(2, '0');
  // usaremos la fecha del lunes como clave de esa semana
  return `${y}-${m}-${day}`;
}
