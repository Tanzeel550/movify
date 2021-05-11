import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route } from 'react-router';

type StateTypes = {
  auth: {
    isAuthenticated: boolean;
  };
};

const mapStateToProps = (state: StateTypes) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & {
  component: any;
  path: string;
  exact: boolean;
};

const PublicRouter: React.FC<Props> = ({
  isAuthenticated,
  path,
  exact,
  component,
}: Props) =>
  isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Route path={path} exact={exact} component={component} />
  );

export default connector(PublicRouter);
