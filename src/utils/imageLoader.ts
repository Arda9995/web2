import { getImagePath } from './imageUtils';

export const loadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = getImagePath(src);
    img.onload = () => resolve(img);
    img.onerror = (error) => {
      console.error('Failed to load image:', src, error);
      reject(error);
    };
  });
};

export const preloadImages = async (imagePaths: string[]): Promise<boolean> => {
  try {
    await Promise.all(
      imagePaths.map(path => 
        loadImage(path).catch(error => {
          console.warn(`Failed to preload image: ${path}`, error);
          return null;
        })
      )
    );
    return true;
  } catch (error) {
    console.error('Error preloading images:', error);
    return false;
  }
};

export const getOptimizedImageUrl = (src: string, _width: number, _height: number): string => {
  // Prefix with / to ensure the path is absolute
  if (!src.startsWith('/') && !src.startsWith('http')) {
    return `/${src}`;
  }
  return src;
};
