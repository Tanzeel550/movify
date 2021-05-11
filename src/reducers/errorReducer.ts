import { createSlice } from '@reduxjs/toolkit';
import { ErrorState } from '../consts/actionTypes';
import { clearErrorAction, setErrorAction } from '../actions/errorActions';

const ErrorReducerSlice = createSlice({
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

export const { setError, clearError } = ErrorReducerSlice.actions;
export default ErrorReducerSlice.reducer;
