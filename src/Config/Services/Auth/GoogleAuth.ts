import { auth } from "../../Firebase";

import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { addDocument } from "../Firebase/FireStoreDB";

export const googleSignIn = async () => {
  const GoogleProvider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, GoogleProvider);
  const { isNewUser }: any = getAdditionalUserInfo(result);

  if (isNewUser) {
    addDocument("users", {
      displayName: result.user?.displayName,
      email: result.user?.email,
      photoURL: result.user?.photoURL,
      admin: false,
    });
  }
  return result.user?.email;
};
