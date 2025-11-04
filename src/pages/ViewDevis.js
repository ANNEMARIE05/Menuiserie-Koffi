import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const ViewDevis = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Simuler les données du devis (dans un vrai projet, on récupérerait depuis une API)
  const devis = {
    id: parseInt(id),
    client: 'Jean Dupont',
    telephone: '07 07 85 72 52',
    email: 'jean@example.com',
    address: '123 Rue de la Menuiserie, Abidjan',
    projet: 'Table en chêne',
    description: 'Table artisanale en chêne massif, finition naturelle. Dimensions: 200x100cm.',
    montant: 552500,
    date: '2024-01-15',
    statut: 'En attente',
    produits: [
      { name: 'Table en chêne massif', quantity: 1, price: 552500 }
    ]
  };

  const getStatusBadge = (statut) => {
    const styles = {
      'En attente': 'bg-yellow-100 text-yellow-700',
      'Approuvé': 'bg-green-100 text-green-700',
      'Refusé': 'bg-red-100 text-red-700',
      'Terminé': 'bg-blue-100 text-blue-700'
    };
    return styles[statut] || 'bg-gray-100 text-gray-700';
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-marron-800">
                <i className="fas fa-file-invoice text-kaki-600 mr-2"></i>
                Détails du devis #{devis.id}
              </h1>
              <button
                onClick={() => navigate('/dashboard/devis')}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
              {/* En-tête */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Client</h3>
                  <p className="text-lg font-semibold text-marron-800">{devis.client}</p>
                  <p className="text-sm text-gray-600">{devis.email}</p>
                  <p className="text-sm text-gray-600">{devis.telephone}</p>
                  <p className="text-sm text-gray-600 mt-1">{devis.address}</p>
                </div>
                <div className="text-right">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Statut</h3>
                  <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getStatusBadge(devis.statut)}`}>
                    {devis.statut}
                  </span>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-sm font-medium text-marron-800">{devis.date}</p>
                  </div>
                </div>
              </div>

              {/* Projet */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-marron-800 mb-2">Projet</h3>
                <p className="text-gray-600">{devis.projet}</p>
              </div>

              {/* Description */}
              {devis.description && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-marron-800 mb-2">Description</h3>
                  <p className="text-gray-600">{devis.description}</p>
                </div>
              )}

              {/* Produits */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-marron-800 mb-4">Produits</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Produit</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Quantité</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Prix unitaire</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {devis.produits.map((produit, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3">{produit.name}</td>
                          <td className="px-4 py-3 text-right">{produit.quantity}</td>
                          <td className="px-4 py-3 text-right">{produit.price.toLocaleString()} FCFA</td>
                          <td className="px-4 py-3 text-right font-semibold">
                            {(produit.quantity * produit.price).toLocaleString()} FCFA
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan="3" className="px-4 py-3 text-right font-semibold text-marron-800">
                          Total
                        </td>
                        <td className="px-4 py-3 text-right font-bold text-xl text-marron-800">
                          {devis.montant.toLocaleString()} FCFA
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewDevis;

