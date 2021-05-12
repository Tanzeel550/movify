import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrorState } from '../types/ErrorTypes';

const setErrorAction: CaseReducer<ErrorState, PayloadAction<ErrorState>> = (
  state,
  action
) => {
  return { title: action.payload.title, message: action.payload.message };
};

const clearErrorAction: CaseReducer<ErrorState, PayloadAction<ErrorState>> = (
  state,
  action
) => {
  return { title: '', message: '' };
};

const ErrorReducer = createSlice({
  name: 'Error',
  initialState: {
    title: '',
    message: '',
  } as ErrorState,
  reducers: {
    setError: setErrorAction,
    clearError: clearErrorAction,
  },
});

export const { setError, clearError } = ErrorReducer.actions;
export default ErrorReducer.reducer;
