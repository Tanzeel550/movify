import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from '../consts/actionTypes';

export const setErrorAction: CaseReducer<
  ErrorState,
  PayloadAction<ErrorState>
> = (state, action) => {
  return { title: action.payload.title, message: action.payload.message };
};

export const clearErrorAction: CaseReducer<
  ErrorState,
  PayloadAction<ErrorState>
> = (state, action) => {
  return { title: '', message: '' };
};
