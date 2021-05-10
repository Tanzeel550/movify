import React from 'react';
import MovieForm from './FormComponent/MovieForm';
import { connect } from 'react-redux';
import { startDeleteMovie, startUpdateMovie } from '../actions/moviesActions';
import { Redirect } from 'react-router';

const UpdatePage = props =>
  props.emailVerified ? (
    props.movie ? (
      <MovieForm
        actionType="update"
        movie={props.movie}
        handleFormSubmit={async data => {
          await props.startUpdateMovie(data);
          props.history.push('/');
        }}
        handleMovieDeletion={async () => {
          await props.startDeleteMovie(props.movie.id);
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

const mapStateToProps = (state, props) => ({
  movie: state.movies.find(movie => movie.id === props.match.params.id),
  emailVerified: state.auth.user.emailVerified,
});

const mapDispatchToProps = dispatch => ({
  startUpdateMovie: data => dispatch(startUpdateMovie(data)),
  startDeleteMovie: id => dispatch(startDeleteMovie(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePage);
