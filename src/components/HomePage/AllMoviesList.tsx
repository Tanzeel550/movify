// import { NavLink } from 'react-router-dom';
// import React from 'react';
//
// const SingleMovie = ({ movie }) => (
//     <NavLink className="movie__item col-12 row" to={`/update/${movie.id}`}>
//         <div className="col-md-2 col-4 movie__item--poster">
//             <img src={movie.Poster} alt="" />
//         </div>
//
//         <div className="movie__item--text col-md-10 col-8">
//             <h5 className="movie__item--text-text">{movie.name}</h5>
//             {movie.watched ? (
//                 <div>
//                     <p>You watched this movie on {movie.dateWatched}</p>
//                     <h5>What You Learnt from it?</h5>
//                     <p>{movie.whatYouLearnt || 'Nothing Learnt '}</p>
//                 </div>
//             ) : (
//                 'You really need to watch this movie'
//             )}
//         </div>
//     </NavLink>
// );
//
// const AllMoviesList = ({ movies }) => (
//     <div className="all__movies row">
//         {movies.map((movie, i) => (
//             <SingleMovie movie={movie} key={i} />
//         ))}
//     </div>
// );
//
// export default AllMoviesList;

import { NavLink } from 'react-router-dom';
import React from 'react';

const SingleMovie = ({ movie }) => (
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

const AllMoviesList = ({ movies }) => (
  <div className="all__movies">
    {movies.map((movie, i) => (
      <SingleMovie movie={movie} key={i} />
    ))}
  </div>
);

export default AllMoviesList;
