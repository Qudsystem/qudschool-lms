
import React, { useState, useEffect } from 'react';

interface ToggleSwitchProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ 
  id, 
  label, 
  checked, 
  onChange, 
  disabled = false,
  size = 'md' 
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    if (disabled) return;
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  const heightClass = size === 'sm' ? 'h-5' : 'h-6';
  const widthClass = size === 'sm' ? 'w-9' : 'w-11';
  const knobSizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const knobTranslateClass = size === 'sm' 
    ? (isChecked ? 'translate-x-4' : 'translate-x-0.5') 
    : (isChecked ? 'translate-x-5' : 'translate-x-1');


  return (
    <div className="flex items-center justify-between py-3"> {/* Increased py for better spacing */}
      <label htmlFor={id} className={`text-sm font-medium text-neutral-dark dark:text-gray-300 ${disabled ? 'opacity-70' : 'cursor-pointer'}`}>
        {label}
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isChecked}
        onClick={handleChange}
        disabled={disabled}
        className={`relative inline-flex items-center ${heightClass} rounded-full ${widthClass} transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          isChecked ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block ${knobSizeClass} transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
            knobTranslateClass
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;