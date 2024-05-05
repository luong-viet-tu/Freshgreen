import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential && credential.accessToken;
      const user = result.user;

      const data = {
        googleId: user.uid,
        fullname: {
          firstname: "",
          lastname: user.displayName!,
        },
        email: user.email!,
        avatar: user.photoURL,
        phone: "social#" + user.uid,
        username:
          user.email?.split("@")[0]! + user.uid.substring(user.uid.length - 4)!,
        password: user.uid,
      };

      return Promise.resolve({ data, token });
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // const email = error.customData.email;
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
    });
};
