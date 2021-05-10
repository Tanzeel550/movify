import { ERROR_TYPE } from '../consts/actionTypes';
import { AuthActionsType } from '../consts/actionTypes';

export const setError = ({ error, title }: ERROR_TYPE): AuthActionsType => ({
  type: 'SET_ERROR',
  title,
  error,
});

export const clearError = (): AuthActionsType => ({
  type: 'CLEAR_ERROR',
});
