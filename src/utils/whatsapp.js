// Fonction pour ouvrir WhatsApp avec un message
export const openWhatsApp = (nomProduit = '', prixProduit = '') => {
  const numeroTelephone = '2250707857252'; // Format international pour la Côte d'Ivoire
  let message = '';
  
  if (nomProduit && prixProduit) {
    message = `Bonjour, je suis intéressé(e) par le produit "${nomProduit}" au prix de ${prixProduit} FCFA. Pouvez-vous me donner plus d'informations ?`;
  } else if (nomProduit) {
    message = `Bonjour, je suis intéressé(e) par le produit "${nomProduit}". Pouvez-vous me donner plus d'informations ?`;
  } else {
    message = 'Bonjour, je souhaite obtenir un devis pour un projet de menuiserie.';
  }
  
  const messageEncode = encodeURIComponent(message);
  const urlWhatsApp = `https://wa.me/${numeroTelephone}?text=${messageEncode}`;
  window.open(urlWhatsApp, '_blank');
};

export const openWhatsAppDevis = () => {
  const numeroTelephone = '2250707857252';
  const message = encodeURIComponent('Bonjour, je souhaite demander un devis pour un projet de menuiserie sur mesure.');
  const urlWhatsApp = `https://wa.me/${numeroTelephone}?text=${message}`;
  window.open(urlWhatsApp, '_blank');
};

