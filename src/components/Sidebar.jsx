import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Sidebar({ isOpen, onClose }) {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      icon: 'fas fa-tachometer-alt',
      label: 'Dashboard',
      exact: true
    },
    {
      path: '/dashboard/ajouter',
      icon: 'fas fa-plus-circle',
      label: 'Ajouter produit'
    },
    {
      path: '/dashboard/liste-produits',
      icon: 'fas fa-list',
      label: 'Liste produit'
    },
    {
      path: '/dashboard/categories',
      icon: 'fas fa-tags',
      label: 'Catégorie'
    }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-marron-800 text-white z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:h-full lg:z-auto w-64 shadow-lg`}
      >
        <div className="flex flex-col h-full">
          {/* Header Sidebar */}
          <div className="flex items-center justify-between p-3 sm:p-4 border-b border-marron-700">
            <div className="flex items-center space-x-2">
              <i className="fas fa-hammer text-lg sm:text-xl text-kaki-300"></i>
              <span className="font-display font-bold text-base sm:text-lg">Menuiserie Koffi</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden text-gray-300 hover:text-white transition-colors"
            >
              <i className="fas fa-times text-lg sm:text-xl"></i>
            </button>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto py-2 sm:py-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={`flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 mx-1.5 sm:mx-2 mb-1.5 sm:mb-2 rounded-lg transition-all duration-200 ${
                  isActive(item.path, item.exact)
                    ? 'bg-kaki-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-marron-700 hover:text-white'
                }`}
              >
                <i className={`${item.icon} w-4 sm:w-5 text-center text-sm sm:text-base`}></i>
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer Sidebar */}
          <div className="p-3 sm:p-4 border-t border-marron-700">
            <p className="text-[10px] sm:text-xs text-gray-400 text-center">
              © 2024 Menuiserie Koffi
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

