// ============================================================
// ======================== Auth Types ========================
// ============================================================

export type AuthUserType = {
  user: object;
};

export type EmailPassType = {
  email: string;
  password: string;
};

export type AuthActionsType = {
  type: 'LOGIN' | 'LOGOUT';
  user?: object;
};

export type AuthDefaultType = {
  isAuthenticated: boolean;
  user: object;
};
