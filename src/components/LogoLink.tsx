import React from 'react';

interface LogoLinkProps {
  name: string;
  logoUrl: string;
  href: string;
  alt: string;
}

export const LogoLink: React.FC<LogoLinkProps> = ({ name, logoUrl, href, alt }) => {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="transition-opacity hover:opacity-75 focus:opacity-75"
      aria-label={`Visit ${name}`}
    >
      <img
        src={logoUrl}
        alt={alt}
        className="h-12 md:h-16 w-auto object-contain dark:invert"
        loading="lazy"
      />
    </a>
  );
};
