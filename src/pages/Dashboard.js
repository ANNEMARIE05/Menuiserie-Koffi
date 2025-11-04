import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { products } from '../data/products';

const Dashboard = () => {
  // Statistiques
  const totalProduits = products.length;
  const categories = [...new Set(products.map(p => p.category))];
  const totalCategories = categories.length;
  const prixMoyen = Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length);

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-card p-6 border-l-4 border-kaki-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Produits</p>
                <p className="text-3xl font-bold text-marron-800 mt-2">{totalProduits}</p>
              </div>
              <div className="bg-kaki-100 p-4 rounded-full">
                <i className="fas fa-box text-2xl text-kaki-700"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-6 border-l-4 border-marron-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Catégories</p>
                <p className="text-3xl font-bold text-marron-800 mt-2">{totalCategories}</p>
              </div>
              <div className="bg-marron-100 p-4 rounded-full">
                <i className="fas fa-tags text-2xl text-marron-700"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Prix Moyen</p>
                <p className="text-3xl font-bold text-marron-800 mt-2">{prixMoyen.toLocaleString()} FCFA</p>
              </div>
              <div className="bg-green-100 p-4 rounded-full">
                <i className="fas fa-money-bill-wave text-2xl text-green-700"></i>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-card p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Commandes</p>
                <p className="text-3xl font-bold text-marron-800 mt-2">--</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <i className="fas fa-shopping-cart text-2xl text-blue-700"></i>
              </div>
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <h2 className="text-xl font-display font-bold text-marron-800 mb-4">
            <i className="fas fa-bolt text-kaki-600 mr-2"></i>
            Actions rapides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/produits"
              className="flex items-center space-x-3 p-4 bg-kaki-50 hover:bg-kaki-100 rounded-lg transition-colors"
            >
              <i className="fas fa-box text-2xl text-kaki-700"></i>
              <div>
                <p className="font-semibold text-marron-800">Voir les produits</p>
                <p className="text-sm text-gray-600">Gérer le catalogue</p>
              </div>
            </Link>
            <Link
              to="/devis"
              className="flex items-center space-x-3 p-4 bg-marron-50 hover:bg-marron-100 rounded-lg transition-colors"
            >
              <i className="fas fa-file-invoice text-2xl text-marron-700"></i>
              <div>
                <p className="font-semibold text-marron-800">Nouveau devis</p>
                <p className="text-sm text-gray-600">Créer un devis</p>
              </div>
            </Link>
            <Link
              to="/contact"
              className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <i className="fas fa-envelope text-2xl text-blue-700"></i>
              <div>
                <p className="font-semibold text-marron-800">Contact</p>
                <p className="text-sm text-gray-600">Messages clients</p>
              </div>
            </Link>
          </div>
        </div>

        {/* Catégories de produits */}
        <div className="bg-white rounded-lg shadow-card p-6 mb-8">
          <h2 className="text-xl font-display font-bold text-marron-800 mb-4">
            <i className="fas fa-tags text-kaki-600 mr-2"></i>
            Catégories de produits
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => {
              const produitsParCategorie = products.filter(p => p.category === category).length;
              return (
                <div
                  key={index}
                  className="p-4 bg-gray-50 hover:bg-kaki-50 rounded-lg transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-marron-800">{category}</p>
                  <p className="text-sm text-gray-600 mt-1">{produitsParCategorie} produit(s)</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Liste des produits récents */}
        <div className="bg-white rounded-lg shadow-card p-6">
          <h2 className="text-xl font-display font-bold text-marron-800 mb-4">
            <i className="fas fa-list text-kaki-600 mr-2"></i>
            Produits récents
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Produit</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Catégorie</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Prix</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span className="font-medium text-marron-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-marron-800">
                      {product.price.toLocaleString()} FCFA
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        to={`/produit/${product.id}`}
                        className="text-kaki-600 hover:text-kaki-700 text-sm"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

