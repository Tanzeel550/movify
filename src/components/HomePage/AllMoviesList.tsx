import React from 'react';
import SingleMovie from './SingleMovie';
import { FireDBMovieItem } from '../../types/APITypes';

type Props = {
  movies: FireDBMovieItem[];
};

const AllMoviesList: React.FC<Props> = ({ movies }: Props) => (
  <div className="all__movies">
    {movies.map((movie, i) => (
      <SingleMovie movie={movie} key={i} />
    ))}
  </div>
);

export default AllMoviesList;
