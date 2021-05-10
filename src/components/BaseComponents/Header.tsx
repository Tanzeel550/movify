import React from 'react';
import { NavLink } from 'react-router-dom';

import Img from './icon.png';
import { startLogout } from '../../actions/authActions';
import { connect } from 'react-redux';
import VerifyEmailBtn from '../Utils/VerifyEmailBtn';

const Header = ({ isAuthenticated, emailVerified }) => (
  <header className="header">
    <div className="container header__container">
      <div className="header--left">
        <NavLink to="/" className="header--left__item">
          <img src={Img} alt="" className="header--left__item-img" />
          <h2 className="header--left__item-text">Movify</h2>
        </NavLink>
      </div>

      {isAuthenticated ? (
        <div className="header--right">
          {!emailVerified && <VerifyEmailBtn />}
          <NavLink to="/create" className="u-btn-colorized">
            Create
          </NavLink>
          <button
            className="u-btn-colorized u-btn-colorized-active"
            onClick={startLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="header--right">
          <NavLink to="/signUp" className="u-btn-colorized">
            SignUp
          </NavLink>
          <NavLink
            to="login"
            className="u-btn-colorized u-btn-colorized-active"
          >
            Login
          </NavLink>
        </div>
      )}
    </div>
  </header>
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  emailVerified: state.auth.user.emailVerified,
});

export default connect(mapStateToProps)(Header);
