import logo from '../assets/images/logo.svg';

function Navbar() {
  return (
    <nav className="bg-gray-950 text-white p-4 shadow-lg flex items-center">
      <img src={logo} alt="Logo de la aplicación" className="h-8 w-8 mr-3" />
      <p className="font-bold text-xl">Esqueleto de App</p>
    </nav>
  );
}

export default Navbar;

