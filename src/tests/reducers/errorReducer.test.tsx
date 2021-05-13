import ErrorReducer, {
  clearError,
  setError,
} from '../../reducers/errorReducer';
import { ErrorState } from '../../types/ErrorTypes';

let errorState: ErrorState, defaultState: ErrorState;

beforeEach(() => {
  defaultState = { title: '', message: '' };
  errorState = {
    message: 'There was an error here',
    title: 'Error',
  };
});

test('should really screw by setError', () => {
  const result = ErrorReducer(defaultState, setError(errorState));
  expect(result).toStrictEqual(errorState);
});

test('should really screw by clearError', () => {
  const result = ErrorReducer(errorState, clearError());
  expect(result).toStrictEqual(defaultState);
});

// Message: Following 2 tests are not really important
test('should set the state to be error provided', () => {
  expect(setError(errorState)).toStrictEqual({
    payload: errorState,
    type: 'Error/setError',
  });
});

test('should set clear the state', () => {
  expect(clearError()).toStrictEqual({
    payload: undefined,
    type: 'Error/clearError',
  });
});

export {};
