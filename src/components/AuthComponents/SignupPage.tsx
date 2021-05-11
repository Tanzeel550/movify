import React, { useState } from 'react';
import validator from 'validator';
import { NavLink } from 'react-router-dom';
import GoogleFB from './GoogleFB';
import { startSignUpWithEmailPass } from '../../actions/authActions';
import { connect } from 'react-redux';
import { setError } from '../../actions/errorActions';
import { ErrorActionsReturnType } from '../../consts/actionTypes';

type Props = {
  setError: ({
    message,
    title,
  }: {
    message: string;
    title: string;
  }) => ErrorActionsReturnType;
};

const SingUpPage: React.FC<Props> = ({ setError }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setConfirmPassword(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (!validator.isEmail(email))
        throw new Error(
          'This email is invalid. Please type a correct email...'
        );
      else if (password !== confirmPassword)
        throw new Error("Passwords don't match.");

      await startSignUpWithEmailPass({ email, password });
    } catch (e) {
      setError({ message: e.message, title: 'Signup' });
    }
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <form onSubmit={handleFormSubmit}>
          <span className="form__title text-center">Sign Up</span>

          <div
            className="form__input--wrapper"
            movie-validate="Username is required"
          >
            <span className="form__input--label">Username</span>
            <input
              className="form__input--input"
              type="email"
              name="email"
              placeholder="Type your username"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <span className="form__input--icon" movie-symbol="&#xf206;" />
          </div>

          <div
            className="form__input--wrapper"
            movie-validate="Password is required"
          >
            <span className="form__input--label">Password</span>
            <input
              className="form__input--input"
              type="password"
              name="password"
              placeholder="Type your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className="form__input--icon" movie-symbol="&#xf190;" />
          </div>

          <div
            className="form__input--wrapper"
            movie-validate="Confirm Password is required"
          >
            <span className="form__input--label">Confirm Password</span>
            <input
              className="form__input--input"
              type="password"
              name="confirmPassword"
              placeholder="Type your password to Confirm"
              value={confirmPassword}
              onChange={handlePasswordConfirmChange}
              required
            />
            <span className="form__input--icon" movie-symbol="&#xf190;" />
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
    </div>
  );
};

export default connect(null, { setError })(SingUpPage);
