interface ImageConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png';
}

export const optimizeImageUrl = (url: string, config: ImageConfig = {}) => {
  const { width, height, quality = 80, format = 'webp' } = config;
  
  if (url.includes('unsplash.com')) {
    let optimizedUrl = `${url}&fm=${format}&q=${quality}`;
    if (width) optimizedUrl += `&w=${width}`;
    if (height) optimizedUrl += `&h=${height}`;
    return optimizedUrl;
  }
  
  return url;
};

export const addLazyLoading = (imgElement: HTMLImageElement) => {
  if ('loading' in HTMLImageElement.prototype) {
    imgElement.loading = 'lazy';
    imgElement.decoding = 'async';
  }
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
