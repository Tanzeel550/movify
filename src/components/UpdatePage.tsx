import React from 'react';
import MovieForm from './FormComponent/MovieForm';
import { connect, ConnectedProps } from 'react-redux';
import {
  startDeleteMovie,
  startUpdateMovie,
} from '../actions/moviesAsyncActions';
import { Redirect } from 'react-router';
import { FireDBMovieItem } from '../types/APITypes';

type StateTypes = {
  movies: FireDBMovieItem[];
  auth: { user: { emailVerified: boolean } };
};

type PropsType = {
  history: {
    push: (link: string) => {};
  };
  match: { params: { id: string } };
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

const UpdatePage = (props: Props) =>
  props.emailVerified ? (
    props.movie ? (
      <MovieForm
        actionType="update"
        movie={props.movie}
        handleFormSubmit={async data => {
          await props.startUpdateMovie({ id: props.movie!.id, movie: data });
          props.history.push('/');
        }}
        handleMovieDeletion={async () => {
          await props.startDeleteMovie({ id: props.movie!.id });
          props.history.push('/');
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
    )
  ) : (
    <div className="container jumbotron">
      <h3 className="u-text-colorized">
        You cannot access this page because your Email is not verified
      </h3>
      <button className="btn btn-primary btn-lg mt-3">Verify Email</button>
    </div>
  );

export default connector(UpdatePage);
