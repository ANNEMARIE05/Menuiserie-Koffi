import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import { products } from '../data/products';
import { openWhatsApp } from '../utils/whatsapp';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-display font-bold text-marron-800 mb-4">
          Produit non trouvé
        </h2>
        <button onClick={() => navigate('/produits')} className="btn-primary">
          Retour aux produits
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <button onClick={() => navigate('/')} className="hover:text-marron-600">
                Accueil
              </button>
            </li>
            <li><i className="fas fa-chevron-right text-xs"></i></li>
            <li>
              <button onClick={() => navigate('/produits')} className="hover:text-marron-600">
                Produits
              </button>
            </li>
            <li><i className="fas fa-chevron-right text-xs"></i></li>
            <li className="text-marron-700 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="bg-white shadow-card mb-4 h-[500px]">
              <Carousel images={product.images} autoPlay={false} />
            </div>
            
            {/* Miniatures */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`bg-white shadow-card overflow-hidden h-24 border-2 transition-all ${
                      selectedImageIndex === index
                        ? 'border-marron-600'
                        : 'border-transparent hover:border-marron-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Vue ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/200x150/8a7658/ffffff?text=Vue+${index + 1}`;
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informations */}
          <div>
            <div className="bg-white shadow-card p-8">
              <div className="mb-4">
                <span className="text-kaki-600 text-sm font-semibold uppercase tracking-wide">
                  {product.category}
                </span>
              </div>
              
              <h1 className="text-4xl font-display font-bold text-marron-800 mb-4">
                {product.name}
              </h1>

              <div className="mb-6">
                <span className="text-4xl font-bold text-marron-700">
                  {product.price.toLocaleString('fr-FR')} FCFA
                </span>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-display font-semibold text-marron-800 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {product.longDescription}
                </p>
                <p className="text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-display font-semibold text-marron-800 mb-3">
                  Caractéristiques
                </h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <i className="fas fa-check-circle text-kaki-600 mr-2"></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openWhatsApp(product.name, product.price.toLocaleString('fr-FR') + ' FCFA')}
                  className="btn-primary flex-1 bg-green-600 hover:bg-green-700"
                >
                  <i className="fab fa-whatsapp mr-2"></i>
                  Acheter sur WhatsApp
                </button>
                <Link to="/devis" className="btn-secondary flex-1 text-center">
                  <i className="fas fa-file-invoice mr-2"></i>
                  Demander un devis
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <i className="fas fa-shipping-fast text-kaki-600 mr-2"></i>
                    <span>Livraison sur mesure</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-shield-alt text-kaki-600 mr-2"></i>
                    <span>Garantie artisan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section produits similaires */}
        <div className="mt-16">
          <h2 className="text-3xl font-display font-bold text-marron-800 mb-8">
            Produits similaires
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map((similarProduct) => (
                <div
                  key={similarProduct.id}
                  onClick={() => navigate(`/produit/${similarProduct.id}`)}
                  className="card overflow-hidden cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={similarProduct.images[0]}
                      alt={similarProduct.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/400x300/8a7658/ffffff?text=${encodeURIComponent(similarProduct.name)}`;
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-marron-800 mb-1">
                      {similarProduct.name}
                    </h3>
                    <p className="text-marron-600 font-bold">
                      {similarProduct.price.toLocaleString('fr-FR')} FCFA
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

