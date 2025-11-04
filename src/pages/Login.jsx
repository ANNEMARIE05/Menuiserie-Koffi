import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Login() {
  const [telephone, setTelephone] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [erreur, setErreur] = useState('');
  const [chargement, setChargement] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErreur('');
    setChargement(true);

    // Validation basique
    if (!telephone || !motDePasse) {
      setErreur('Veuillez remplir tous les champs');
      setChargement(false);
      return;
    }

    // Validation du format téléphone (format ivoirien ou international)
    const telephoneRegex = /^(\+225|225|0)?[0-9]{9,10}$/;
    const telephoneNettoye = telephone.replace(/\s/g, '');
    
    if (!telephoneRegex.test(telephoneNettoye)) {
      setErreur('Format de numéro de téléphone invalide');
      setChargement(false);
      return;
    }

    // Simulation de connexion (à remplacer par un vrai appel API)
    // Pour l'instant, on accepte n'importe quelle combinaison pour la démo
    setTimeout(() => {
      // Enregistrer la session
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userPhone', telephoneNettoye);
      localStorage.setItem('userName', 'Koffi');
      
      setChargement(false);
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marron-50 to-kaki-50 flex items-center justify-center py-4 px-3 sm:py-8 sm:px-4 md:py-12 md:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4 sm:space-y-6 md:space-y-8">
        <div className="bg-white shadow-xl rounded-lg p-4 sm:p-6 md:p-8">
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <div className="inline-block bg-kaki-100 p-2 sm:p-3 md:p-4 mb-2 sm:mb-3 md:mb-4 rounded-full shadow-card">
              <i className="fas fa-hammer text-2xl sm:text-3xl md:text-4xl text-kaki-700"></i>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-marron-800 mb-1 sm:mb-2">
              Connexion
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">
              Connectez-vous à votre espace Menuiserie Koffi
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
            {erreur && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-lg flex items-center">
                <i className="fas fa-exclamation-circle mr-2 text-xs sm:text-sm"></i>
                <span className="text-xs sm:text-sm">{erreur}</span>
              </div>
            )}

            <div>
              <label htmlFor="telephone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                <i className="fas fa-phone mr-1 sm:mr-2 text-kaki-600 text-xs sm:text-sm"></i>
                Numéro de téléphone
              </label>
              <input
                id="telephone"
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="07 07 85 72 52"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div>
              <label htmlFor="motDePasse" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                <i className="fas fa-lock mr-1 sm:mr-2 text-kaki-600 text-xs sm:text-sm"></i>
                Mot de passe
              </label>
              <input
                id="motDePasse"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent transition-all duration-300"
                required
              />
            </div>

            <div className="flex flex-row items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-3 w-3 sm:h-4 sm:w-4 text-kaki-600 focus:ring-kaki-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-1 sm:ml-2 block text-xs sm:text-sm text-gray-700">
                  Se souvenir de moi
                </label>
              </div>
              <Link to="#" className="text-xs sm:text-sm text-kaki-600 hover:text-kaki-700">
                Mot de passe oublié?
              </Link>
            </div>

            <button
              type="submit"
              disabled={chargement}
              className="w-full btn-primary py-2 sm:py-2.5 md:py-3 text-sm sm:text-base flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {chargement ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Connexion...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  Se connecter
                </>
              )}
            </button>
          </form>

          <div className="mt-4 sm:mt-5 md:mt-6 text-center">
            <Link to="/" className="text-xs sm:text-sm text-gray-600 hover:text-kaki-600 transition-colors">
              <i className="fas fa-arrow-left mr-1 sm:mr-2"></i>
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};



