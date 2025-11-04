import React, { useState } from 'react';
import { products } from '../data/products';
import { openWhatsApp } from '../utils/whatsapp';

export default function Devis() {
  const [donneesFormulaire, setDonneesFormulaire] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    projectType: '',
    dimension: '',
    description: '',
    selectedProducts: [],
    customImages: []
  });

  const [idsProduitsSelectionnes, setIdsProduitsSelectionnes] = useState([]);
  const [apercusImages, setApercusImages] = useState([]);

  const gererChangement = (e) => {
    setDonneesFormulaire({
      ...donneesFormulaire,
      [e.target.name]: e.target.value
    });
  };

  const gererSelectionProduit = (idProduit) => {
    const nouveauxSelectionnes = idsProduitsSelectionnes.includes(idProduit)
      ? idsProduitsSelectionnes.filter(id => id !== idProduit)
      : [...idsProduitsSelectionnes, idProduit];
    
    setIdsProduitsSelectionnes(nouveauxSelectionnes);
    setDonneesFormulaire({
      ...donneesFormulaire,
      selectedProducts: products.filter(p => nouveauxSelectionnes.includes(p.id))
    });
  };

  const gererUploadImage = (e) => {
    const fichiers = Array.from(e.target.files);
    const nouveauxApercus = [];
    
    fichiers.forEach(fichier => {
      if (fichier.type.startsWith('image/')) {
        const lecteur = new FileReader();
        lecteur.onloadend = () => {
          nouveauxApercus.push({
            name: fichier.name,
            url: lecteur.result
          });
          if (nouveauxApercus.length === fichiers.length) {
            setApercusImages([...apercusImages, ...nouveauxApercus]);
            setDonneesFormulaire({
              ...donneesFormulaire,
              customImages: [...donneesFormulaire.customImages, ...nouveauxApercus]
            });
          }
        };
        lecteur.readAsDataURL(fichier);
      }
    });
  };

  const supprimerImage = (indice) => {
    const nouveauxApercus = apercusImages.filter((_, i) => i !== indice);
    setApercusImages(nouveauxApercus);
    setDonneesFormulaire({
      ...donneesFormulaire,
      customImages: nouveauxApercus
    });
  };

  const gererSoumission = (e) => {
    e.preventDefault();
    
    // Construire le message WhatsApp
    let message = `📋 *DEMANDE DE DEVIS - MENUISERIE KOFFI*\n\n`;
    message += `👤 *Informations personnelles:*\n`;
    message += `Nom: ${donneesFormulaire.name}\n`;
    message += `Téléphone: ${donneesFormulaire.phone}\n`;
    if (donneesFormulaire.email) message += `Email: ${donneesFormulaire.email}\n`;
    if (donneesFormulaire.address) message += `Adresse: ${donneesFormulaire.address}\n\n`;
    
    message += `📐 *Type de projet:* ${donneesFormulaire.projectType || 'Non spécifié'}\n\n`;
    
    if (donneesFormulaire.dimension) {
      message += `📏 *Dimensions:* ${donneesFormulaire.dimension}\n\n`;
    }
    
    if (idsProduitsSelectionnes.length > 0) {
      message += `🛒 *Produits sélectionnés:*\n`;
      donneesFormulaire.selectedProducts.forEach((product, indice) => {
        message += `${indice + 1}. ${product.name} - ${product.price.toLocaleString('fr-FR')} FCFA\n`;
      });
      message += `\n`;
    }
    
    if (donneesFormulaire.description) {
      message += `📝 *Description du projet:*\n${donneesFormulaire.description}\n\n`;
    }
    
    if (apercusImages.length > 0) {
      message += `📷 *Images jointes:* ${apercusImages.length} image(s)\n\n`;
    }
    
    message += `💬 *Note:* Les images doivent être envoyées séparément après ce message.`;
    
    // Ouvrir WhatsApp avec le message
    const phoneNumber = '2250707857252';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Réinitialiser le formulaire après un délai
    setTimeout(() => {
      setDonneesFormulaire({
        name: '',
        phone: '',
        email: '',
        address: '',
        projectType: '',
        dimension: '',
        description: '',
        selectedProducts: [],
        customImages: []
      });
      setIdsProduitsSelectionnes([]);
      setApercusImages([]);
    }, 1000);
  };

  return (
    <div className="py-6 md:py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-marron-800 mb-3 md:mb-4">
            Demande de Devis
          </h1>
          <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
            Remplissez le formulaire ci-dessous pour obtenir un devis personnalisé.
            Vous pouvez sélectionner des produits existants ou décrire votre projet sur mesure.
          </p>
        </div>

        <form onSubmit={gererSoumission} className="max-w-4xl mx-auto">
          <div className="bg-white shadow-card p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-display font-bold text-marron-800 mb-4 md:mb-6">
              <i className="fas fa-user mr-2 text-kaki-600"></i>
              Vos informations
            </h2>

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
                <label htmlFor="address" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                  Adresse de livraison
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={donneesFormulaire.address}
                  onChange={gererChangement}
                  className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent text-sm md:text-base"
                  placeholder="Votre adresse complète"
                />
              </div>
            </div>
          </div>

          {/* Sélection de produits */}
          <div className="bg-white shadow-card p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-display font-bold text-marron-800 mb-4 md:mb-6">
              <i className="fas fa-shopping-cart mr-2 text-kaki-600"></i>       
              Produits existants (optionnel)
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 text-xs md:text-sm">
              Sélectionnez un ou plusieurs produits qui vous intéressent. Vous pouvez aussi décrire
              votre projet personnalisé dans la section suivante.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  onClick={() => gererSelectionProduit(product.id)}
                  className={`border-2 p-3 md:p-4 cursor-pointer transition-all ${     
                    idsProduitsSelectionnes.includes(product.id)
                      ? 'border-marron-600 bg-marron-50'
                      : 'border-gray-200 hover:border-marron-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">       
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-marron-800 mb-1 text-sm md:text-base">
                        {product.name}
                      </h3>
                      <p className="text-xs md:text-sm text-gray-600 line-clamp-2 mb-2">   
                        {product.description}
                      </p>
                      <p className="text-marron-700 font-bold text-xs md:text-sm">
                        {product.price.toLocaleString('fr-FR')} FCFA
                      </p>
                    </div>
                    <div className={`ml-2 w-5 h-5 md:w-6 md:h-6 border-2 flex items-center justify-center ${
                      idsProduitsSelectionnes.includes(product.id)
                        ? 'bg-marron-600 border-marron-600'
                        : 'border-gray-300'
                    }`}>
                      {idsProduitsSelectionnes.includes(product.id) && (
                        <i className="fas fa-check text-white text-xs"></i>     
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {idsProduitsSelectionnes.length > 0 && (
              <div className="mt-4 md:mt-6 p-3 md:p-4 bg-kaki-50 border border-kaki-200">      
                <p className="text-xs md:text-sm font-semibold text-marron-800 mb-2">      
                  {idsProduitsSelectionnes.length} produit(s) sélectionné(s)       
                </p>
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {donneesFormulaire.selectedProducts.map((product) => (
                    <span
                      key={product.id}
                      className="text-xs bg-marron-600 text-white px-2 md:px-3 py-1"    
                    >
                      {product.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Description du projet */}
          <div className="bg-white shadow-card p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-display font-bold text-marron-800 mb-4 md:mb-6">
              <i className="fas fa-clipboard-list mr-2 text-kaki-600"></i>      
              Votre projet
            </h2>

            <div className="mb-4 md:mb-6">
              <label htmlFor="projectType" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                Type de projet *
              </label>
              <select
                id="projectType"
                name="projectType"
                required
                value={donneesFormulaire.projectType}
                onChange={gererChangement}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent text-sm md:text-base"
              >
                <option value="">Sélectionnez un type</option>
                <option value="Meuble sur mesure">Meuble sur mesure</option>    
                <option value="Rénovation">Rénovation</option>
                <option value="Commande spéciale">Commande spéciale</option>  
                <option value="Projet complet">Projet complet (plusieurs meubles)</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            <div className="mb-4 md:mb-6">
              <label htmlFor="dimension" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                Dimensions (optionnel)
              </label>
              <input
                type="text"
                id="dimension"
                name="dimension"
                value={donneesFormulaire.dimension}
                onChange={gererChangement}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent text-sm md:text-base"
                placeholder="Ex: 200cm x 80cm x 40cm (Longueur x Largeur x Hauteur)"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-xs md:text-sm font-semibold text-marron-700 mb-2">
                Description détaillée du projet *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows="5"
                value={donneesFormulaire.description}
                onChange={gererChangement}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-marron-500 focus:border-transparent resize-none text-sm md:text-base"  
                placeholder="Décrivez votre projet en détail : dimensions souhaitées, essence de bois préférée, style, finition, etc."
              ></textarea>
            </div>
          </div>

          {/* Upload d'images */}
          <div className="bg-white shadow-card p-4 md:p-8 mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-display font-bold text-marron-800 mb-4 md:mb-6">
              <i className="fas fa-images mr-2 text-kaki-600"></i>
              Photos de référence (optionnel)
            </h2>
            <p className="text-gray-600 mb-4 md:mb-6 text-xs md:text-sm">
              Ajoutez des photos de meubles qui vous inspirent, des croquis, ou des photos de votre espace.
            </p>

            <div className="border-2 border-dashed border-gray-300 p-4 md:p-6 text-center mb-4 md:mb-6">
              <input
                type="file"
                id="imageUpload"
                multiple
                accept="image/*"
                onChange={gererUploadImage}
                className="hidden"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer inline-block"
              >
                <i className="fas fa-cloud-upload-alt text-3xl md:text-4xl text-gray-400 mb-3 md:mb-4"></i>
                <p className="text-gray-600 font-medium mb-2 text-sm md:text-base">
                  Cliquez pour ajouter des photos
                </p>
                <p className="text-gray-500 text-xs md:text-sm">
                  PNG, JPG, JPEG jusqu'à 10MB
                </p>
              </label>
            </div>

            {apercusImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {apercusImages.map((preview, indice) => (
                  <div key={indice} className="relative">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="w-full h-24 md:h-32 object-cover border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => supprimerImage(indice)}
                      className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 md:w-6 md:h-6 flex items-center justify-center hover:bg-red-700"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                    <p className="text-xs text-gray-600 mt-1 truncate">{preview.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Informations importantes */}
          <div className="bg-kaki-50 border border-kaki-200 p-4 md:p-6 mb-6 md:mb-8">
            <h3 className="font-display font-semibold text-marron-800 mb-3 text-base md:text-lg">    
              <i className="fas fa-info-circle mr-2"></i>
              Informations importantes
            </h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-700">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-kaki-600 mr-2 mt-1"></i> 
                <span>Votre demande sera traitée dans les plus brefs délais</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-kaki-600 mr-2 mt-1"></i> 
                <span>Les devis sont gratuits et sans engagement</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-kaki-600 mr-2 mt-1"></i> 
                <span>Possibilité de rendez-vous à l'atelier (Koumassi 05, juste derrière le lycée municipal de Koumassi)</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-kaki-600 mr-2 mt-1"></i> 
                <span>Service de livraison disponible</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-kaki-600 mr-2 mt-1"></i> 
                <span>Les images seront envoyées via WhatsApp après votre demande</span>
              </li>
            </ul>
          </div>

          {/* Boutons de soumission */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <button
              type="submit"
              className="btn-primary flex-1 bg-green-600 hover:bg-green-700 text-sm md:text-base"    
            >
              <i className="fab fa-whatsapp mr-2"></i>
              Envoyer la demande sur WhatsApp
            </button>
            <button
              type="button"
              onClick={() => {
                setDonneesFormulaire({
                  name: '',
                  phone: '',
                  email: '',
                  address: '',
                  projectType: '',
                  dimension: '',
                  description: '',
                  selectedProducts: [],
                  customImages: []
                });
                setIdsProduitsSelectionnes([]);
                setApercusImages([]);
              }}
              className="btn-secondary flex-1 bg-gray-600 hover:bg-gray-700 text-sm md:text-base"    
            >
              <i className="fas fa-redo mr-2"></i>
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

