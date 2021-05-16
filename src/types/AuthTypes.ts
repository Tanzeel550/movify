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

export type AuthDefaultType = {
  isAuthenticated: boolean;
  user: object;
};

export type TestUserType = {
  uid: string;
  name: string;
  email: string;
  passion: string;
  os: string;
  version: string;
  height: number;
};
