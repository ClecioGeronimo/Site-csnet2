import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CSNET PRO LINK</h3>
            <p className="text-gray-300">
              Sua melhor escolha em internet no Conde-PB
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span>(83) 99914-2617</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span>contato@csnetprolink.com.br</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>Conde, PB</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><a href="/#planos" className="hover:text-orange-500 transition-colors">Planos</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Área do Cliente</a></li>
              <li><a href="#" className="hover:text-orange-500 transition-colors">Suporte</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mt-12 pt-8 border-t border-blue-800">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-xl font-bold mb-6">Conecte-se conosco</h3>
            <div className="flex items-center justify-center space-x-6">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-blue-800 p-3 rounded-full group-hover:bg-blue-600 transition-colors">
                  <Facebook className="w-6 h-6" />
                </div>
                <span className="block text-center mt-2 text-sm opacity-75 group-hover:opacity-100 transition-opacity">Facebook</span>
              </a>
              
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-blue-800 p-3 rounded-full group-hover:bg-pink-600 transition-colors">
                  <Instagram className="w-6 h-6" />
                </div>
                <span className="block text-center mt-2 text-sm opacity-75 group-hover:opacity-100 transition-opacity">Instagram</span>
              </a>
              
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-blue-800 p-3 rounded-full group-hover:bg-blue-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </div>
                <span className="block text-center mt-2 text-sm opacity-75 group-hover:opacity-100 transition-opacity">Twitter</span>
              </a>
              
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-blue-800 p-3 rounded-full group-hover:bg-blue-500 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="block text-center mt-2 text-sm opacity-75 group-hover:opacity-100 transition-opacity">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-12 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} CSNET PRO LINK. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;