import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userPhone, setUserPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier l'authentification
    const auth = localStorage.getItem('isAuthenticated');
    const phone = localStorage.getItem('userPhone');
    const name = localStorage.getItem('userName');

    if (auth === 'true' && phone) {
      setIsAuthenticated(true);
      setUserPhone(phone);
      setUserName(name || 'Utilisateur');
    } else {
      navigate('/login');
    }
  }, [navigate]);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAddress');
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header du Dashboard */}
        <div className="bg-marron-700 text-white shadow-lg sticky top-0 z-30">
          <div className="px-2 sm:px-4 py-2 sm:py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden text-white hover:text-kaki-300 transition-colors"
                >
                  <i className="fas fa-bars text-lg sm:text-xl"></i>
                </button>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 dropdown-container relative">
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-marron-600 hover:bg-marron-500 rounded-lg transition-colors text-sm sm:text-base"
                    title={userName || 'Koffi'}
                  >
                    <i className="fas fa-user-circle text-lg sm:text-xl"></i>
                    <span className="hidden sm:inline">{userName || 'Koffi'}</span>
                    <i className={`fas fa-chevron-down text-xs transition-transform ${dropdownOpen ? 'rotate-180' : ''} hidden sm:inline`}></i>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg py-1 sm:py-2 z-50 border border-gray-200">
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          navigate('/dashboard/profil');
                        }}
                        className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2 text-sm sm:text-base"
                      >
                        <i className="fas fa-user text-kaki-600 w-4 text-xs sm:text-sm"></i>
                        <span>Profil</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-red-600 hover:bg-red-50 flex items-center space-x-2 text-sm sm:text-base"
                      >
                        <i className="fas fa-sign-out-alt w-4 text-xs sm:text-sm"></i>
                        <span>Déconnexion</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

