import { NavLink } from 'react-router-dom';
import React from 'react';
import { FireDBMovieItem } from '../../types/APITypes';

type Props = {
  movie: FireDBMovieItem;
};

const SingleMovie = ({ movie }: Props) => (
  <NavLink className="movie__item" to={`/update/${movie.id}`}>
    <div className="movie__item--poster">
      <img src={movie.Poster} alt={movie.name} />
    </div>

    <div className="movie__item--text">
      <h5 className="movie__item--text-text">{movie.name}</h5>
      {movie.watched ? (
        <div>
          <p>You watched this movie on {movie.dateWatched}</p>
          <h5>What You Learned from it?</h5>
          <p className=".u-tex-ellipsis">
            {movie.whatYouLearnt || 'Nothing Learned... Just watched! '}
          </p>
        </div>
      ) : (
        <p>You really need to watch this movie</p>
      )}
    </div>
  </NavLink>
);

export default SingleMovie;
