// Fonction pour ouvrir WhatsApp avec un message
export const openWhatsApp = (productName = '', productPrice = '') => {
  const phoneNumber = '2250707857252'; // Format international pour la Côte d'Ivoire
  let message = '';
  
  if (productName && productPrice) {
    message = `Bonjour, je suis intéressé(e) par le produit "${productName}" au prix de ${productPrice} FCFA. Pouvez-vous me donner plus d'informations ?`;
  } else if (productName) {
    message = `Bonjour, je suis intéressé(e) par le produit "${productName}". Pouvez-vous me donner plus d'informations ?`;
  } else {
    message = 'Bonjour, je souhaite obtenir un devis pour un projet de menuiserie.';
  }
  
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export const openWhatsAppDevis = () => {
  const phoneNumber = '2250707857252';
  const message = encodeURIComponent('Bonjour, je souhaite demander un devis pour un projet de menuiserie sur mesure.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(whatsappUrl, '_blank');
};

