import React from 'react';
import { APIMovieResultsBySearch } from '../../consts/actionTypes';

type Props = {
  movies: APIMovieResultsBySearch;
  handleSearchItemClick: (e: string) => {};
};

const SearchComponent: React.FC<Props> = ({
  movies,
  handleSearchItemClick,
}: Props) => (
  <ul className="row search--container">
    {movies.map((movie, index) => (
      <li
        className="col-sm-12 row search--item"
        onClick={handleSearchItemClick.bind(this, movie.Title)}
        key={index}
        movie-movie-name={movie.Title}
      >
        <img src={movie.Poster} alt="Movie" className="col-sm-3" />
        <div className="col-sm-9">{movie.Title}</div>
      </li>
    ))}
  </ul>
);

export default SearchComponent;
