export const optimizeImage = (url: string, width: number) => {
  // Convert to WebP format
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&fm=webp&q=80`;
  }
  return url;
};

export const addLazyLoading = (imgElement: HTMLImageElement) => {
  imgElement.loading = 'lazy';
  imgElement.decoding = 'async';
};

export const preloadCriticalImages = (urls: string[]) => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};
