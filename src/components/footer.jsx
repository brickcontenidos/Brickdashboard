function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white text-center p-4">
      <p>&copy; {currentYear} Nombre de la App. Todos los derechos reservados.</p>
    </footer>
  );
}

export default Footer;
