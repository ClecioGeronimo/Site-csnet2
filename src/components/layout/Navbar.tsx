import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Wifi, User } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Wifi className="w-8 h-8 text-orange-500" />
            <div className="flex items-center">
              <span className="text-3xl font-bold text-orange-500">
                CSNET
              </span>
              <span className="text-3xl font-bold text-blue-600">
                PRO LINK
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" active={isActive('/')}>Início</NavLink>
            <NavLink to="/planos" active={isActive('/planos')}>Planos</NavLink>
            <NavLink to="/contato" active={isActive('/contato')}>Contato</NavLink>
            <a
              href="https://central.csnetprolink.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-2.5 rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <User className="w-5 h-5" />
              <span className="font-semibold">Área do Cliente</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-orange-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col space-y-2">
              <MobileNavLink to="/" active={isActive('/')} onClick={() => setIsOpen(false)}>
                Início
              </MobileNavLink>
              <MobileNavLink to="/planos" active={isActive('/planos')} onClick={() => setIsOpen(false)}>
                Planos
              </MobileNavLink>
              <MobileNavLink to="/contato" active={isActive('/contato')} onClick={() => setIsOpen(false)}>
                Contato
              </MobileNavLink>
              <a
                href="https://central.csnetprolink.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-blue-600 text-white px-4 py-2 rounded-lg"
              >
                <User className="w-5 h-5" />
                <span className="font-semibold">Área do Cliente</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`text-gray-600 hover:text-orange-500 transition-colors font-medium ${
        active ? 'text-orange-500' : ''
      }`}
    >
      {children}
    </Link>
  );
}

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

function MobileNavLink({ to, active, onClick, children }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block py-2 text-gray-600 hover:text-orange-500 transition-colors font-medium ${
        active ? 'text-orange-500' : ''
      }`}
    >
      {children}
    </Link>
  );
}

export default Navbar;