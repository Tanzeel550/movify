import React from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';

import GoogleFB from './GoogleFB';
import { startLoginWithEmailPass } from '../../actions/authActions';
import { connect, ConnectedProps } from 'react-redux';
import { setError } from '../../reducers/errorReducer';

const connector = connect(null, { setError, startLoginWithEmailPass });
type Props = ConnectedProps<typeof connector>;

export class LoginPage extends React.Component<Props> {
  state = {
    email: '',
    password: '',
  };

  handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    const { email, password } = this.state;
    e.preventDefault();
    try {
      if (!validator.isEmail(email))
        throw new Error('This email is invalid. Please type a valid email...');

      if (!password) throw new Error('Please type a valid password');

      await this.props.startLoginWithEmailPass({ email, password });

      await this.setState({
        email: '',
        password: '',
      });
    } catch (e) {
      this.props.setError({ message: e.message, title: 'Login' });
    }
  };

  handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ email: e.target.value });
  };

  handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="form__container">
        <div className="form__wrapper">
          <form onSubmit={this.handleFormSubmit}>
            <span className="form__title text-center">Login</span>

            <div
              className="form__input--wrapper"
              movie-validate="Username is required"
            >
              <span className="form__input--label">Username</span>
              <input
                className="form__input--input"
                type="email"
                name="username"
                placeholder="Type your username"
                value={this.state.email}
                onChange={this.handleEmailChange}
                required
              />
              <span className="form__input--icon" movie-symbol="&#xf206;" />
            </div>

            <div
              className="form__input--wrapper "
              movie-validate="Password is required"
            >
              <span className="form__input--label">Password</span>
              <input
                className="form__input--input"
                type="password"
                name="pass"
                placeholder="Type your password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
                required
              />
              <span className="form__input--icon" movie-symbol="&#xf190;" />
            </div>

            {/*<div className="text-right forgot-password">*/}
            {/*    <a href="#"> Forgot password? </a>*/}
            {/*</div>*/}

            <div className="form__button--container">
              <div className="form__button--wrapper">
                <div className="form__button--behind" />
                <button className="form__button--actual">Login</button>
              </div>
            </div>

            <div className="text-center txt1">
              <span> Or Login Using </span>
            </div>
            <GoogleFB />
            <div className="flex-col-c">
              <span>Or Sign Up Using</span>

              <NavLink to="/signUp" className="txt2">
                Sign Up
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connector(LoginPage);
