import React from 'react';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: string;
  onRate?: (rating: number) => void;
  isInteractive?: boolean;
  className?: string;
}

const Star: React.FC<{ 
  filled: number; 
  size: string; 
  onHover?: () => void;
  onLeave?: () => void;
  onClick?: () => void;
  isInteractive: boolean;
}> = ({ filled, size, onHover, onLeave, onClick, isInteractive }) => {
  const points = "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2";
  const uniqueId = `star-grad-${Math.random().toString(36).substr(2, 9)}`;

  // Use a solid fill for interactive mode to avoid gradient issues on hover, but use gradient for display
  const fillStyle = isInteractive ? 'currentColor' : `url(#${uniqueId})`;

  return (
    <svg 
      className={`${size} ${isInteractive ? 'cursor-pointer' : ''}`} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <defs>
        <linearGradient id={uniqueId}>
          <stop offset={`${filled * 100}%`} stopColor="currentColor" />
          <stop offset={`${filled * 100}%`} stopColor="currentColor" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <polygon points={points} fill={fillStyle} />
    </svg>
  );
};

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  totalStars = 5, 
  size = 'w-5 h-5', 
  onRate,
  isInteractive = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleHover = (index: number) => {
    if (!isInteractive) return;
    setHoverRating(index + 1);
  };

  const handleLeave = () => {
    if (!isInteractive) return;
    setHoverRating(0);
  };
  
  const handleClick = (index: number) => {
    if (!isInteractive || !onRate) return;
    onRate(index + 1);
  };

  const displayRating = hoverRating > 0 ? hoverRating : rating;

  return (
    <div className={`flex items-center text-yellow-400 ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        let filled = 0;
        if (displayRating >= starValue) {
          filled = 1;
        } else if (displayRating > index && displayRating < starValue) {
          filled = displayRating - index;
        }
        
        return (
          <Star 
            key={index} 
            filled={filled} 
            size={size}
            onHover={() => handleHover(index)}
            onLeave={handleLeave}
            onClick={() => handleClick(index)}
            isInteractive={isInteractive}
          />
        );
      })}
    </div>
  );
};

export default StarRating;