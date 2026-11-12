import React from 'react';

interface FlashcardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  isFlipped: boolean;
  className?: string;
}

const Flashcard: React.FC<FlashcardProps> = ({ frontContent, backContent, isFlipped, className = '' }) => {
  return (
    <div className={`w-full h-full [perspective:1000px] ${className}`}>
      <div
        className={`relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Front of the card */}
        <div className="absolute w-full h-full bg-white dark:bg-gray-800 shadow-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center text-center [backface-visibility:hidden]">
          <div className="text-xl md:text-2xl font-semibold text-neutral-dark dark:text-neutral-light">
            {frontContent}
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute w-full h-full bg-primary-light/10 dark:bg-primary-dark/20 shadow-xl rounded-2xl border border-primary-light p-6 flex items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="text-base md:text-lg text-neutral-dark dark:text-neutral-light">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
