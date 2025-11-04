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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-display font-bold text-marron-800 mb-4">
            <i className="fas fa-list text-kaki-600 mr-2"></i>
            Liste des produits
          </h1>

          {/* Filtres */}
          <div className="bg-white rounded-lg shadow-card p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rechercher
                </label>
                <div className="relative">
                  <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  <input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catégorie
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
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

        {/* Tableau des produits */}
        <div className="bg-white rounded-lg shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-marron-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Produit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Catégorie</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Prix</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedProducts.length > 0 ? (
                  paginatedProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-marron-800">{product.name}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-kaki-100 text-kaki-700 rounded text-sm">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-semibold text-marron-800">
                          {product.price.toLocaleString()} FCFA
                        </span>
                      </td>
                      <td className="px-4 py-3">
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
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      <i className="fas fa-box-open text-3xl mb-2"></i>
                      <p>Aucun produit trouvé</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Statistiques */}
          <div className="bg-gray-50 px-4 py-3 border-t flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Total: <span className="font-semibold">{filteredProducts.length}</span> produit(s)
              {filteredProducts.length > 0 && (
                <span className="ml-2">
                  (Page {currentPage} sur {totalPages})
                </span>
              )}
            </p>
          </div>
        </div>

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

