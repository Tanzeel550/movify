import { CaseReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

type errorState = {
  title: string;
  message: string;
};

const setErrorAction: CaseReducer<errorState, PayloadAction<errorState>> = (
  state,
  action
) => {
  return { title: action.payload.title, message: action.payload.message };
};

const clearErrorAction: CaseReducer<errorState, PayloadAction<errorState>> = (
  state,
  action
) => {
  return { title: '', message: '' };
};

const ErrorReducerSlice = createSlice({
  name: 'Error',
  initialState: {
    title: '',
    message: '',
  } as errorState,
  reducers: {
    setError: setErrorAction,
    clearError: clearErrorAction,
  },
});

export const { setError, clearError } = ErrorReducerSlice.actions;
export default ErrorReducerSlice.reducer;
