import React, { useState, useEffect } from 'react';

export default function Carousel({ images, autoPlay = true, interval = 5000 }) {
  const [indexActuel, setIndexActuel] = useState(0);

  useEffect(() => {
    if (!autoPlay || images.length <= 1) return;

    const minuteur = setInterval(() => {
      setIndexActuel((indexPrecedent) => (indexPrecedent + 1) % images.length);
    }, interval);

    return () => clearInterval(minuteur);
  }, [images.length, autoPlay, interval]);

  const allerASlide = (index) => {
    setIndexActuel(index);
  };

  const precedent = () => {
    setIndexActuel((indexPrecedent) => (indexPrecedent - 1 + images.length) % images.length);
  };

  const suivant = () => {
    setIndexActuel((indexPrecedent) => (indexPrecedent + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-full">
      <div className="relative overflow-hidden h-full">
        <div
          className="flex transition-transform duration-500 ease-in-out h-full" 
          style={{ transform: `translateX(-${indexActuel * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-full">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x600/8a7658/ffffff?text=Image+${index + 1}`;
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={precedent}
            className="absolute left-1 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-marron-700 p-1.5 sm:p-2 md:p-3 shadow-card transition-all duration-300 z-10 text-xs sm:text-sm md:text-base"    
            aria-label="Image précédente"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button
            onClick={suivant}
            className="absolute right-1 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-marron-700 p-1.5 sm:p-2 md:p-3 shadow-card transition-all duration-300 z-10 text-xs sm:text-sm md:text-base"   
            aria-label="Image suivante"
          >
            <i className="fas fa-chevron-right"></i>
          </button>

          <div className="absolute bottom-1 sm:bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 sm:space-x-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => allerASlide(index)}
                className={`h-1.5 sm:h-2 transition-all duration-300 ${
                  index === indexActuel
                    ? 'bg-white w-6 sm:w-8'
                    : 'bg-white/50 w-1.5 sm:w-2'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

