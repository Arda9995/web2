/**
 * Utility functions for handling image paths in the application
 */

// Cache for tracking loaded images
const imageCache = new Map<string, Promise<boolean>>();

// Type guard for HTMLImageElement
const isHTMLImageElement = (element: EventTarget | null): element is HTMLImageElement => {
  return element !== null && (element as HTMLImageElement).tagName === 'IMG';
};

/**
 * Gets the correct image path for both development and production
 * @param imageName - The name of the image file (with or without leading slash)
 * @returns The correct image path
 */
export const getImagePath = (imageName: string): string => {
  try {
    // Return placeholder if no image name is provided
    if (!imageName || typeof imageName !== 'string') {
      console.warn('No image name provided, using placeholder');
      return '/placeholder-avatar.png';
    }
    
    // Handle external URLs
    if (imageName.startsWith('http')) {
      return imageName;
    }
    
    // Normalize the path
    const cleanName = imageName.startsWith('/') ? imageName.substring(1) : imageName;
    const imagePath = `/${cleanName}`;
    
    // In production, we need to ensure the path is correct
    // Netlify serves files in a case-insensitive way, but we'll try to match the exact case first
    return imagePath;
    
  } catch (error) {
    console.error('Error in getImagePath:', error);
    return '/placeholder-avatar.png';
  }
};

/**
 * Preloads an image and caches the result
 * @param src - The image source to preload
 * @returns A promise that resolves when the image is loaded
 */
export const preloadImage = (src: string): Promise<boolean> => {
  // Return cached promise if available
  if (imageCache.has(src)) {
    return imageCache.get(src)!;
  }
  
  const promise = new Promise<boolean>((resolve) => {
    const img = new Image();
    const imagePath = getImagePath(src);
    
    img.onload = () => {
      console.log(`Successfully loaded image: ${src}`);
      resolve(true);
    };
    
    img.onerror = (error) => {
      console.error(`Failed to load image: ${src}`, {
        src,
        resolvedPath: imagePath,
        error
      });
      resolve(false);
    };
    
    // Start loading
    img.src = imagePath;
  });
  
  // Cache the promise
  imageCache.set(src, promise);
  return promise;
};


/**
 * Handles image loading errors by setting a fallback image
 * @param e - The error event from the image element
 */
export const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>): void => {
  if (!isHTMLImageElement(e.target)) {
    console.warn('Error target is not an image element');
    return;
  }
  
  const target = e.target as HTMLImageElement;
  const originalSrc = target.dataset.originalSrc || target.getAttribute('data-original-src') || target.src;
  const placeholderPath = '/placeholder-avatar.png';
  
  // Only try to recover if we haven't already tried the fallback
  if (!target.src.endsWith(placeholderPath)) {
    try {
      console.warn(`Image failed to load: ${originalSrc}`, {
        currentSrc: target.currentSrc,
        src: target.src,
        originalSrc
      });
      
      // Prevent infinite loops
      target.onerror = null;
      
      // Only set the placeholder if it's not already set
      if (target.src !== placeholderPath) {
        target.src = placeholderPath;
        target.classList.add('opacity-50');
      }
    } catch (error) {
      console.error('Error in handleImageError:', error);
    }
  }
};
