const defaultAuthReducer = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = defaultAuthReducer, action) => {
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
