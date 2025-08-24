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
  
  // Remove leading slash if present
  const cleanName = imageName.startsWith('/') ? imageName.substring(1) : imageName;
  
  // For production (Netlify), use the path directly from public folder
  if (process.env.NODE_ENV === 'production') {
    return `/${cleanName}`;
  }
  
  // For development, use the path relative to public folder
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
