import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-marron-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          <Link to="/" className="flex items-center space-x-3 z-10 hover:opacity-80 transition-opacity duration-300">
            <i className="fas fa-hammer text-2xl text-kaki-300"></i>
            <span className="text-2xl font-display font-bold">Menuiserie Koffi</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            <Link 
              to="/" 
              className={`relative px-3 py-2 transition-all duration-300 font-medium group ${
                location.pathname === '/' || location.pathname.startsWith('/produit/')
                  ? 'text-kaki-300' 
                  : 'text-white hover:text-kaki-300'
              }`}
            >
              Accueil
              {(location.pathname === '/' || location.pathname.startsWith('/produit/')) && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300"></span>
              )}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/produits" 
              className={`relative px-3 py-2 transition-all duration-300 font-medium group ${
                location.pathname === '/produits' 
                  ? 'text-kaki-300' 
                  : 'text-white hover:text-kaki-300'
              }`}
            >
              Nos Produits
              {location.pathname === '/produits' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300"></span>
              )}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/a-propos" 
              className={`relative px-3 py-2 transition-all duration-300 font-medium group ${
                location.pathname === '/a-propos' 
                  ? 'text-kaki-300' 
                  : 'text-white hover:text-kaki-300'
              }`}
            >
              À Propos
              {location.pathname === '/a-propos' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300"></span>
              )}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link 
              to="/contact" 
              className={`relative px-3 py-2 transition-all duration-300 font-medium group ${
                location.pathname === '/contact' 
                  ? 'text-kaki-300' 
                  : 'text-white hover:text-kaki-300'
              }`}
            >
              Contact
              {location.pathname === '/contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300"></span>
              )}
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kaki-300 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link 
              to="/devis" 
              className={`hidden md:block btn-secondary transition-all duration-300 ${
                location.pathname === '/devis' 
                  ? 'bg-kaki-600 hover:bg-kaki-700 ring-2 ring-kaki-400' 
                  : ''
              }`}
            >
              <i className="fas fa-file-invoice mr-2"></i>
              Demander un devis
            </Link>
            <button
              className="md:hidden text-2xl hover:text-kaki-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            <Link 
              to="/" 
              className={`block px-4 py-2 rounded transition-all duration-300 ${
                location.pathname === '/' || location.pathname.startsWith('/produit/')
                  ? 'bg-kaki-600 text-white' 
                  : 'hover:bg-marron-600 hover:text-kaki-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/produits" 
              className={`block px-4 py-2 rounded transition-all duration-300 ${
                location.pathname === '/produits'
                  ? 'bg-kaki-600 text-white' 
                  : 'hover:bg-marron-600 hover:text-kaki-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Nos Produits
            </Link>
            <Link 
              to="/a-propos" 
              className={`block px-4 py-2 rounded transition-all duration-300 ${
                location.pathname === '/a-propos'
                  ? 'bg-kaki-600 text-white' 
                  : 'hover:bg-marron-600 hover:text-kaki-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              className={`block px-4 py-2 rounded transition-all duration-300 ${
                location.pathname === '/contact'
                  ? 'bg-kaki-600 text-white' 
                  : 'hover:bg-marron-600 hover:text-kaki-300'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              to="/devis" 
              className="block btn-secondary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <i className="fas fa-file-invoice mr-2"></i>
              Demander un devis
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;

