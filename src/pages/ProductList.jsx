import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Pagination from '../components/Pagination';
import { products } from '../data/products';

const ITEMS_PER_PAGE = 10;

export default function ProductList() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['Tous', ...new Set(products.map(p => p.category))];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === 'Tous' || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, filterCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-2 sm:py-4 md:py-8">
        <div className="container mx-auto px-2 sm:px-4">
        <div className="mb-2 sm:mb-4 md:mb-6">
          <h1 className="text-base sm:text-xl md:text-3xl font-display font-bold text-marron-800 mb-2 sm:mb-3 md:mb-4">
            <i className="fas fa-list text-kaki-600 mr-1.5 sm:mr-2 text-sm sm:text-lg md:text-xl"></i>
            Liste des produits
          </h1>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-card p-2 sm:p-3 md:p-4 mb-2 sm:mb-4 md:mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 md:mb-2">
                  Rechercher
                </label>
                <div className="relative">
                  <i className="fas fa-search absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-7 sm:pl-8 md:pl-10 pr-2 sm:pr-3 md:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5 md:mb-2">
                  Catégorie
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Vue Mobile - Cards */}
        {paginatedProducts.length > 0 ? (
          <div className="block md:hidden space-y-1.5 sm:space-y-2">
            {paginatedProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-card overflow-hidden">
                <div className="p-2 sm:p-3">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-marron-800 text-xs sm:text-sm mb-0.5 truncate">{product.name}</h3>
                          <span className="inline-block px-1.5 py-0.5 bg-kaki-100 text-kaki-700 rounded text-[9px] sm:text-[10px] mb-1">
                            {product.category}
                          </span>
                        </div>
                        <span className="font-bold text-marron-800 text-[10px] sm:text-xs ml-1.5 flex-shrink-0">
                          {product.price.toLocaleString()} FCFA
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-gray-600 line-clamp-2 mb-1.5">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-end space-x-2 pt-1.5 border-t border-gray-100">
                        <button
                          onClick={() => navigate(`/dashboard/produit/${product.id}`)}
                          className="text-blue-600 hover:text-blue-700 text-[10px] sm:text-xs flex items-center space-x-0.5"
                          title="Voir"
                        >
                          <i className="fas fa-eye text-xs"></i>
                          <span className="hidden sm:inline">Voir</span>
                        </button>
                        <button
                          onClick={() => navigate(`/dashboard/produit/${product.id}/modifier`)}
                          className="text-yellow-600 hover:text-yellow-700 text-[10px] sm:text-xs flex items-center space-x-0.5"
                          title="Modifier"
                        >
                          <i className="fas fa-edit text-xs"></i>
                          <span className="hidden sm:inline">Modifier</span>
                        </button>
                        <button
                          className="text-red-600 hover:text-red-700 text-[10px] sm:text-xs flex items-center space-x-0.5"
                          title="Supprimer"
                        >
                          <i className="fas fa-trash text-xs"></i>
                          <span className="hidden sm:inline">Supprimer</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="block md:hidden bg-white rounded-lg shadow-card p-6 text-center text-gray-500">
            <i className="fas fa-box-open text-3xl mb-2"></i>
            <p className="text-sm">Aucun produit trouvé</p>
          </div>
        )}

        {/* Vue Desktop - Tableau */}
        <div className="hidden md:block bg-white rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-marron-700 text-white">
                <tr>
                  <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium uppercase">Produit</th>
                  <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium uppercase">Catégorie</th>
                  <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium uppercase">Prix</th>
                  <th className="px-3 lg:px-4 py-2.5 lg:py-3 text-left text-xs font-medium uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-3 lg:px-4 py-2.5 lg:py-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 md:w-12 object-cover rounded flex-shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-marron-800 text-sm truncate">{product.name}</p>
                            <p className="text-xs text-gray-500 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 lg:px-4 py-2.5 lg:py-3">
                        <span className="px-2 py-1 bg-kaki-100 text-kaki-700 rounded text-xs">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-3 lg:px-4 py-2.5 lg:py-3">
                        <span className="font-semibold text-marron-800 text-sm">
                          {product.price.toLocaleString()} FCFA
                        </span>
                      </td>
                      <td className="px-3 lg:px-4 py-2.5 lg:py-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => navigate(`/dashboard/produit/${product.id}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                            title="Voir"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            onClick={() => navigate(`/dashboard/produit/${product.id}/modifier`)}
                            className="text-yellow-600 hover:text-yellow-700 text-sm"
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            className="text-red-600 hover:text-red-700 text-sm"
                            title="Supprimer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-6 lg:py-8 text-center text-gray-500">
                      <i className="fas fa-box-open text-2xl md:text-3xl mb-2"></i>
                      <p className="text-sm md:text-base">Aucun produit trouvé</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Statistiques */}
          <div className="bg-gray-50 px-3 md:px-4 py-2 md:py-3 border-t flex flex-row items-center justify-between">
            <p className="text-xs md:text-sm text-gray-600">
              Total: <span className="font-semibold">{filteredProducts.length}</span> produit(s)
              {filteredProducts.length > 0 && (
                <span className="ml-2">
                  (Page {currentPage} sur {totalPages})
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Statistiques Mobile */}
        {paginatedProducts.length > 0 && (
          <div className="block md:hidden bg-white rounded-lg shadow-card p-3 mt-3">
            <p className="text-xs text-gray-600 text-center">
              Total: <span className="font-semibold">{filteredProducts.length}</span> produit(s)
              {filteredProducts.length > 0 && (
                <span className="ml-2">
                  (Page {currentPage} sur {totalPages})
                </span>
              )}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        </div>
      </div>
    </DashboardLayout>
  );
}

