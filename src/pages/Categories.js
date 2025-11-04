import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { categories } from '../data/products';
import { products } from '../data/products';

const Categories = () => {
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory.trim()) {
      setMessage({ type: 'error', text: 'Veuillez entrer un nom de catégorie' });
      return;
    }

    // Dans un vrai projet, on enverrait à une API
    setMessage({ type: 'success', text: `Catégorie "${newCategory}" ajoutée avec succès !` });
    setNewCategory('');
  };

  const categoryStats = categories.filter(c => c !== 'Tous').map(category => ({
    name: category,
    count: products.filter(p => p.category === category).length
  }));

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-display font-bold text-marron-800 mb-4">
              <i className="fas fa-tags text-kaki-600 mr-2"></i>
              Gestion des catégories
            </h1>
          </div>

          {/* Formulaire d'ajout */}
          <div className="bg-white rounded-lg shadow-card p-6 mb-6">
            <h2 className="text-xl font-display font-bold text-marron-800 mb-4">
              Ajouter une catégorie
            </h2>
            {message.text && (
              <div
                className={`mb-4 p-4 rounded-lg flex items-center ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <i
                  className={`fas ${
                    message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                  } mr-2`}
                ></i>
                <span>{message.text}</span>
              </div>
            )}
            <form onSubmit={handleAddCategory} className="flex gap-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nom de la catégorie"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-kaki-600 hover:bg-kaki-700 text-white rounded-lg transition-colors flex items-center"
              >
                <i className="fas fa-plus mr-2"></i>
                Ajouter
              </button>
            </form>
          </div>

          {/* Liste des catégories */}
          <div className="bg-white rounded-lg shadow-card p-6">
            <h2 className="text-xl font-display font-bold text-marron-800 mb-4">
              Catégories existantes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryStats.map((category, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 hover:bg-kaki-50 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-marron-800">{category.name}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {category.count} produit(s)
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Categories;

