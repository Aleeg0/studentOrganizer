import { PropsWithChildren, useEffect, useState } from "react";
import { AuthContext } from "@/shared/contexts/authContext/auth.context";
import { onAuthStateChanged } from "@firebase/auth";
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

  return <AuthContext value={{ user }}>{children}</AuthContext>;
}
