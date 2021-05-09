export const setError = ({ error, title }) => ({
  type: 'SET_ERROR',
  title,
  error,
});

export const clearError = () => ({
  type: 'CLEAR_ERROR',
});
