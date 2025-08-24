import type { SyntheticEvent } from 'react';

/**
 * Image handling utilities with Netlify deployment support
 */

// Base URL for images (handles both development and production)
const getBaseUrl = (): string => {
  // For production builds, use relative paths
  if (process.env.NODE_ENV === 'production') return '';
  // For development, use the current origin
  if (typeof window !== 'undefined') return window.location.origin;
  return ''; // For SSR
};

// Image path resolver
export const getImagePath = (imageName: string): string => {
  if (!imageName) return '/placeholder-avatar.png';
  
  // Handle external URLs
  if (imageName.startsWith('http')) {
    return imageName;
  }
  
  // Ensure the path starts with a slash for relative paths
  const cleanName = imageName.startsWith('/') ? imageName : `/${imageName}`;
  
  // For production, use relative paths, for development use absolute
  return process.env.NODE_ENV === 'production' 
    ? cleanName 
    : `${getBaseUrl()}${cleanName}`;
};

// Error handler for images
export const handleImageError = (e: SyntheticEvent<HTMLImageElement>): void => {
  const target = e.target as HTMLImageElement;
  
  // Only set fallback if not already set
  if (!target.src.endsWith('/placeholder-avatar.png')) {
    target.src = process.env.NODE_ENV === 'production' 
      ? '/placeholder-avatar.png' 
      : `${getBaseUrl()}/placeholder-avatar.png`;
    target.classList.add('opacity-50');
  }
};

// Preload images with error handling
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = getImagePath(src);
  });
};
