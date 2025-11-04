import React, { useState } from 'react';
import { openWhatsAppDevis } from '../utils/whatsapp';

export default function Contact() {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formulaireEnvoye, setFormulaireEnvoye] = useState(false);

  const gererChangement = (e) => {
    setDonneesFormulaire({
      ...donneesFormulaire,
      [e.target.name]: e.target.value
    });
  };

  const gererSoumission = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour envoyer le formulaire
    // Pour l'instant, on redirige vers WhatsApp avec les informations
    const message = `Bonjour, je suis ${donneesFormulaire.name}.\n\nSujet: ${donneesFormulaire.subject}\n\nMessage: ${donneesFormulaire.message}\n\nContact: ${donneesFormulaire.phone || donneesFormulaire.email}`;
    const numeroTelephone = '2250707857252';
    const messageEncode = encodeURIComponent(message);
    const urlWhatsApp = `https://wa.me/${numeroTelephone}?text=${messageEncode}`;
    window.open(urlWhatsApp, '_blank');
    setFormulaireEnvoye(true);
  };

  return (
    <div className="py-6 md:py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-marron-800 mb-3 md:mb-4">
              Contactez-nous
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
              Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter !
            </p>
          </div>

          {/* Informations de contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            <div className="bg-white shadow-card p-4 md:p-6 text-center">
              <div className="bg-kaki-100 w-12 h-12 md:w-16 md:h-16 rounded-sm flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-phone text-xl md:text-2xl text-kaki-700"></i>
              </div>
              <h3 className="text-base md:text-lg font-display font-semibold text-marron-800 mb-2">
                Téléphone
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                <a href="tel:+2250707857252" className="hover:text-marron-600">
                  07 07 85 72 52
                </a>
              </p>
            </div>

            <div className="bg-white shadow-card p-4 md:p-6 text-center">
              <div className="bg-kaki-100 w-12 h-12 md:w-16 md:h-16 rounded-sm flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fab fa-whatsapp text-xl md:text-2xl text-kaki-700"></i>
              </div>
              <h3 className="text-base md:text-lg font-display font-semibold text-marron-800 mb-2">
                WhatsApp
              </h3>
              <p className="text-sm md:text-base text-gray-600">
                <a href="https://wa.me/2250707857252" target="_blank" rel="noopener noreferrer" className="hover:text-marron-600">
                  Chat direct
                </a>
              </p>
            </div>

            <div className="bg-white shadow-card p-4 md:p-6 text-center">
              <div className="bg-kaki-100 w-12 h-12 md:w-16 md:h-16 rounded-sm flex items-center justify-center mx-auto mb-3 md:mb-4">
                <i className="fas fa-map-marker-alt text-xl md:text-2xl text-kaki-700"></i>
              </div>
              <h3 className="text-base md:text-lg font-display font-semibold text-marron-800 mb-2">
                Adresse
              </h3>
              <p className="text-xs md:text-sm text-gray-600">
                Koumassi 05<br />
                Derrière le lycée municipal
              </p>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="bg-white shadow-card p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-display font-bold text-marron-800 mb-4 md:mb-6">
              Envoyez-nous un message
            </h2>

            {formulaireEnvoye ? (
              <div className="bg-green-50 border border-green-200 p-4 md:p-6 rounded mb-6">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-green-600 text-xl md:text-2xl mr-3 md:mr-4"></i>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-green-800 mb-1">
                      Message envoyé avec succès !
                    </h3>
                    <p className="text-sm md:text-base text-green-700">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </div>
                </div>
              </div>
            ) : null}

            <form onSubmit={gererSoumission} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={donneesFormulaire.name}
                    onChange={gererChangement}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={donneesFormulaire.phone}
                    onChange={gererChangement}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent text-sm md:text-base"
                    placeholder="07 07 85 72 52"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={donneesFormulaire.email}
                  onChange={gererChangement}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent text-sm md:text-base"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                  Sujet *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={donneesFormulaire.subject}
                  onChange={gererChangement}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Objet de votre message"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows="5"
                  value={donneesFormulaire.message}
                  onChange={gererChangement}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent resize-none text-sm md:text-base"
                  placeholder="Votre message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn-primary w-full md:w-auto text-sm md:text-base"
              >
                <i className="fas fa-paper-plane mr-2"></i>
                Envoyer le message
              </button>
            </form>
          </div>
        </div>

        {/* Section CTA */}
        <div className="bg-marron-700 text-white p-6 md:p-12 text-center shadow-card mt-8 md:mt-12">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 md:mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis gratuit
          </p>
          <button
            onClick={openWhatsAppDevis}
            className="btn-secondary bg-green-600 hover:bg-green-700 text-sm md:text-base"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Demander un devis sur WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

