import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Link to={`/produit/${product.id}`} className="block">
      <div className="card overflow-hidden group">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/400x300/8a7658/ffffff?text=${encodeURIComponent(product.name)}`;
            }}
          />
          <div className="absolute top-4 right-4 bg-marron-600 text-white px-3 py-1 text-sm font-semibold shadow-card">
            {product.price.toLocaleString('fr-FR')} FCFA
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-kaki-600 text-sm font-medium uppercase tracking-wide">
              {product.category}
            </span>
            <i className="fas fa-arrow-right text-marron-600 group-hover:translate-x-1 transition-transform"></i>
          </div>
          <h3 className="text-xl font-display font-semibold text-marron-800 mb-2 group-hover:text-marron-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {product.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 2).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs bg-kaki-100 text-kaki-700 px-2 py-1 font-medium"
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

