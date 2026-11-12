
import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  to?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  to,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center leading-normal rounded-[28px] font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-neutral-dark transition-colors duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    solid: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary dark:hover:bg-primary-light',
    outline: 'border border-primary text-primary hover:bg-primary-light hover:text-white focus:ring-primary dark:text-primary-light dark:border-primary-light dark:hover:bg-primary-light/20 dark:hover:text-white',
    ghost: 'text-primary hover:bg-primary-light hover:text-white focus:ring-primary dark:text-primary-light dark:hover:bg-primary-light/20 dark:hover:text-white',
    link: 'text-primary hover:underline focus:ring-primary dark:text-primary-light dark:hover:text-primary',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm whitespace-nowrap',
    md: 'px-4 py-2 text-base whitespace-nowrap',
    lg: 'px-6 py-3 text-lg whitespace-nowrap',
  };

  const loadingSpinner = (
    <svg className={`animate-spin h-5 w-5 text-current ${leftIcon || rightIcon ? (leftIcon ? 'ltr:mr-2 rtl:ml-2' : 'ltr:ml-2 rtl:mr-2') : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );

  const fullWidthClass = fullWidth ? 'w-full' : '';
  const finalClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidthClass} ${className}`;
  const buttonProps = { ...props };
  const buttonType = buttonProps.type ?? 'button';

  if (to) {
    return (
      <Link
        to={to}
        className={finalClassName}
        onClick={buttonProps.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        style={buttonProps.style}
      >
        {isLoading && !leftIcon && !rightIcon && loadingSpinner}
        {isLoading && leftIcon && loadingSpinner}
        {!isLoading && leftIcon && <span className="ltr:mr-2 rtl:ml-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ltr:ml-2 rtl:mr-2">{rightIcon}</span>}
        {isLoading && rightIcon && loadingSpinner}
      </Link>
    );
  }

  return (
    <button
      {...buttonProps}
      type={buttonType}
      className={finalClassName}
      disabled={isLoading || buttonProps.disabled}
    >
      {isLoading && !leftIcon && !rightIcon && loadingSpinner}
      {isLoading && leftIcon && loadingSpinner}
      {!isLoading && leftIcon && <span className="ltr:mr-2 rtl:ml-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ltr:ml-2 rtl:mr-2">{rightIcon}</span>}
      {isLoading && rightIcon && loadingSpinner}
    </button>
  );
};

export default Button;
