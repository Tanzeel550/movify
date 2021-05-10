import React from 'react';
import { APIMovieResultByTitle } from '../../consts/actionTypes';

type Props = {
  movie: APIMovieResultByTitle;
};

const MovieDetails: React.FC<Props> = ({ movie }: Props) => {
  const {
    Title,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Country,
    Awards,
    imdbRating,
    BoxOffice,
  } = movie;

  return (
    <div className="flex-col">
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Title</div>
        <div className="flex-basis-80">{Title}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Released</div>
        <div className="flex-basis-80">{Released}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Duration</div>
        <div className="flex-basis-80">{Runtime}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Genre</div>
        <div className="flex-basis-80">{Genre}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Director</div>
        <div className="flex-basis-80">{Director}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Writer</div>
        <div className="flex-basis-80">{Writer}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Actors</div>
        <div className="flex-basis-80">{Actors}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Plot</div>
        <div className="flex-basis-80">{Plot}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Country</div>
        <div className="flex-basis-80">{Country}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">Awards</div>
        <div className="flex-basis-80">{Awards}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">IMDB Rating</div>
        <div className="flex-basis-80">{imdbRating}</div>
      </div>
      <div className="flex-row flex-content-center">
        <div className="flex-basis-20 u-text-large">BOX Office</div>
        <div className="flex-basis-80">{BoxOffice}</div>
      </div>
    </div>
  );
};

export default MovieDetails;

//        <div className="col-12 row mt-lg-5">
//             <div className="col-md-4 col-6">
//                 <b className="u-text-large">Name</b>: {Title}
//             </div>
//             <div className="col-md-4 col-6">
//                 <b className="u-text-large">Release</b>: {Released}
//             </div>
//             <div className="col-md-4 col-6">
//                 <b className="u-text-large">Box Office</b>: {BoxOffice}
//             </div>
//             <div className="col-md-4 col-6">
//                 <b className="u-text-large">Runtime</b>: {Runtime}
//             </div>
//             <div className="col-md-4 col-6">
//                 <b className="u-text-large">Director</b>: {Director}
//             </div>
//             <div className="col-md-4 col-6">
//                 <b className="u-text-large">IMDB Rating</b>: {imdbRating}
//             </div>
//             <div className="col-md-12">
//                 <b className="u-text-large">Genre</b>: {Genre}
//             </div>
//             <div className="col-md-12">
//                 <b className="u-text-large">Actors</b>: {Actors}
//             </div>
//             <div className="col-md-12">
//                 <b className="u-text-large">Writers</b>: {Writer}
//             </div>
//             <div className="col-md-12">
//                 <b className="u-text-large">Countries</b>: {Country}
//             </div>
//             <div className="col-md-12">
//                 <b className="u-text-large">Awards</b>: {Awards}
//             </div>
//             <div className="col-md-12">
//                 <b className="u-text-large">Plot</b>: {Plot}
//             </div>
//         </div>
