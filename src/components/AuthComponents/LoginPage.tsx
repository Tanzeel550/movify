import React from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator/es';

import GoogleFB from './GoogleFB';
import {
  startCheckUserEmailLink,
  startOnlyLogin,
} from '../../actions/authActions';
import Modal from '../Utils/MessageModal';
import { setError } from '../../actions/errorActions';
import { connect } from 'react-redux';

class LoginPage extends React.Component {
  public setState: any;
  public props: any;
  state = {
    email: '',
    password: '',
    message: null,
  };

  setMessage(message) {
    this.setState({ message });
  }

  handleTextChange(e) {
    this.setState({
      [e.target.type]: e.target.value,
    });
  }

  componentDidMount() {
    startCheckUserEmailLink(window.location.href)
      .then()
      .catch(e => this.props.setError({ error: e.message }));
  }

  async handleFormSubmit(e) {
    e.preventDefault();
    try {
      if (!validator.isEmail(this.state.email))
        throw new Error(
          'This email is invalid. Please type a correct email...'
        );

      await startOnlyLogin(this.state);
      // await startLoginAndSendEmailLink(this.state, 'login');

      this.setState({
        email: '',
        password: '',
      });
    } catch (e) {
      setError({ error: e.message, text: 'Login' });
    }
  }

  render() {
    return (
      <div className="form__container">
        <div className="form__wrapper">
          <form onSubmit={this.handleFormSubmit}>
            <span className="form__title text-center">Login</span>

            <div
              className="form__input--wrapper"
              data-validate="Username is required"
            >
              <span className="form__input--label">Username</span>
              <input
                className="form__input--input"
                type="email"
                name="username"
                placeholder="Type your username"
                value={this.state.email}
                onChange={this.handleTextChange}
                required
              />
              <span className="form__input--icon" data-symbol="&#xf206;" />
            </div>

            <div
              className="form__input--wrapper "
              data-validate="Password is required"
            >
              <span className="form__input--label">Password</span>
              <input
                className="form__input--input"
                type="password"
                name="pass"
                placeholder="Type your password"
                value={this.state.password}
                onChange={this.handleTextChange}
                required
              />
              <span className="form__input--icon" data-symbol="&#xf190;" />
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

        <Modal
          text="Login"
          clearMessage={() => this.setState({ message: null })}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default connect(null, { setError })(LoginPage);
