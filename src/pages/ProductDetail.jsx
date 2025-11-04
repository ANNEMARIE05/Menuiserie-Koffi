import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { products } from '../data/products';
import { openWhatsApp } from '../utils/whatsapp';

export default function ProductDetail() {
  const { id } = useParams();
  const naviguer = useNavigate();
  const produit = products.find(p => p.id === parseInt(id));

  const [indexImageSelectionnee, setIndexImageSelectionnee] = useState(0);

  if (!produit) {
    return (
      <div className="container mx-auto px-4 py-6 md:py-16 text-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-marron-800 mb-3 md:mb-4">
          Produit non trouvé
        </h2>
        <button onClick={() => naviguer('/produits')} className="btn-primary text-xs sm:text-sm md:text-base">
          Retour aux produits
        </button>
      </div>
    );
  }

  return (
    <div className="py-4 sm:py-6 md:py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm">
          <ol className="flex items-center space-x-1 sm:space-x-2 text-gray-600">
            <li><Link to="/" className="hover:text-marron-600">Accueil</Link></li>
            <li><i className="fas fa-chevron-right text-xs"></i></li>
            <li><Link to="/produits" className="hover:text-marron-600">Produits</Link></li>
            <li><i className="fas fa-chevron-right text-xs"></i></li>
            <li className="text-marron-800 font-medium truncate max-w-[150px] sm:max-w-none">{produit.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-12 mb-6 sm:mb-8 md:mb-12">
          {/* Images */}
          <div>
            <div className="bg-white shadow-card mb-3 sm:mb-4 h-[300px] sm:h-[400px] md:h-[500px]">
              <Carousel images={produit.images} autoPlay={false} />
            </div>
            
            {/* Miniatures */}
            {produit.images.length > 1 && (
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {produit.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setIndexImageSelectionnee(index)}
                    className={`bg-white shadow-card overflow-hidden h-16 sm:h-20 md:h-24 border-2 transition-all ${
                      indexImageSelectionnee === index
                        ? 'border-marron-600'
                        : 'border-transparent hover:border-marron-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Vue ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/200x150/8a7658/ffffff?text=Vue+${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations */}
          <div>
            <div className="bg-white shadow-card p-4 sm:p-6 md:p-8">
              <div className="mb-3 sm:mb-4">
                <span className="text-kaki-600 text-xs sm:text-sm font-medium uppercase tracking-wide">
                  {produit.category}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-marron-800 mb-3 sm:mb-4">
                {produit.name}
              </h1>
              <div className="mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-marron-700">
                  {produit.price.toLocaleString('fr-FR')} FCFA
                </span>
              </div>
              
              {produit.dimension && (
                <div className="mb-4 sm:mb-6">
                  <h2 className="text-lg sm:text-xl font-display font-semibold text-marron-800 mb-2 sm:mb-3">
                    Dimensions
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    {produit.dimension}
                  </p>
                </div>
              )}

              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-display font-semibold text-marron-800 mb-2 sm:mb-3">
                  Description
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {produit.longDescription}
                </p>
              </div>

              <div className="mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-display font-semibold text-marron-800 mb-2 sm:mb-3">
                  Caractéristiques
                </h2>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {produit.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs sm:text-sm bg-kaki-100 text-kaki-700 px-2 sm:px-3 py-1 font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button
                  onClick={() => openWhatsApp(produit.name, produit.price.toLocaleString('fr-FR') + ' FCFA')}
                  className="btn-primary flex-1 bg-green-600 hover:bg-green-700 text-sm sm:text-base"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Contactez-nous sur WhatsApp
                </button>
                <button
                  onClick={() => naviguer('/devis')}
                  className="btn-secondary flex-1 text-sm sm:text-base"
                >
                  <i className="fas fa-file-invoice mr-2"></i>
                  Demander un devis
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section produits similaires */}
        <div className="mt-6 sm:mt-8 md:mt-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-marron-800 mb-4 sm:mb-6 md:mb-8">
            Produits similaires
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
            {products
              .filter(p => p.category === produit.category && p.id !== produit.id)
              .slice(0, 3)
              .map((produitSimilaire) => (
                <div
                  key={produitSimilaire.id}
                  onClick={() => naviguer(`/produit/${produitSimilaire.id}`)}
                  className="card overflow-hidden cursor-pointer"
                >
                  <div className="relative h-36 sm:h-40 md:h-48 overflow-hidden">
                    <img
                      src={produitSimilaire.images[0]}
                      alt={produitSimilaire.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/8a7658/ffffff?text=${encodeURIComponent(produitSimilaire.name)}`;
                      }}
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-display font-semibold text-marron-800 mb-1 text-sm sm:text-base">
                      {produitSimilaire.name}
                    </h3>
                    <p className="text-marron-600 font-bold text-xs sm:text-sm">
                      {produitSimilaire.price.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

