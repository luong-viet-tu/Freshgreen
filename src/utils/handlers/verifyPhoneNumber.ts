import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

interface ExtendedWindow extends Window {
  recaptchaVerifier?: RecaptchaVerifier;
  confirmationResult?: any;
}

const auth = getAuth();
declare var window: ExtendedWindow;

export const recaptcha = (recaptchaContainer: any) => {
  const recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainer, {
    size: "invisible",
    callback: (response: any) => {
      console.log(response);
    },
  });

  recaptchaVerifier.render();
};

export const phoneVerify = (phoneNumber: string) => {
  const appVerifier = window.recaptchaVerifier;
  if (appVerifier) {
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        // Handle verification error
        console.error(error);
      });
    return true;
  } else {
    console.error("reCAPTCHA verification incomplete");
    return false;
  }
};
