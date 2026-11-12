import React from 'react';

type Props = {
  src: string;            // original path relative to public/assets/images/...
  alt?: string;
  className?: string;
  widths?: number[];      // e.g. [320,480,768,1024]
  aspectRatio?: number;   // width/height to reserve space, e.g. 16/9
  loading?: 'lazy' | 'eager';
};

export default function LazyImage({ src, alt = '', className, widths = [320,480,768,1024], aspectRatio, loading = 'lazy' }: Props) {
  // expects optimized images at /assets/optimized/... with pattern base-W.webp / base-W.avif
  const extless = src.replace(/\.[^/.]+$/, '');
  const webpSrcSet = widths.map(w => `/assets/optimized/${extless}-${w}.webp ${w}w`).join(', ');
  const avifSrcSet = widths.map(w => `/assets/optimized/${extless}-${w}.avif ${w}w`).join(', ');
  const fallback = `/assets/optimized/${extless}-orig.webp`;

  const style = aspectRatio ? { aspectRatio: String(aspectRatio) } : undefined;

  return (
    <picture className={className} style={style}>
      <source type="image/avif" srcSet={avifSrcSet} sizes="(max-width: 1024px) 100vw, 1024px" />
      <source type="image/webp" srcSet={webpSrcSet} sizes="(max-width: 1024px) 100vw, 1024px" />
      <img src={fallback} alt={alt} loading={loading} decoding="async" style={{ width: '100%', height: 'auto' }} />
    </picture>
  );
}
