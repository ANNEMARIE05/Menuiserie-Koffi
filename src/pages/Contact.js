import React, { useState } from 'react';
import { openWhatsApp, openWhatsAppDevis } from '../utils/whatsapp';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique pour envoyer le formulaire
    // Pour l'instant, on redirige vers WhatsApp avec les informations
    const message = `Bonjour, je suis ${formData.name}.\n\nSujet: ${formData.subject}\n\nMessage: ${formData.message}\n\nContact: ${formData.phone || formData.email}`;
    const phoneNumber = '2250707857252';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setFormSubmitted(true);
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-bold text-marron-800 mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white shadow-card p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-kaki-100 p-3 shadow-card">
                  <i className="fas fa-map-marker-alt text-kaki-700 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-marron-800 mb-1">
                    Adresse
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Koumassi 05, juste derrière le lycée municipal de Koumassi<br />
                    Abidjan, Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-card p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-kaki-100 p-3 shadow-card">
                  <i className="fab fa-whatsapp text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-marron-800 mb-1">
                    WhatsApp
                  </h3>
                  <a
                    href="https://wa.me/2250707857252"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-kaki-600 hover:text-kaki-700 text-sm"
                  >
                    07 07 85 72 52
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white shadow-card p-6">
              <div className="flex items-start space-x-4 mb-4">
                <div className="bg-kaki-100 p-3 shadow-card">
                  <i className="fas fa-clock text-kaki-700 text-xl"></i>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-marron-800 mb-1">
                    Horaires
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Lun - Ven : 8h00 - 18h00<br />
                    Samedi : 9h00 - 15h00<br />
                    Dimanche : Sur RDV
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton WhatsApp direct */}
            <div className="bg-green-600 text-white p-6 shadow-card">
              <h3 className="font-display font-semibold mb-3 text-lg">
                Contact rapide
              </h3>
              <p className="text-white/90 text-sm mb-4">
                Écrivez-nous directement sur WhatsApp pour une réponse rapide
              </p>
              <button
                onClick={openWhatsAppDevis}
                className="w-full bg-white text-green-600 px-6 py-3 font-semibold hover:bg-gray-100 transition-colors shadow-card"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Ouvrir WhatsApp
              </button>
            </div>
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-card p-8">
              <h2 className="text-3xl font-display font-bold text-marron-800 mb-6">
                Envoyez-nous un message
              </h2>

              {formSubmitted ? (
                <div className="bg-green-50 border border-green-200 p-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                    <div>
                      <h3 className="font-semibold text-green-800 mb-1">
                        Message envoyé !
                      </h3>
                      <p className="text-green-700 text-sm">
                        Vous allez être redirigé vers WhatsApp pour finaliser votre demande.
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-marron-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-marron-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                      placeholder="07 07 85 72 52"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-marron-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-marron-700 mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="devis">Demande de devis</option>
                    <option value="commande">Commande sur mesure</option>
                    <option value="renovation">Rénovation</option>
                    <option value="livraison">Livraison</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-marron-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button type="submit" className="btn-primary flex-1">
                    <i className="fas fa-paper-plane mr-2"></i>
                    Envoyer le message
                  </button>
                  <button
                    type="button"
                    onClick={openWhatsAppDevis}
                    className="btn-secondary bg-green-600 hover:bg-green-700 flex-1"
                  >
                    <i className="fab fa-whatsapp mr-2"></i>
                    Via WhatsApp
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="bg-marron-700 text-white p-12 text-center shadow-card">
          <h2 className="text-3xl font-display font-bold mb-4">
            Besoin d'un devis personnalisé ?
          </h2>
          <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et obtenir un devis gratuit
          </p>
          <button
            onClick={openWhatsAppDevis}
            className="btn-secondary bg-green-600 hover:bg-green-700"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Demander un devis sur WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;

