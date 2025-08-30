export default function PlaceholderPage({ title = 'Próximamente' }) {
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-400">Contenido en construcción.</p>
    </div>
  );
}
