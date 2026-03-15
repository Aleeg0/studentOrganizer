import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth } from "./auth";

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_FIREBASE_GOOGLE_WEB_CLIENT_ID,
});

export const loginWithGoogle = async () => {
  await GoogleSignin.hasPlayServices();

  const { type, data } = await GoogleSignin.signIn();

  if (type === "cancelled") throw new Error();

  const credential = GoogleAuthProvider.credential(data?.idToken);

  return await signInWithCredential(auth, credential);
};

export const logoutWithGoogle = async () => {
  await GoogleSignin.signOut();
};
