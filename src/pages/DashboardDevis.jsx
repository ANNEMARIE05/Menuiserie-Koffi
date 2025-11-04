import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 10;

export default function DashboardDevis() {
  const navigate = useNavigate();
  const [devis, setDevis] = useState([
    {
      id: 1,
      client: 'Jean Dupont',
      telephone: '07 07 85 72 52',
      email: 'jean@example.com',
      projet: 'Table en chêne',
      montant: 552500,
      date: '2024-01-15',
      statut: 'En attente'
    },
    {
      id: 2,
      client: 'Marie Martin',
      telephone: '05 12 34 56 78',
      email: 'marie@example.com',
      projet: 'Armoire normande',
      montant: 780000,
      date: '2024-01-20',
      statut: 'Approuvé'
    },
    {
      id: 3,
      client: 'Pierre Durand',
      telephone: '07 12 34 56 78',
      email: 'pierre@example.com',
      projet: 'Bibliothèque',
      montant: 617500,
      date: '2024-01-22',
      statut: 'En attente'
    },
    {
      id: 4,
      client: 'Sophie Bernard',
      telephone: '05 98 76 54 32',
      email: 'sophie@example.com',
      projet: 'Commode',
      montant: 422500,
      date: '2024-01-25',
      statut: 'Terminé'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('Tous');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDevis = useMemo(() => {
    return filterStatus === 'Tous' 
      ? devis 
      : devis.filter(d => d.statut === filterStatus);
  }, [devis, filterStatus]);

  const totalPages = Math.ceil(filteredDevis.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDevis = filteredDevis.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterStatus]);

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
      <div className="min-h-screen bg-gray-50 py-4 sm:py-6 md:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-marron-800 mb-3 sm:mb-4">
              <i className="fas fa-file-invoice text-kaki-600 mr-2 text-base sm:text-lg md:text-xl"></i>
              Gestion des devis
            </h1>

            {/* Filtres */}
            <div className="bg-white rounded-lg shadow-card p-3 sm:p-4 mb-4 sm:mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                  <label className="text-xs sm:text-sm font-medium text-gray-700">Filtrer par statut:</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-sm sm:text-base"
                  >
                    <option value="Tous">Tous</option>
                    <option value="En attente">En attente</option>
                    <option value="Approuvé">Approuvé</option>
                    <option value="Refusé">Refusé</option>
                    <option value="Terminé">Terminé</option>
                  </select>
                </div>
                <div className="sm:ml-auto">
                  <button className="w-full sm:w-auto px-3 sm:px-4 py-1.5 sm:py-2 bg-kaki-600 hover:bg-kaki-700 text-white rounded-lg transition-colors flex items-center justify-center text-sm sm:text-base">
                    <i className="fas fa-plus mr-2 text-xs sm:text-sm"></i>
                    Nouveau devis
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau des devis */}
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-marron-700 text-white">
                  <tr>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium uppercase">Client</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium uppercase hidden sm:table-cell">Téléphone</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium uppercase">Projet</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium uppercase">Montant</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium uppercase hidden md:table-cell">Date</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium uppercase">Statut</th>
                    <th className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedDevis.length > 0 ? (
                    paginatedDevis.map((devi) => (
                      <tr key={devi.id} className="hover:bg-gray-50">
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div>
                            <p className="font-medium text-marron-800 text-xs sm:text-sm">{devi.client}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500">{devi.email}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500 sm:hidden">{devi.telephone}</p>
                          </div>
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 hidden sm:table-cell">{devi.telephone}</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">{devi.projet}</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <span className="font-semibold text-marron-800 text-xs sm:text-sm">
                            {devi.montant.toLocaleString()} FCFA
                          </span>
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600 hidden md:table-cell">{devi.date}</td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${getStatusBadge(devi.statut)}`}>
                            {devi.statut}
                          </span>
                        </td>
                        <td className="px-2 sm:px-3 md:px-4 py-2 sm:py-3">
                          <div className="flex items-center space-x-1 sm:space-x-2">
                            <button
                              onClick={() => navigate(`/dashboard/devis/${devi.id}`)}
                              className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
                              title="Voir"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button
                              onClick={() => navigate(`/dashboard/devis/${devi.id}/modifier`)}
                              className="text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm"
                              title="Modifier"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
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
                      <td colSpan="7" className="px-4 py-6 sm:py-8 text-center text-gray-500">
                        <i className="fas fa-file-invoice text-2xl sm:text-3xl mb-2"></i>
                        <p className="text-sm sm:text-base">Aucun devis trouvé</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Statistiques */}
            <div className="bg-gray-50 px-2 sm:px-4 py-2 sm:py-3 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <p className="text-xs sm:text-sm text-gray-600">
                Total: <span className="font-semibold">{filteredDevis.length}</span> devis
                {filteredDevis.length > 0 && (
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

