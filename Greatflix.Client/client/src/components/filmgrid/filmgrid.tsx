import React from 'react';
import Slide from '../slide/slide';
import {
  TMDbMovie,
  TMDbTVShow
} from '../../redux/types';
import { 
  TMDbMediaType 
} from '../../globals';
import {
  GFDataProps
} from '../slider/gfslider';
import {
  styles
} from './style';

import './filmgrid.css';

export interface FilmGridProps {
  mediaType: TMDbMediaType.movie | TMDbMediaType.tv;
  data: GFDataProps[]
  onClickSlide: (filmId: number, mediaType: TMDbMediaType) => void;
}

const FilmGrid: React.FC<FilmGridProps> = ({
  mediaType = TMDbMediaType.movie,
  data = [],
  onClickSlide
}: FilmGridProps) => {

  return (
    <>
      <div className='container'>
        <div style={styles.gridWrapper}>
          {data.map((item: GFDataProps, idx: number) => {
            let filmId = item.filmId ? item.filmId : -1;
            return (
              <Slide 
                className='grid-slide'
                key={idx}
                title={item.title}
                onClick={() => onClickSlide(filmId, mediaType)}
                imagePath={item.imagePath}
              />
            )
          })}
        </div>
      </div>
    </>
  );
}

export default FilmGrid;