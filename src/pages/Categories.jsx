import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { categories } from '../data/products';
import { products } from '../data/products';

export default function Categories() {
  const [newCategory, setNewCategory] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  // Fermer le modal avec la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && editingCategory) {
        setEditingCategory(null);
        setEditCategoryName('');
        setMessage({ type: '', text: '' });
      }
    };

    if (editingCategory) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [editingCategory]);

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

  const handleEditCategory = (categoryName) => {
    setEditingCategory(categoryName);
    setEditCategoryName(categoryName);
    setMessage({ type: '', text: '' });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editCategoryName.trim()) {
      setMessage({ type: 'error', text: 'Veuillez entrer un nom de catégorie' });
      return;
    }

    if (editCategoryName === editingCategory) {
      setEditingCategory(null);
      setEditCategoryName('');
      return;
    }

    // Vérifier si la nouvelle catégorie existe déjà
    if (categories.includes(editCategoryName) && editCategoryName !== editingCategory) {
      setMessage({ type: 'error', text: 'Cette catégorie existe déjà' });
      return;
    }

    // Dans un vrai projet, on enverrait à une API pour mettre à jour la catégorie
    // et tous les produits associés
    
    // Ici, on simule la mise à jour
    setMessage({ 
      type: 'success', 
      text: `Catégorie "${editingCategory}" modifiée en "${editCategoryName}" avec succès !` 
    });
    
    // Fermer le modal après un court délai pour permettre de voir le message
    setTimeout(() => {
      setEditingCategory(null);
      setEditCategoryName('');
    }, 1500);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setEditCategoryName('');
    setMessage({ type: '', text: '' });
  };

  const categoryStats = categories.filter(c => c !== 'Tous').map(category => ({
    name: category,
    count: products.filter(p => p.category === category).length
  }));

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-marron-800 mb-2 sm:mb-4">
              <i className="fas fa-tags text-kaki-600 mr-1 sm:mr-2 text-sm sm:text-base md:text-lg"></i>
              Gestion des catégories
            </h1>
          </div>

          {/* Formulaire d'ajout */}
          <div className="bg-white rounded-lg shadow-card p-3 sm:p-4 md:p-6 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg md:text-xl font-display font-bold text-marron-800 mb-3 sm:mb-4">
              Ajouter une catégorie
            </h2>
            {message.text && (
              <div
                className={`mb-3 sm:mb-4 p-2 sm:p-3 md:p-4 rounded-lg flex items-center text-xs sm:text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <i
                  className={`fas ${
                    message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                  } mr-1 sm:mr-2 text-xs sm:text-sm`}
                ></i>
                <span>{message.text}</span>
              </div>
            )}
            <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nom de la catégorie"
                className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 sm:py-3 bg-kaki-600 hover:bg-kaki-700 text-white text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center"
              >
                <i className="fas fa-plus mr-1 sm:mr-2 text-xs sm:text-sm"></i>
                Ajouter
              </button>
            </form>
          </div>

          {/* Liste des catégories */}
          <div className="bg-white rounded-lg shadow-card p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg md:text-xl font-display font-bold text-marron-800 mb-3 sm:mb-4">
              Catégories existantes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              {categoryStats.map((category, index) => (
                <div
                  key={index}
                  className="p-2 sm:p-3 md:p-4 bg-gray-50 hover:bg-kaki-50 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm sm:text-base text-marron-800 truncate">{category.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
                        {category.count} produit(s)
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 ml-2 flex-shrink-0">
                      <button
                        onClick={() => handleEditCategory(category.name)}
                        className="text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm transition-colors"
                        title="Modifier"
                      >
                        <i className="fas fa-edit text-xs sm:text-sm"></i>
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700 text-xs sm:text-sm transition-colors"
                        title="Supprimer"
                      >
                        <i className="fas fa-trash text-xs sm:text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de modification */}
      {editingCategory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleCancelEdit}
        >
          <div 
            className="bg-white rounded-lg shadow-xl max-w-md w-full p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg sm:text-xl font-display font-bold text-marron-800">
                <i className="fas fa-edit text-kaki-600 mr-2"></i>
                Modifier la catégorie
              </h2>
              <button
                onClick={handleCancelEdit}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <i className="fas fa-times text-lg sm:text-xl"></i>
              </button>
            </div>

            {message.text && (
              <div
                className={`mb-4 p-3 rounded-lg flex items-center text-xs sm:text-sm ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <i
                  className={`fas ${
                    message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                  } mr-2 text-xs sm:text-sm`}
                ></i>
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSaveEdit}>
              <div className="mb-4">
                <label className="block text-sm sm:text-base font-medium text-marron-800 mb-2">
                  Nom de la catégorie
                </label>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  placeholder="Nom de la catégorie"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
                  autoFocus
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-times mr-1 sm:mr-2 text-xs sm:text-sm"></i>
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-kaki-600 hover:bg-kaki-700 text-white text-sm sm:text-base rounded-lg transition-colors flex items-center justify-center"
                >
                  <i className="fas fa-check mr-1 sm:mr-2 text-xs sm:text-sm"></i>
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}

