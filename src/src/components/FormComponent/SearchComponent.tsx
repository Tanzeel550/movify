import React from 'react';

const SearchComponent = ({ movies, handleSearchItemClick }) => (
  <ul className="row search--container">
    {movies.map((movie, index) => (
      <li
        className="col-sm-12 row search--item"
        onClick={handleSearchItemClick}
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
