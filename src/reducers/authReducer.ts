import { AuthActionsType } from '../consts/actionTypes';

const defaultAuthReducer = {
  isAuthenticated: false,
  user: {},
};

type actionType = AuthActionsType;

const authReducer = (state = defaultAuthReducer, action: actionType) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        user: action.user,
      };
    case 'LOGOUT':
      return defaultAuthReducer;
    default:
      return state;
  }
};

export default authReducer;
