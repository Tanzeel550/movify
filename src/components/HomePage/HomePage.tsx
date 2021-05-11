import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import AllMoviesList from './AllMoviesList';
import { PROMISE_AREAS } from '../../consts/config';
import PromiseLoading from '../Utils/PromiseLoading';
import { FireDBMovieItem } from '../../consts/actionTypes';

const getFirstName = (name: string) => {
  const firstName = name.split(
    /[`1234567890!@#£€$¢¥§%°^&*()-_+={}[]|\/:;"'<>,.?]+/
  )[0];
  return firstName[0].toUpperCase() + firstName.substring(1);
};

type StateTypes = {
  movies: FireDBMovieItem[];
  auth: {
    user: {
      name: string;
      email: string;
    };
  };
};

const mapStateToProps = (state: StateTypes) => ({
  movies: state.movies,
  name: state.auth.user.name || state.auth.user.email,
});

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const HomePage: React.FC<Props> = ({ movies, name }: Props) => {
  return (
    <div>
      <div className="home__user--info">
        <div className="container u-text-white">
          <span>Hi </span>
          <span className="u-text-large">{getFirstName(name)}</span>,
          <p className="u-text-white">Welcome to Movify 😀️</p>
          <p className="u-text-white">Add Movies and make them YOURS!</p>
        </div>
      </div>

      <div className="container">
        <PromiseLoading area={PROMISE_AREAS.GET_ALL_MOVIES} />
        {movies.length > 0 ? (
          <AllMoviesList movies={movies} />
        ) : (
          <h1 className="u-text-colorized">Please add Movies to Continue...</h1>
        )}
      </div>
    </div>
  );
};

export default connector(HomePage);
