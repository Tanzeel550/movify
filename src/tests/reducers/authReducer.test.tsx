import authReducer, { login, logout } from './../../reducers/authReducer';
import { myUser } from '../../consts/fixtures';

test('should login the user by setting the user', () => {
  const result = authReducer(
    { isAuthenticated: false, user: {} },
    login(myUser)
  );
  expect(result).toStrictEqual({
    isAuthenticated: true,
    user: myUser.user,
  });
});

test('should logout the user by setting the default state', () => {
  const result = authReducer({ isAuthenticated: true, user: myUser }, logout());
  expect(result).toStrictEqual({
    isAuthenticated: false,
    user: {},
  });
});

export {};
