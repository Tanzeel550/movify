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

const PrivateRouter: React.FC<Props> = ({
  isAuthenticated,
  component,
  path,
  exact,
}: Props) => {
  return isAuthenticated ? (
    <Route component={component} path={path} exact={exact} />
  ) : (
    <Redirect to="/login" />
  );
};

export default connect(mapStateToProps)(PrivateRouter);
