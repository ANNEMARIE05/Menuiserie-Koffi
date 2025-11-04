import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { products } from '../data/products';

export default function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-marron-800 mb-4">
              Produit non trouvé
            </h2>
            <button
              onClick={() => navigate('/dashboard/liste-produits')}
              className="px-6 py-3 bg-kaki-600 hover:bg-kaki-700 text-white rounded-lg transition-colors"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-2 sm:py-4 md:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="mb-2 sm:mb-4 md:mb-6 flex flex-row items-center justify-between gap-2 sm:gap-0">
            <h1 className="text-base sm:text-xl md:text-3xl font-display font-bold text-marron-800">
              <i className="fas fa-eye text-kaki-600 mr-1.5 sm:mr-2 text-sm sm:text-lg md:text-xl"></i>
              Détails du produit
            </h1>
            <button
              onClick={() => navigate('/dashboard/liste-produits')}
              className="px-2 sm:px-4 py-1 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-base whitespace-nowrap"
            >
              Retour
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4 md:gap-6 p-2 sm:p-4 md:p-6">
              {/* Images */}
              <div>
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 sm:h-64 md:h-96 object-cover rounded-lg"
                  />
                </div>
                {product.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-1 sm:gap-1.5 md:gap-2">
                    {product.images.slice(1).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${product.name} ${index + 2}`}
                        className="w-full h-12 sm:h-16 md:h-20 object-cover rounded cursor-pointer hover:opacity-75"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Informations */}
              <div>
                <div className="mb-2 sm:mb-3 md:mb-4">
                  <span className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-kaki-100 text-kaki-700 rounded text-[10px] sm:text-xs md:text-sm font-medium">
                    {product.category}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl md:text-3xl font-display font-bold text-marron-800 mb-2 sm:mb-3 md:mb-4">
                  {product.name}
                </h2>
                <div className="mb-3 sm:mb-4 md:mb-6">
                  <span className="text-lg sm:text-xl md:text-3xl font-bold text-marron-700">
                    {product.price.toLocaleString()} FCFA
                  </span>
                </div>

                {product.dimension && (
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-marron-800 mb-1 sm:mb-1.5 md:mb-2">Dimensions</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{product.dimension}</p>
                  </div>
                )}

                <div className="mb-3 sm:mb-4 md:mb-6">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-marron-800 mb-1 sm:mb-1.5 md:mb-2">Description courte</h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">{product.description}</p>
                </div>

                {product.longDescription && (
                  <div className="mb-3 sm:mb-4 md:mb-6">
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-marron-800 mb-1 sm:mb-1.5 md:mb-2">Description longue</h3>
                    <p className="text-xs sm:text-sm md:text-base text-gray-600">{product.longDescription}</p>
                  </div>
                )}

                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-semibold text-marron-800 mb-1 sm:mb-1.5 md:mb-2">Caractéristiques</h3>
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
                      {product.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded text-[10px] sm:text-xs md:text-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

