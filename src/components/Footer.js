import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-marron-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <i className="fas fa-hammer text-xl text-kaki-300"></i>
              <span className="text-xl font-display font-bold">Menuiserie Koffi</span>
            </div>
            <p className="text-gray-300 text-sm">
              Plus de 25 ans d'expérience dans l'artisanat du bois. Nous créons des meubles sur mesure 
              avec passion et savoir-faire traditionnel.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-lg">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-kaki-300 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/produits" className="text-gray-300 hover:text-kaki-300 transition-colors">
                  Nos Produits
                </Link>
              </li>
              <li>
                <Link to="/a-propos" className="text-gray-300 hover:text-kaki-300 transition-colors">
                  À Propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-kaki-300 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-lg">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center space-x-2">
                <i className="fab fa-whatsapp text-green-400"></i>
                <a
                  href="https://wa.me/2250707857252"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-kaki-300 transition-colors"
                >
                  07 07 85 72 52
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <i className="fas fa-map-marker-alt text-kaki-300 mt-1"></i>
                <span>Koumassi 05, juste derrière le lycée municipal de Koumassi<br />Abidjan, Côte d'Ivoire</span>
              </li>
              <li className="flex items-center space-x-2">
                <i className="fas fa-truck text-kaki-300"></i>
                <span>Livraison disponible</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold mb-4 text-lg">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-kaki-300 transition-colors text-xl">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-kaki-300 transition-colors text-xl">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-kaki-300 transition-colors text-xl">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-marron-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Menuiserie Koffi. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

