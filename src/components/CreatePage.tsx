import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { startCreateMovie } from '../actions/moviesAsyncActions';
import MovieForm from './FormComponent/MovieForm';
import VerifyEmailBtn from './Utils/VerifyEmailBtn';
import VerifiedComp from './Utils/VerifiedComp';

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

export const CreatePage = ({
  history,
  startCreateMovie,
  emailVerified,
}: PropsFromRedux) => {
  return (
    <VerifiedComp emailVerified={emailVerified}>
      <MovieForm
        actionType="add"
        handleFormSubmit={async movie => {
          await startCreateMovie({ movie });
          history.push('/');
        }}
      />
    </VerifiedComp>
  );
};

export default connector(CreatePage);
