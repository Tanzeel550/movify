import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router';
import HomePage from '../components/HomePage/HomePage';
import CreatePage from '../components/CreatePage';
import UpdatePage from '../components/UpdatePage';
import Header from '../components/BaseComponents/Header';
import Footer from '../components/BaseComponents/Footer';
import PrivateRouter from './PrivateRouter';
import PublicRouter from './PublicRouter';
import LoginPage from '../components/AuthComponents/LoginPage';
import SingUpPage from '../components/AuthComponents/SignupPage';
import MessageModal from '../components/Utils/MessageModal';
import { createBrowserHistory } from 'history';
import { connect } from 'react-redux';
import { clearError } from '../actions/errorActions';

export const browserHistory = new createBrowserHistory();

const AppRouter = ({ clearError, error, text }) => (
  <Router history={browserHistory}>
    <Header />
    <Switch>
      <PublicRouter component={LoginPage} path="/login" exact={true} />
      <PublicRouter component={SingUpPage} path="/signUp" exact={true} />

      <PrivateRouter component={HomePage} path="/" exact={true} />
      <PrivateRouter component={CreatePage} path="/create" exact={true} />
      <PrivateRouter component={UpdatePage} path="/update/:id" exact={true} />

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
    <MessageModal message={error} text={text} clearMessage={clearError} />
  </Router>
);

const mapStateToProps = ({ error: { error, text } }) => ({ error, text });

export default connect(mapStateToProps, { clearError })(AppRouter);
