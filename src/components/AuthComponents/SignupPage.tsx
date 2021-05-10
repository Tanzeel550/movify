import React from 'react';
import validator from 'validator';
import { NavLink } from 'react-router-dom';

import GoogleFB from './GoogleFB';
import {
  startCheckUserEmailLink,
  startSignUpWithEmailPass,
} from '../../actions/authActions';
import showMessage from '../Utils/MessageModal';
import Modal from '../Utils/MessageModal';

class SingUpPage extends React.Component {
  public state: any;
  public setState: any;

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);

    this.setMessage = this.setMessage.bind(this);
  }

  setMessage = message => this.setState({ message });

  handleTextChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  async componentDidMount() {
    try {
      await startCheckUserEmailLink(window.location.href);
    } catch (e) {
      showMessage(e.message);
    }
  }

  handleFormSubmit = async e => {
    e.preventDefault();
    try {
      if (!validator.isEmail(this.state.email))
        throw new Error(
          'This email is invalid. Please type a correct email...'
        );
      else if (this.state.password !== this.state.confirmPassword)
        throw new Error("Passwords don't match.");

      await startSignUpWithEmailPass({ ...this.state });

      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
      });

      throw new Error(
        'An Email Link has been sent to Your Email Address. Please Check Your inbox...'
      );
    } catch (e) {
      // this.setMessage(e.message);
      this.setState({ message: e.message });
    }
  };

  render() {
    return (
      <div className="form__container">
        <div className="form__wrapper">
          <form onSubmit={this.handleFormSubmit}>
            <span className="form__title text-center">Sign Up</span>

            <div
              className="form__input--wrapper"
              data-validate="Username is required"
            >
              <span className="form__input--label">Username</span>
              <input
                className="form__input--input"
                type="email"
                name="email"
                placeholder="Type your username"
                value={this.state.email}
                onChange={this.handleTextChange}
                required
              />
              <span className="form__input--icon" data-symbol="&#xf206;" />
            </div>

            <div
              className="form__input--wrapper"
              data-validate="Password is required"
            >
              <span className="form__input--label">Password</span>
              <input
                className="form__input--input"
                type="password"
                name="password"
                placeholder="Type your password"
                value={this.state.password}
                onChange={this.handleTextChange}
                required
              />
              <span className="form__input--icon" data-symbol="&#xf190;" />
            </div>

            <div
              className="form__input--wrapper"
              data-validate="Confirm Password is required"
            >
              <span className="form__input--label">Confirm Password</span>
              <input
                className="form__input--input"
                type="password"
                name="confirmPassword"
                placeholder="Type your password to Confirm"
                value={this.state.confirmPassword}
                onChange={this.handleTextChange}
                required
              />
              <span className="form__input--icon" data-symbol="&#xf190;" />
            </div>

            <div className="form__button--container">
              <div className="form__button--wrapper">
                <div className="form__button--behind" />
                <button className="form__button--actual">Sign Up</button>
              </div>
            </div>

            <div className="text-center txt1">
              <span> Or Sign Up Using </span>
            </div>
            <GoogleFB />
            <div className="flex-col-c">
              <span className="txt1">Or Login Using</span>

              <NavLink to="/login" className="txt2">
                Login
              </NavLink>
            </div>
          </form>
        </div>
        <Modal
          message={this.state.message}
          clearMessage={() => this.setState({ message: null })}
          text="Sign Up"
        />
      </div>
    );
  }
}

export default SingUpPage;
