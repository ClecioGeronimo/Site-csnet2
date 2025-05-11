import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">CSNET</span>
            <span className="text-2xl font-bold text-orange-500">PRO LINK</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#quem-somos">Quem Somos</NavLink>
            <NavLink href="#loja">Loja</NavLink>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
              <User className="w-4 h-4" />
              Área do Cliente
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-6">
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="#quem-somos">Quem Somos</MobileNavLink>
              <MobileNavLink href="#loja">Loja</MobileNavLink>
              <button className="flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                <User className="w-4 h-4" />
                Área do Cliente
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function NavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
    >
      {children}
    </a>
  );
}

function MobileNavLink({ href, children }) {
  return (
    <a
      href={href}
      className="text-gray-600 hover:text-blue-600 transition-colors font-medium block py-2"
    >
      {children}
    </a>
  );
}

export default Navbar;