import React from 'react';
import { FireDBMovieItem } from '../../consts/actionTypes';
import SingleMovie from './SingleMovie';

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
