import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PublicRouter = ({ isAuthenticated, ...rest }) =>
  isAuthenticated ? <Redirect to="/" /> : <Route {...rest} />;

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PublicRouter);
