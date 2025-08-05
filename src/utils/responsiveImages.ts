// Utility for generating responsive image srcSet
export function generateResponsiveSrcSet(
  imagePath: string,
  sizes: number[] = [320, 640, 768, 1024, 1280, 1920]
): string {
  const extension = imagePath.split('.').pop() || 'jpg';
  const basePath = imagePath.substring(0, imagePath.lastIndexOf('.'));
  
  return sizes
    .map(size => `${basePath}-${size}.${extension} ${size}w`)
    .join(', ');
}

// Function to determine appropriate image size based on viewport
export function getResponsiveImageSize(
  viewportWidth: number
): string {
  if (viewportWidth <= 640) return '100vw';
  if (viewportWidth <= 1024) return '50vw';
  return '33vw';
}

// Function to optimize image loading priority
export function shouldPrioritizeImage(
  imagePath: string,
  priorityImages: string[] = ['/images/hero-bg.webp', '/images/vanraj-profile.jpg']
): boolean {
  return priorityImages.some(priority => imagePath.includes(priority));
}

// Format used for image placeholders (tiny blurred versions)
export const PLACEHOLDER_BLUR_DATA_URL = 
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
