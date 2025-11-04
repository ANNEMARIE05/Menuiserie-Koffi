import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  useEffect(() => {
    // Charger les informations utilisateur depuis localStorage
    const name = localStorage.getItem('userName') || '';
    const phone = localStorage.getItem('userPhone') || '';
    const email = localStorage.getItem('userEmail') || '';
    const address = localStorage.getItem('userAddress') || '';

    setFormData({
      name,
      phone,
      email,
      address
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validation
    if (!formData.name || !formData.phone) {
      setMessage({ type: 'error', text: 'Le nom et le téléphone sont obligatoires' });
      setLoading(false);
      return;
    }

    // Validation du format téléphone
    const telephoneRegex = /^(\+225|225|0)?[0-9]{9,10}$/;
    const telephoneNettoye = formData.phone.replace(/\s/g, '');
    
    if (!telephoneRegex.test(telephoneNettoye)) {
      setMessage({ type: 'error', text: 'Format de numéro de téléphone invalide' });
      setLoading(false);
      return;
    }

    // Sauvegarder les informations (dans un vrai projet, on enverrait à une API)
    setTimeout(() => {
      localStorage.setItem('userName', formData.name);
      localStorage.setItem('userPhone', telephoneNettoye);
      if (formData.email) {
        localStorage.setItem('userEmail', formData.email);
      }
      if (formData.address) {
        localStorage.setItem('userAddress', formData.address);
      }

      setMessage({ type: 'success', text: 'Profil mis à jour avec succès !' });
      setLoading(false);

      // Optionnel : rediriger après 2 secondes
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-card p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl md:text-3xl font-display font-bold text-marron-800">
                <i className="fas fa-user-circle text-kaki-600 mr-2"></i>
                Mon profil
              </h1>
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-marron-800 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            {message.text && (
              <div
                className={`mb-6 p-4 rounded-lg flex items-center ${
                  message.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}
              >
                <i
                  className={`fas ${
                    message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                  } mr-2`}
                ></i>
                <span>{message.text}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Numéro de téléphone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="07 07 85 72 52"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="exemple@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adresse
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Votre adresse complète"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => navigate('/dashboard')}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-kaki-600 hover:bg-kaki-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Enregistrement...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save mr-2"></i>
                      Enregistrer
                    </>
                  )}
                </button>
              </div>
            </form>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

