
import React from 'react';

interface GFButtonProps {
  isLoading?: boolean,
  isSelected?: boolean,
  className?: string,
  text?: string;
  onClick?: () => void
}

export const GFButton: React.FC<GFButtonProps> = ({
  isLoading=undefined,
  isSelected=false,
  className='',
  onClick=() => {},
  text=''
}: GFButtonProps) => {
  const isLoadingClassName = isLoading === undefined ? '' : isLoading ? 'is-loading' : '';
  const isSelectedClassName = isSelected ? 'is-selected': '';
  
  return (
    <button 
      className={`button ${isLoadingClassName} ${isSelectedClassName} ${className}`} 
      onClick={() => onClick && onClick()}>
        {text}
    </button>
  );
}

export default GFButton;