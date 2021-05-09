const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        title: action.title,
        error: action.error,
      };
    case 'CLEAR_ERROR':
      return '';
    default:
      return state;
  }
};

export default errorReducer;
