import { NavLink } from 'react-router-dom';
import React from 'react';
import { FireDBMovieItem } from '../../consts/actionTypes';

type Props = {
  movie: FireDBMovieItem;
};

const SingleMovie = ({ movie }: Props) => (
  <NavLink className="movie__item" to={`/update/${movie.id}`}>
    <div className="movie__item--poster">
      <img src={movie.Poster} alt="" />
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
        'You really need to watch this movie'
      )}
    </div>
  </NavLink>
);

export default SingleMovie;