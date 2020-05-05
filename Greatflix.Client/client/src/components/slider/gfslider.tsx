import React from 'react';
import { styles } from './styles';
import { 
  TMDbMovie, 
  TMDbTVShow, 
  TMDbPerson 
} from '../../redux/types';

import './gfslider.css';
import { TMDbMediaType } from '../../globals';
import { ToggleFilmModalAction } from '../../redux/reducers/filmModal/types';
import { toggleFilmModal } from '../../redux/reducers/filmModal/actions';
import Slide from '../slide/slide';

export interface GFDataProps {
  filmId?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  imagePath?: string;
}

interface GFSliderProps {
  mediaType?: TMDbMediaType;
  data: GFDataProps[];
  onClickSlide: (filmId: number, mediaType: TMDbMediaType) => void;
}

const GFSlider: React.FC<GFSliderProps> = ({
  data = [],
  onClickSlide,
  mediaType = TMDbMediaType.movie
}: GFSliderProps) => {
  return (
    <>
      <div 
        className='container'>
        <div style={styles.sliderRow}>
          {data.map((item, idx) => {
            let filmId = item.filmId ? item.filmId : -1;
            let mt = mediaType;
            if (mediaType === TMDbMediaType.all) {
              if (!item.title)
                mt = TMDbMediaType.tv;
              else 
                mt = TMDbMediaType.movie;
            }
            return (
              <Slide
                key={idx}
                title={item.title}
                onClick={() => onClickSlide && onClickSlide(filmId, mt)}
                imagePath={item.imagePath}
                />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default GFSlider;

