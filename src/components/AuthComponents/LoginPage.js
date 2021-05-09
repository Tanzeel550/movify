import React from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator/es';

import GoogleFB from './GoogleFB';
import {
  startCheckUserEmailLink,
  startOnlyLogin,
} from '../../actions/authActions';
import Modal from '../Utils/MessageModal';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      message: null,
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.setMessage = this.setMessage.bind(this);
  }

  setMessage = message => this.setState({ message });

  handleTextChange = e => {
    this.setState({
      [e.target.type]: e.target.value,
    });
  };

  async componentDidMount() {
    try {
      await startCheckUserEmailLink(window.location.href);
    } catch (e) {
      this.setMessage(e.message);
    }
  }

  handleFormSubmit = async e => {
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
      this.setMessage(e.message);
    }
  };

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
          title="Login"
          clearMessage={() => this.setState({ message: null })}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default LoginPage;
