import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const featuredProducts = products.slice(0, 3);
  const heroImages = [
    "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/4210863/pexels-photo-4210863.jpeg?auto=compress&cs=tinysrgb&w=1200",
    "https://images.pexels.com/photos/3952035/pexels-photo-3952035.jpeg?auto=compress&cs=tinysrgb&w=1200"
  ];

  return (
    <div>
      {/* Hero Section avec Carousel */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        <Carousel images={heroImages} autoPlay={true} interval={6000} />
        <div className="absolute inset-0 bg-gradient-to-r from-marron-900/70 to-transparent flex items-center">
          <div className="container mx-auto px-4 z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-4">
                Menuiserie Koffi
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 font-light">
                Artisanat d'exception, meubles sur mesure
              </p>
              <p className="text-lg text-white/80 mb-8">
                Plus de 25 ans d'expérience dans l'artisanat du bois. Nous créons des meubles uniques 
                alliant tradition et modernité. Chaque pièce est façonnée avec passion et savoir-faire artisanal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/produits" className="btn-primary inline-block text-center">
                  <i className="fas fa-tools mr-2"></i>
                  Découvrir nos créations
                </Link>
                <Link to="/devis" className="btn-secondary inline-block text-center bg-green-600 hover:bg-green-700">
                  <i className="fas fa-file-invoice mr-2"></i>
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Savoir-faire */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-marron-800 mb-4">
              Notre Savoir-faire
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Un artisanat qui allie tradition et innovation, où chaque détail compte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-kaki-100 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-card">
                <i className="fas fa-hammer text-3xl text-kaki-700"></i>
              </div>
              <h3 className="text-xl font-display font-semibold text-marron-800 mb-2">
                Fait Main
              </h3>
              <p className="text-gray-600">
                Chaque pièce est façonnée à la main par nos artisans expérimentés, 
                garantissant une qualité et une finition exceptionnelles.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-kaki-100 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-card">
                <i className="fas fa-tree text-3xl text-kaki-700"></i>
              </div>
              <h3 className="text-xl font-display font-semibold text-marron-800 mb-2">
                Bois de Qualité
              </h3>
              <p className="text-gray-600">
                Nous sélectionnons uniquement des essences de bois nobles et durables, 
                provenant de forêts gérées durablement.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-kaki-100 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-card">
                <i className="fas fa-ruler-combined text-3xl text-kaki-700"></i>
              </div>
              <h3 className="text-xl font-display font-semibold text-marron-800 mb-2">
                Sur Mesure
              </h3>
              <p className="text-gray-600">
                Chaque meuble est conçu selon vos besoins et vos envies, 
                pour s'adapter parfaitement à votre espace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Produits en vedette */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-marron-800 mb-4">
              Nos Créations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez quelques-unes de nos réalisations artisanales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/produits" className="btn-primary inline-block">
              Voir tous nos produits
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 bg-marron-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-display font-bold mb-4">
            Un projet sur mesure ?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet. Nous vous accompagnons 
            de la conception à la réalisation.
          </p>
          <Link to="/devis" className="btn-secondary inline-block bg-green-600 hover:bg-green-700">
            <i className="fas fa-file-invoice mr-2"></i>
            Demander un devis
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

