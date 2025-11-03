import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-marron-800 mb-4"> 
            Nos Produits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez notre collection de meubles artisanaux, tous fabriqués à la main avec passion
          </p>
        </div>

        {/* Filtres */}
        <div className="bg-white p-6 mb-8 shadow-card">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Recherche */}
            <div>
              <label className="block text-sm font-semibold text-marron-700 mb-2">
                <i className="fas fa-search mr-2"></i>
                Rechercher
              </label>
              <input
                type="text"
                placeholder="Nom du produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              />
            </div>

            {/* Catégorie */}
            <div>
              <label className="block text-sm font-semibold text-marron-700 mb-2">
                <i className="fas fa-filter mr-2"></i>
                Catégorie
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Reset filters */}
          {(selectedCategory !== 'Tous' || searchTerm) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedCategory('Tous');
                  setSearchTerm('');
                }}
                className="text-sm text-marron-600 hover:text-marron-700 font-medium"
              >
                <i className="fas fa-times mr-2"></i>
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Grille de produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

