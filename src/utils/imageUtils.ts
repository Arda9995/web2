import type { SyntheticEvent } from 'react';

/**
 * Simple and reliable image handling utilities
 */

// Simple image path resolver
export const getImagePath = (imageName: string): string => {
  if (!imageName) return '/placeholder-avatar.png';
  
  // Handle external URLs
  if (imageName.startsWith('http')) {
    return imageName;
  }
  
  // Ensure consistent path format
  const cleanName = imageName.startsWith('/') ? imageName.substring(1) : imageName;
  return `/${cleanName}`;
};

// Simple error handler
export const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
  const target = e.target as HTMLImageElement;
  
  // Only set fallback if not already set
  if (!target.src.endsWith('/placeholder-avatar.png')) {
    target.src = '/placeholder-avatar.png';
    target.classList.add('opacity-50');
  }
};

// Simple preload function
export const preloadImage = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = getImagePath(src);
  });
};
