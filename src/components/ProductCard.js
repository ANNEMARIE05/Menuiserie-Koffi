import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/produit/${product.id}`} className="block">
      <div className="card overflow-hidden group">
        <div className="relative h-44 sm:h-48 md:h-56 lg:h-64 overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/8a7658/ffffff?text=${encodeURIComponent(product.name)}`;
            }}
          />
          <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 bg-marron-600 text-white px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold shadow-card">
            {product.price.toLocaleString('fr-FR')} FCFA
          </div>
        </div>
        <div className="p-3 sm:p-4 md:p-6">
          <div className="flex items-center justify-between mb-1.5 sm:mb-2">
            <span className="text-kaki-600 text-xs sm:text-sm font-medium uppercase tracking-wide">
              {product.category}
            </span>
            <i className="fas fa-arrow-right text-marron-600 group-hover:translate-x-1 transition-transform text-xs sm:text-sm md:text-base"></i>
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-display font-semibold text-marron-800 mb-1 sm:mb-2 group-hover:text-marron-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2 sm:mb-3 md:mb-4">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-1 sm:gap-1.5 md:gap-2">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs bg-kaki-100 text-kaki-700 px-1.5 sm:px-2 py-0.5 sm:py-1 font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

