
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick, hoverEffect = false }) => {
  const baseStyles = "bg-white dark:bg-gray-800 shadow-lg rounded-xl border border-transparent dark:border-gray-700"; // Removed overflow-hidden
  const hoverStyles = hoverEffect ? "transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 dark:hover:shadow-primary/20" : "";
  const clickableStyles = onClick ? "cursor-pointer" : "";

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${clickableStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;