import { signInWithPopup, getAuth, FacebookAuthProvider } from "firebase/auth";

const provider = new FacebookAuthProvider();
const auth = getAuth();

export const loginWithFacebook = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential && credential.accessToken;
      const user: any = result.user;

      const data = {
        facebookId: user.uid,
        fullname: {
          firstname: user?.firstName || "",
          lastname: user?.lastName || user.displayName!,
        },
        avatar: user.photoURL,
        email: user.email!,
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
