import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import {
  AuthActionContext,
  AuthActionsContext,
  AuthContext,
} from "@/shared/contexts/authContext/auth.context";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "@/shared/firebase";
import { SplashScreen } from "expo-router";

SplashScreen.preventAutoHideAsync();

let init = false;

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthContext["user"]>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser);
      if (!init) {
        init = true;
        SplashScreen.hideAsync();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const updateProfileUrl = useCallback<AuthActionContext["updateProfileUrl"]>(
    async (photoURL) => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await updateProfile(currentUser, {
            photoURL: photoURL,
          });
          await currentUser?.reload();
          setUser({ ...currentUser });
        } catch {}
      }
    },
    []
  );

  return (
    <AuthActionsContext value={{ updateProfileUrl }}>
      <AuthContext value={{ user }}>{children}</AuthContext>
    </AuthActionsContext>
  );
}
