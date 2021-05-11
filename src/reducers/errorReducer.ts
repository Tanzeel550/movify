import { ErrorActionsReturnType } from '../consts/actionTypes';

type actionType = ErrorActionsReturnType;

const errorReducer = (state = '', action: actionType) => {
  switch (action.type) {
    case 'SET_ERROR':
      return {
        title: action.title,
        message: action.message,
      };
    case 'CLEAR_ERROR':
      return {
        title: '',
        message: '',
      };
    default:
      return state;
  }
};

export default errorReducer;
