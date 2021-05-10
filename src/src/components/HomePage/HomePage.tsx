import React from 'react';
import { connect } from 'react-redux';
import AllMoviesList from './AllMoviesList';
import { startGetAllMovies } from '../../actions/moviesActions';
import { trackPromise } from 'react-promise-tracker';
import { PROMISE_AREAS } from '../../config';
import PromiseLoading from '../Utils/PromiseLoading';

const getFirstName = name => {
  const firstName = name.split(
    /[`1234567890!@#£€$¢¥§%°^&*()-_+={}[]|\/:;"'<>,.?]+/
  )[0];
  return firstName[0].toUpperCase() + firstName.substring(1);
};

class HomePage extends React.Component {
	public state: any;
	public props: any;
	public setState: any;

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    await trackPromise(
      this.props.startGetAllMovies(),
      PROMISE_AREAS.GET_ALL_MOVIES
    );
    this.setState({ loading: false });
  }

  render() {
    return (
      <div>
        <div className="home__user--info">
          <div className="container u-text-white">
            <span>Hi </span>
            <span className="u-text-large">
              {getFirstName(this.props.name)}
            </span>
            ,<p className="u-text-white">Welcome to Movify 😀️</p>
            <p className="u-text-white">Add Movies and make them YOURS!</p>
          </div>
        </div>

        <div className="container">
          <PromiseLoading area={PROMISE_AREAS.GET_ALL_MOVIES} />
          {!this.state.loading &&
            (this.props.movies.length > 0 ? (
              <AllMoviesList movies={this.props.movies} />
            ) : (
              <h1 className="u-text-colorized">
                Please add Movies to Continue...
              </h1>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movies: state.movies,
  name: state.auth.user.name || state.auth.user.email,
});

const mapDispatchToProps = dispatch => ({
  startGetAllMovies: async () => await dispatch(startGetAllMovies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
