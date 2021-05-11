/*
export const startCheckUserEmailLink = async (link: string): Promise<void> => {
  try {
    if (firebase.auth().isSignInWithEmailLink(link)) {
      let email = window.localStorage.getItem('email');
      let password = window.localStorage.getItem('password');
      if (!email || !password) {
        email = prompt('Please type your email for confirmation');
        password = prompt('Please type your password for confirmation');
      }

      const emailPass: EmailPassType = {
        email: email!,
        password: password!,
      };
      await startLoginWithEmailPass(emailPass);

      window.localStorage.removeItem('email');
      window.localStorage.removeItem('password');
    }
  } catch (e) {
    console.log(e.message);
    console.error(e);
    throw e;
  }
};
*/

/*
export const startSendLoginLinkToEmail = async (
  { email, password }: EmailPassType,
  redirectTo: string
): Promise<void> => {
  try {
    await firebase.auth().sendSignInLinkToEmail(email, {
      url: `http://localhost:3000/${redirectTo}`,
      handleCodeInApp: true,
    });
    window.localStorage.setItem('email', email);
    window.localStorage.setItem('password', password);
  } catch (e) {
    console.log(e.message);
    console.error(e);
    throw new Error('An Unknown Error Occurred. Please Try Again');
  }
};

export const startLoginAndSendEmailLink = async (
  { email, password }: EmailPassType,
  redirectTo: string
): Promise<void> => {
  try {
    await loginUserWithEmailPass({ email, password });
    await startLogout();
    await startSendLoginLinkToEmail({ email, password }, redirectTo);
  } catch (e) {
    console.log(e.message);
    console.error(e);
    throw e;
  }
};
*/
