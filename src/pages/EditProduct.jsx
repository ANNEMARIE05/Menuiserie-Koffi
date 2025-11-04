import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { products, categories } from '../data/products';

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.id === parseInt(id));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    dimension: '',
    longDescription: '',
    features: '',
    images: []
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price || '',
        description: product.description || '',
        dimension: product.dimension || '',
        longDescription: product.longDescription || '',
        features: product.features ? product.features.join(', ') : '',
        images: product.images || []
      });
      setImagePreviews(product.images.map((img, index) => ({
        name: `image-${index + 1}`,
        url: img
      })));
    }
  }, [product]);

  if (!product) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-display font-bold text-marron-800 mb-4">
              Produit non trouvé
            </h2>
            <button
              onClick={() => navigate('/dashboard/liste-produits')}
              className="px-6 py-3 bg-kaki-600 hover:bg-kaki-700 text-white rounded-lg transition-colors"
            >
              Retour à la liste
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = [];

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          newPreviews.push({
            name: file.name,
            url: reader.result
          });
          if (newPreviews.length === files.length) {
            setImagePreviews([...imagePreviews, ...newPreviews]);
            setFormData({
              ...formData,
              images: [...formData.images, ...newPreviews.map(p => p.url)]
            });
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setFormData({
      ...formData,
      images: newPreviews.map(p => p.url)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      setMessage({ type: 'error', text: 'Veuillez remplir tous les champs obligatoires' });
      setLoading(false);
      return;
    }

    // Simuler la mise à jour
    setTimeout(() => {
      setMessage({ type: 'success', text: 'Produit modifié avec succès !' });
      setLoading(false);
      setTimeout(() => {
        navigate('/dashboard/liste-produits');
      }, 2000);
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 py-2 sm:py-4 md:py-8">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-card p-3 sm:p-4 md:p-8">
              <div className="flex items-center justify-between mb-3 sm:mb-4 md:mb-6">
                <h1 className="text-base sm:text-xl md:text-3xl font-display font-bold text-marron-800">
                  <i className="fas fa-edit text-kaki-600 mr-1.5 sm:mr-2 text-sm sm:text-base md:text-lg"></i>
                  Modifier le produit
                </h1>
                <button
                  onClick={() => navigate('/dashboard/liste-produits')}
                  className="text-gray-600 hover:text-marron-800 transition-colors"
                >
                  <i className="fas fa-times text-base sm:text-lg md:text-xl"></i>
                </button>
              </div>

              {message.text && (
                <div
                  className={`mb-3 sm:mb-4 md:mb-6 p-2 sm:p-3 md:p-4 rounded-lg flex items-center text-xs sm:text-sm md:text-base ${
                    message.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  <i
                    className={`fas ${
                      message.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'
                    } mr-1.5 sm:mr-2 text-xs sm:text-sm`}
                  ></i>
                  <span>{message.text}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Nom du produit <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Catégorie <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                      required
                    >
                      <option value="">Sélectionner une catégorie</option>
                      {categories.filter(c => c !== 'Tous').map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Prix (FCFA) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                      required
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Description courte <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      name="dimension"
                      value={formData.dimension}
                      onChange={handleChange}
                      placeholder="Ex: 200x100cm ou Personnalisables"
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Description longue
                    </label>
                    <textarea
                      name="longDescription"
                      value={formData.longDescription}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Caractéristiques (séparées par des virgules)
                    </label>
                    <input
                      type="text"
                      name="features"
                      value={formData.features}
                      onChange={handleChange}
                      placeholder="Ex: Chêne massif, Finition naturelle, Sur mesure"
                      className="w-full px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kaki-500 focus:border-transparent text-xs sm:text-sm md:text-base"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Images du produit
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 md:p-6 text-center">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center"
                      >
                        <i className="fas fa-cloud-upload-alt text-2xl sm:text-3xl md:text-4xl text-gray-400 mb-1 sm:mb-2"></i>
                        <span className="text-xs sm:text-sm text-gray-600">
                          Cliquez pour télécharger des images
                        </span>
                      </label>
                    </div>

                    {imagePreviews.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative">
                            <img
                              src={preview.url}
                              alt={preview.name}
                              className="w-full h-20 sm:h-24 md:h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-red-500 text-white rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center hover:bg-red-600"
                            >
                              <i className="fas fa-times text-[8px] sm:text-xs"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 sm:space-x-3 md:space-x-4 pt-2 sm:pt-3 md:pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard/liste-produits')}
                    className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-xs sm:text-sm md:text-base"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 md:py-3 bg-kaki-600 hover:bg-kaki-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center text-xs sm:text-sm md:text-base"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-1 sm:mr-2 text-xs sm:text-sm"></i>
                        Enregistrement...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save mr-1 sm:mr-2 text-xs sm:text-sm"></i>
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

