import { firebase, googleAuthProvider } from '../firebase/firebase';
import {
  AuthActionsType,
  AuthUserType,
  EmailPassType,
} from '../consts/actionTypes';

export const login = ({ user }: AuthUserType): AuthActionsType => ({
  type: 'LOGIN',
  user,
});

export const logout = (): AuthActionsType => ({
  type: 'LOGOUT',
});

export const startLogout = async (): Promise<void> =>
  await firebase.auth().signOut();

export const startLoginWithGoogle = async (): Promise<void> => {
  try {
    await firebase.auth().signInWithPopup(googleAuthProvider);
  } catch (e) {
    console.log(e.message);
    console.error(e);

    switch (e.code) {
      case 'auth/account-exists-with-different-credential':
        throw new Error(
          'The Account Exists with the different Credentials. Please Login Using those Credentials'
        );
      default:
        throw new Error(
          'An Unknown Error Occurred. Please Come here later or connect the support'
        );
    }
  }
};

export const startSignUpWithEmailPass = async ({
  email,
  password,
}: EmailPassType): Promise<void> => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
  } catch (e) {
    switch (e.code) {
      case 'auth/email-already-in-use':
        throw new Error(
          'This Email Already Exists... Please Sign Up with some other Email'
        );
      case 'auth/weak-password':
        throw new Error(
          'This Password is very weak. Please use some strong password'
        );
      default:
        throw new Error('An Unknown Error Occurred. Please Try Again');
    }
  }
};

export const startLoginWithEmailPass = async ({
  email,
  password,
}: EmailPassType): Promise<void> => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (e) {
    console.log(e.message);
    console.error(e);
    switch (e.code) {
      case 'auth/invalid-email':
        throw new Error(
          'Your Email is Invalid. Please Login with correct email'
        );
      case 'auth/user-disabled':
        throw new Error('This user has been disabled. Please try again');
      case 'auth/user-not-found':
        throw new Error('This user was not found. Please SignUp!');
      case 'auth/wrong-password':
        throw new Error('Email or password is invalid. Please try again');
      default:
        throw new Error('An unknown error occurred. Please try again...');
    }
  }
};

export const sendEmailVerification = async (): Promise<void> => {
  await firebase.auth().currentUser!.sendEmailVerification();
};
