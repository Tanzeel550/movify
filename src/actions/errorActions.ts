import { ErrorActionsReturnType, ErrorType } from '../consts/actionTypes';

export const setError = ({
  message,
  title,
}: ErrorType): ErrorActionsReturnType => ({
  type: 'SET_ERROR',
  title,
  message,
});

export const clearError = (): ErrorActionsReturnType => ({
  type: 'CLEAR_ERROR',
});
