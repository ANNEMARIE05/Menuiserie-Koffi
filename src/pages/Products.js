import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Products = () => {
  const [categorie, setCategorie] = useState('Tous');
  const [recherche, setRecherche] = useState('');

  const produitsFiltres = products.filter((produit) => {
    const correspondCategorie = categorie === 'Tous' || produit.category === categorie;
    const correspondRecherche = produit.name.toLowerCase().includes(recherche.toLowerCase()) ||
                         produit.description.toLowerCase().includes(recherche.toLowerCase());
    
    return correspondCategorie && correspondRecherche;
  });

  return (
    <div className="py-4 sm:py-6 md:py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-marron-800 mb-2 sm:mb-3 md:mb-4"> 
            Nos Produits
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection de meubles artisanaux, tous fabriqués à la main avec passion
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white p-4 sm:p-6 mb-6 sm:mb-8 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Recherche */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-marron-700 mb-2">
                <i className="fas fa-search mr-2"></i>
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Nom du produit..."
                value={recherche}
                onChange={(e) => setRecherche(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-marron-700 mb-2">
                <i className="fas fa-filter mr-2"></i>
                Catégorie
              </label>
              <select
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              >
                {categories.map((categorieItem) => (
                  <option key={categorieItem} value={categorieItem}>
                    {categorieItem}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset filters */}
          {(categorie !== 'Tous' || recherche) && (
            <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setCategorie('Tous');
                  setRecherche('');
                }}
                className="text-xs sm:text-sm text-marron-600 hover:text-marron-700 font-medium"
              >
                <i className="fas fa-times mr-2"></i>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="mb-3 sm:mb-4 md:mb-6">
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            {produitsFiltres.length} produit{produitsFiltres.length > 1 ? 's' : ''} trouvé{produitsFiltres.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8">  
          {produitsFiltres.map((produit) => (
            <ProductCard key={produit.id} product={produit} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

