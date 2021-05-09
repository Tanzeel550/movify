import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import HomePage from '../components/HomePage/HomePage';
import CreatePage from '../components/CreatePage';
import UpdatePage from '../components/UpdatePage';
import Header from '../components/BaseComponents/Header';
import Footer from '../components/BaseComponents/Footer';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import LoginPage from '../components/AuthComponents/LoginPage';
import SingUpPage from '../components/AuthComponents/SignupPage';
import { firebase } from '../firebase/firebase';
import { login, logout } from '../actions/authActions';
import LoadingDots from '../components/Utils/LoadingDots';
import MessageModal from '../components/Utils/MessageModal';

class AppRouter extends React.Component {
  state = {
    loading: true,
    message: null,
  };

  componentDidMount() {
    firebase
      .auth()
      .onAuthStateChanged(user =>
        user ? this.props.login(user) : this.props.logout()
      );

    setTimeout(() => this.setState({ loading: false }), 2000);

    window.addEventListener('offline', () =>
      this.setState({
        message:
          'You have disconnected. Please check your Connection and then Try Again...',
      })
    );
  }

  render() {
    return (
      <>
        {!this.state.loading ? (
          <BrowserRouter>
            <Header />
            <Switch>
              <PublicRouter component={LoginPage} path="/login" exact={true} />
              <PublicRouter
                component={SingUpPage}
                path="/signUp"
                exact={true}
              />

              <PrivateRouter component={HomePage} path="/" exact={true} />
              <PrivateRouter
                component={CreatePage}
                path="/create"
                exact={true}
              />
              <PrivateRouter
                component={UpdatePage}
                path="/update/:id"
                exact={true}
              />

              <Route path="*">
                <div className="container jumbotron">
                  <h1>This Page does not exist! Go back</h1>
                  <button
                    className="btn btn-lg btn-primary"
                    onClick={() => <Redirect to="/" />}
                  >
                    Go to Home
                  </button>
                </div>
              </Route>
            </Switch>
            <Footer />
            <MessageModal
              message={this.state.message}
              title="Network"
              clearMessage={() => this.setState({ message: null })}
            />
          </BrowserRouter>
        ) : (
          <LoadingDots />
        )}
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login({ user })),
  logout: () => dispatch(logout()),
});

export default connect(null, mapDispatchToProps)(AppRouter);
