import { ERROR_TYPE } from '../consts/typesConfig';
import { AuthActionsType } from '../consts/typesConfig';

export const setError = ({ error, title }: ERROR_TYPE): AuthActionsType => ({
  type: 'SET_ERROR',
  title,
  error,
});

export const clearError = (): AuthActionsType => ({
  type: 'CLEAR_ERROR',
});
