import React from 'react';
import { styles } from './styles';

import './slide.css';

interface SlideProps {
  className?: string;
  title?: string;
  onClick?: () => void;
  imagePath?: string;
}

const Slide: React.FC<SlideProps> = ({
  className = '',
  title = '',
  onClick,
  imagePath = ''
}: SlideProps) => {
  return (
    <>
      <div 
        className={`${className ? className : 'slide'} slide-base`}
        onClick={() => onClick && onClick()}>
        <img 
          src={imagePath}
          style={styles.slideImage}/>
        <p 
          style={styles.slideText}>
          {title}
        </p>
      </div>
    </>
  );
}

export default Slide;