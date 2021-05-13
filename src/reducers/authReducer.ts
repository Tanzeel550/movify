import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthDefaultType, AuthUserType } from '../types/AuthTypes';

const loginAction: CaseReducer<AuthDefaultType, PayloadAction<AuthUserType>> = (
  state,
  action
) => {
  return {
    isAuthenticated: true,
    user: action.payload.user,
  };
};

const logoutAction: CaseReducer<AuthDefaultType, PayloadAction> = (
  state,
  action
) => {
  return {
    isAuthenticated: false,
    user: {},
  };
};

const AuthReducer = createSlice({
  name: 'Auth',
  initialState: {
    isAuthenticated: false,
    user: {},
  } as AuthDefaultType,
  reducers: {
    login: loginAction,
    logout: logoutAction,
  },
});

export const { login, logout } = AuthReducer.actions;
export default AuthReducer.reducer;
