import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { startCreateMovie } from '../actions/moviesAsyncActions';
import MovieForm from './FormComponent/MovieForm';
import VerifyEmailBtn from './Utils/VerifyEmailBtn';

type StateTypes = {
  auth: { user: { emailVerified: boolean } };
  history: { push: (link: string) => {} };
};

const mapStateToProps = ({ auth, history }: StateTypes) => ({
  emailVerified: auth.user.emailVerified,
  history,
});

const connector = connect(mapStateToProps, { startCreateMovie });
type PropsFromRedux = ConnectedProps<typeof connector>;

const CreatePage = (props: PropsFromRedux) => {
  return props.emailVerified ? (
    <MovieForm
      actionType="add"
      handleFormSubmit={async movie => {
        await props.startCreateMovie({ movie });
        props.history.push('/');
      }}
    />
  ) : (
    <div className="container jumbotron">
      <h3 className="u-text-colorized">
        You cannot access this page because your Email is not verified
      </h3>
      <VerifyEmailBtn />
    </div>
  );
};

export default connector(CreatePage);
