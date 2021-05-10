import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import validator from 'validator';

import GoogleFB from './GoogleFB';
import { startLoginWithEmailPass } from '../../actions/authActions';
import { setError } from '../../actions/errorActions';
import { connect } from 'react-redux';

type Props = {
  setError: (...props: any) => {};
};

const LoginPage: React.FC<Props> = ({ setError }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      if (!validator.isEmail(email))
        throw new Error(
          'This email is invalid. Please type a correct email...'
        );

      await startLoginWithEmailPass({ email, password });

      setEmail('');
      setPassword('');
    } catch (e) {
      setError({ message: e.message, title: 'Login' });
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="form__container">
      <div className="form__wrapper">
        <form onSubmit={handleFormSubmit}>
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
              value={email}
              onChange={handleEmailChange}
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
              value={password}
              onChange={handlePasswordChange}
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
    </div>
  );
};

export default connect(null, { setError })(LoginPage);
