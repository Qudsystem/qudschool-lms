
import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { DropdownItem as DropdownItemType } from '../types';
import useI18n from '../hooks/useI18n';

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItemType[];
  menuWidthClass?: string;
  menuAlign?: 'left' | 'right';
  className?: string;
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, items, menuWidthClass = 'w-56', menuAlign = 'right', className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { t, language } = useI18n(); // Get language for potential alignment adjustments

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (itemAction?: () => void) => {
    if (itemAction) {
      itemAction();
    }
    setIsOpen(false); 
  };

  const alignClass = menuAlign === 'right' 
    ? (language === 'ar' ? 'left-0' : 'right-0') 
    : (language === 'ar' ? 'right-0' : 'left-0');
  
  const originClass = menuAlign === 'right'
    ? (language === 'ar' ? 'origin-top-left' : 'origin-top-right')
    : (language === 'ar' ? 'origin-top-right' : 'origin-top-left');


  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <div onClick={handleToggle} className="cursor-pointer">
        {trigger}
      </div>

      {isOpen && (
        <div
          className={`${originClass} absolute ${alignClass} mt-2 ${menuWidthClass} rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black dark:ring-gray-700 ring-opacity-5 focus:outline-none z-50 py-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          {items.map((item, index) => (
            <Fragment key={item.labelKey || `item-${index}`}>
              {item.isDivider ? (
                <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
              ) : item.element ? (
                 <div 
                    className={`block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 ${item.className || ''}`}
                    onClick={() => handleItemClick(item.onClick)}
                 >
                    {item.element}
                </div>
              ) : item.path ? (
                <Link
                  to={item.path}
                  className={`block px-4 py-2 text-sm ${
                    item.disabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  } ${item.className || ''}`}
                  onClick={() => handleItemClick(item.onClick)}
                  role="menuitem"
                  aria-disabled={item.disabled}
                >
                  {item.icon && <span className="ltr:mr-2 rtl:ml-2 inline-block align-middle">{React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4"})}</span>}
                  {item.labelKey ? t(item.labelKey) : ''}
                </Link>
              ) : (
                <button
                  onClick={() => handleItemClick(item.onClick)}
                  disabled={item.disabled}
                  className={`block w-full ${language === 'ar' ? 'text-right' : 'text-left'} px-4 py-2 text-sm ${
                    item.disabled ? 'text-gray-400 dark:text-gray-500 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  } ${item.className || ''}`}
                  role="menuitem"
                >
                  {item.icon && <span className="ltr:mr-2 rtl:ml-2 inline-block align-middle">{React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4"})}</span>}
                  {item.labelKey ? t(item.labelKey) : ''}
                </button>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
