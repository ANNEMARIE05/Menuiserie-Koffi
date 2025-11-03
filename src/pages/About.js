import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="bg-white shadow-card p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-block bg-kaki-100 p-6 mb-6 shadow-card">
                <i className="fas fa-hammer text-5xl text-kaki-700"></i>
              </div>
              <h1 className="text-5xl font-display font-bold text-marron-800 mb-4">
                Menuiserie Koffi
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Plus de 25 ans d'expérience dans l'artisanat du bois
              </p>
            </div>
          </div>
        </section>

        {/* Notre Histoire */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-marron-800 mb-6">
                Notre Histoire
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Menuiserie Koffi est née de la passion pour l'artisanat du bois et d'un savoir-faire 
                  transmis de génération en génération. Avec plus de 25 ans d'expérience, nous avons 
                  su allier tradition et modernité pour créer des meubles uniques et durables.
                </p>
                <p>
                  Notre atelier situé à Koumassi 05, juste derrière le lycée municipal de Koumassi, est le cœur de notre activité. C'est ici que 
                  chaque pièce prend vie, façonnée avec soin et attention par nos artisans expérimentés. 
                  Nous travaillons uniquement avec des essences de bois de qualité, sélectionnées 
                  pour leur beauté et leur résistance.
                </p>
                <p>
                  Que ce soit pour un meuble sur mesure, une rénovation ou une création originale, 
                  nous mettons notre expertise à votre service pour réaliser vos projets avec 
                  passion et professionnalisme.
                </p>
              </div>
            </div>
            <div className="bg-white shadow-card p-8">
              <img
                src="https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Atelier de menuiserie"
                className="w-full h-auto shadow-card"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/8a7658/ffffff?text=Atelier+Menuiserie';
                }}
              />
            </div>
          </div>
        </section>

        {/* Nos Valeurs */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-marron-800 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ce qui guide notre travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-card p-8 text-center">
              <div className="bg-kaki-100 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-card">
                <i className="fas fa-hand-holding-heart text-3xl text-kaki-700"></i>
              </div>
              <h3 className="text-xl font-display font-semibold text-marron-800 mb-3">
                Passion
              </h3>
              <p className="text-gray-600">
                Chaque projet est une nouvelle aventure créative. Nous mettons notre passion 
                dans chaque détail pour créer des meubles qui vous ressemblent.
              </p>
            </div>

            <div className="bg-white shadow-card p-8 text-center">
              <div className="bg-kaki-100 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-card">
                <i className="fas fa-award text-3xl text-kaki-700"></i>
              </div>
              <h3 className="text-xl font-display font-semibold text-marron-800 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                Plus de 25 ans d'expérience garantissent un savoir-faire irréprochable et 
                une finition soignée dans chaque réalisation.
              </p>
            </div>

            <div className="bg-white shadow-card p-8 text-center">
              <div className="bg-kaki-100 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-card">
                <i className="fas fa-users text-3xl text-kaki-700"></i>
              </div>
              <h3 className="text-xl font-display font-semibold text-marron-800 mb-3">
                Proximité
              </h3>
              <p className="text-gray-600">
                Nous sommes à l'écoute de vos besoins et vous accompagnons de la conception 
                à la livraison de votre projet.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="mb-16">
          <div className="bg-marron-700 text-white p-12 shadow-card">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-4">
                Nos Services
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Tout ce que nous pouvons faire pour vous
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <i className="fas fa-ruler-combined text-3xl text-kaki-300 mb-4"></i>
                <h3 className="text-lg font-display font-semibold mb-2">Sur Mesure</h3>
                <p className="text-white/90 text-sm">
                  Création de meubles adaptés à vos dimensions et à vos besoins
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <i className="fas fa-truck text-3xl text-kaki-300 mb-4"></i>
                <h3 className="text-lg font-display font-semibold mb-2">Livraison</h3>
                <p className="text-white/90 text-sm">
                  Service de livraison disponible pour tous nos produits
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <i className="fas fa-tools text-3xl text-kaki-300 mb-4"></i>
                <h3 className="text-lg font-display font-semibold mb-2">Rénovation</h3>
                <p className="text-white/90 text-sm">
                  Restauration et rénovation de vos meubles anciens
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm p-6 border border-white/20">
                <i className="fas fa-lightbulb text-3xl text-kaki-300 mb-4"></i>
                <h3 className="text-lg font-display font-semibold mb-2">Conseil</h3>
                <p className="text-white/90 text-sm">
                  Accompagnement personnalisé dans vos projets
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Localisation */}
        <section className="mb-16">
          <div className="bg-white shadow-card p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-display font-bold text-marron-800 mb-6">
                  Notre Atelier
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <i className="fas fa-map-marker-alt text-2xl text-kaki-600 mt-1"></i>
                    <div>
                      <h3 className="font-display font-semibold text-marron-800 mb-1">
                        Adresse
                      </h3>
                      <p className="text-gray-700">
                        Koumassi 05, juste derrière le lycée municipal de Koumassi<br />
                        Abidjan, Côte d'Ivoire
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <i className="fas fa-clock text-2xl text-kaki-600 mt-1"></i>
                    <div>
                      <h3 className="font-display font-semibold text-marron-800 mb-1">
                        Horaires
                      </h3>
                      <p className="text-gray-700">
                        Lundi - Vendredi : 8h00 - 18h00<br />
                        Samedi : 9h00 - 15h00<br />
                        Dimanche : Sur rendez-vous
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
              <Link to="/devis" className="btn-primary inline-block">
                <i className="fas fa-file-invoice mr-2"></i>
                Demander un devis
              </Link>
                </div>
              </div>

              <div className="bg-gray-200 h-64 flex items-center justify-center">
                <i className="fas fa-map-marked-alt text-6xl text-gray-400"></i>
                {/* Ici vous pouvez ajouter une carte Google Maps si nécessaire */}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="bg-kaki-600 text-white p-12 text-center shadow-card">
            <h2 className="text-4xl font-display font-bold mb-4">
              Prêt à concrétiser votre projet ?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/devis" className="btn-primary bg-white text-marron-700 hover:bg-gray-100">
                <i className="fas fa-file-invoice mr-2"></i>
                Demander un devis
              </Link>
              <Link to="/contact" className="btn-secondary bg-green-600 hover:bg-green-700">
                <i className="fab fa-whatsapp mr-2"></i>
                Nous contacter
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;

