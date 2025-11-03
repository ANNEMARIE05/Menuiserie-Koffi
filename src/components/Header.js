import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-marron-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            <i className="fas fa-hammer text-2xl text-kaki-300"></i>
            <span className="text-2xl font-display font-bold">Menuiserie Koffi</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-kaki-300 transition-colors duration-300 font-medium">
              Accueil
            </Link>
            <Link to="/produits" className="hover:text-kaki-300 transition-colors duration-300 font-medium">
              Nos Produits
            </Link>
            <Link to="/a-propos" className="hover:text-kaki-300 transition-colors duration-300 font-medium">
              À Propos
            </Link>
            <Link to="/contact" className="hover:text-kaki-300 transition-colors duration-300 font-medium">
              Contact
            </Link>
            <Link to="/devis" className="btn-secondary">
              <i className="fas fa-file-invoice mr-2"></i>
              Demander un devis
            </Link>
          </nav>

          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 space-y-4">
            <Link to="/" className="block hover:text-kaki-300 transition-colors">
              Accueil
            </Link>
            <Link to="/produits" className="block hover:text-kaki-300 transition-colors">
              Nos Produits
            </Link>
            <Link to="/a-propos" className="block hover:text-kaki-300 transition-colors">
              À Propos
            </Link>
            <Link to="/contact" className="block hover:text-kaki-300 transition-colors">
              Contact
            </Link>
            <Link to="/devis" className="block btn-secondary text-center">
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

