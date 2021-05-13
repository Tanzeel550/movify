import React from 'react';
import MovieForm from './FormComponent/MovieForm';
import { connect, ConnectedProps } from 'react-redux';
import {
  startDeleteMovie,
  startUpdateMovie,
} from '../actions/moviesAsyncActions';
import { Redirect } from 'react-router';
import { FireDBMovieItem } from '../types/APITypes';
import VerifiedComp from './Utils/VerifiedComp';

type StateTypes = {
  movies: FireDBMovieItem[];
  auth: { user: { emailVerified: boolean } };
};

type PropsType = {
  history: {
    push: (link: string) => {};
  };
  match: { params: { id: string } };
  movie: FireDBMovieItem;
};

const mapStateToProps = (state: StateTypes, props: PropsType) => ({
  movie: state.movies.find(movie => movie.id === props.match.params.id),
  emailVerified: state.auth.user.emailVerified,
  history: props.history,
});

const connector = connect(mapStateToProps, {
  startUpdateMovie,
  startDeleteMovie,
});

type Props = ConnectedProps<typeof connector>;

export const UpdatePage = ({
  movie,
  emailVerified,
  history,
  startDeleteMovie,
  startUpdateMovie,
}: Props) => (
  <VerifiedComp emailVerified={emailVerified}>
    {movie ? (
      <MovieForm
        actionType="update"
        movie={movie}
        handleFormSubmit={async data => {
          await startUpdateMovie({ id: movie!.id, movie: data });
          history.push('/');
        }}
        handleMovieDeletion={async () => {
          await startDeleteMovie({ id: movie!.id });
          history.push('/');
        }}
      />
    ) : (
      <h1 className="u-text-colorized">
        No Movie found on this page. Please go back and update some other Movie
        <button
          className="btn u-btn-colorized"
          onClick={() => <Redirect to="/" />}
        >
          Go Home
        </button>
      </h1>
    )}
  </VerifiedComp>
);

export default connector(UpdatePage);
