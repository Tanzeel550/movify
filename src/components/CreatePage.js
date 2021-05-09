import React from 'react';
import { connect } from 'react-redux';
import { startCreateMovie } from '../actions/moviesActions';
import FormComponent from './FormComponent/FormComponent';
import VerifyEmailBtn from './Utils/VerifyEmailBtn';

const CreatePage = props => {
  return props.emailVerified ? (
    <FormComponent
      actionType="add"
      handleFormSubmit={async data => {
        await props.startCreateMovie(data);
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

const mapStateToProps = state => ({
  emailVerified: state.auth.user.emailVerified,
});

const mapDispatchToProps = dispatch => ({
  startCreateMovie: data => dispatch(startCreateMovie(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePage);
