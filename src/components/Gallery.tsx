import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

// Utility function to preload images
const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = (error) => reject(error);
  });
};

const photos = [
    "/_MG_0416.JPG",
    "/_MG_0426.JPG",
    "/_MG_0495.JPG",
    "/_MG_0651.JPG",
    "/_MG_0803.JPG",
    "/_MG_2223.JPG",
    "/_MG_2409.JPG",
    "/_MG_2847.JPG",
    "/_MG_3107.JPG",
    "/_MG_5113.JPG",
    "/_MG_5236.JPG",
    "/_MG_5275.JPG",
    "/IMG-20250511-WA0031.jpg",
    "/IMG_5353.JPG"
];

const Gallery = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

    const prevPhoto = () => {
        const prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
        setLoading(true);
        setCurrentIndex(prevIndex);
    };

    const nextPhoto = () => {
        const nextIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
        setLoading(true);
        setCurrentIndex(nextIndex);
    };

    // Preload images when component mounts and when currentIndex changes
    useEffect(() => {
        const loadImages = async () => {
            try {
                // Preload current, next, and previous images
                const indicesToLoad = [
                    currentIndex,
                    (currentIndex + 1) % photos.length,
                    (currentIndex - 1 + photos.length) % photos.length
                ];

                await Promise.all(
                    indicesToLoad.map(async (index) => {
                        if (!loadedImages[index]) {
                            try {
                                await preloadImage(photos[index]);
                                setLoadedImages(prev => ({
                                    ...prev,
                                    [index]: true
                                }));
                            } catch (error) {
                                console.error(`Failed to load image: ${photos[index]}`, error);
                            }
                        }
                    })
                );
            } catch (error) {
                console.error('Error preloading images:', error);
            } finally {
                setLoading(false);
            }
        };

        loadImages();
    }, [currentIndex]);

    return (
        <section id="gallery" className="py-20 bg-black relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Header */}
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('gallery.title')} <span className="text-[#a02638]">{t('gallery.titleHighlight')}</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t('gallery.subtitle')}
                    </p>
                </div>

                {/* Photo Display */}
                <div className="relative">
                    <div className="w-full h-[480px] mx-auto rounded-xl overflow-hidden border border-[#a02638]/50 shadow-lg">
                        {loading && !loadedImages[currentIndex] ? (
                            <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                <Loader2 className="w-12 h-12 text-[#a02638] animate-spin" />
                            </div>
                        ) : (
                            <img
                                src={photos[currentIndex]}
                                alt={t('gallery.alt', { number: currentIndex + 1 })}
                                className={`w-full h-full object-contain transition-opacity duration-300 ${
                                    loadedImages[currentIndex] ? 'opacity-100' : 'opacity-0'
                                }`}
                                onLoad={() => setLoading(false)}
                                onError={(e) => {
                                    console.error('Failed to load image:', photos[currentIndex]);
                                    const target = e.target as HTMLImageElement;
                                    target.src = '/placeholder-gallery.jpg';
                                    setLoading(false);
                                }}
                                loading="lazy"
                                decoding="async"
                            />
                        )}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevPhoto}
                        aria-label={t('gallery.previous')}
                        className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#a02638] hover:bg-[#8e1f31] text-white p-3 rounded-full shadow-lg transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextPhoto}
                        aria-label={t('gallery.next')}
                        className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#a02638] hover:bg-[#8e1f31] text-white p-3 rounded-full shadow-lg transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center mt-6 space-x-2">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setLoading(true);
                                setCurrentIndex(index);
                            }}
                            aria-label={t('gallery.goTo', { number: index + 1 })}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                currentIndex === index 
                                    ? "bg-[#a02638] scale-125" 
                                    : "bg-gray-600 hover:bg-gray-400 hover:scale-110"
                            }`}
                            disabled={loading}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;