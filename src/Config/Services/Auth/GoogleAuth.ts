import { auth } from "../../Firebase";

import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { addDocument } from "../Firebase/FireStoreDB";

export const googleSignIn = async () => {
  const GoogleProvider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, GoogleProvider);
  const { isNewUser } = getAdditionalUserInfo(result);
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

// const LogOut = () => {
//   signOut(auth);
//   router.push("/login");
//   notification["warning"]({
//     message: "Đã đăng xuất !",
//     description: `Bạn đã đăng xuất khỏi ${window.location.hostname} !`,
//   });
// };
