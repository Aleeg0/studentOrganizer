import { useMemo, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/shared/firebase";
import { FirebaseError } from "@firebase/app";
import { getAuthErrorMessage } from "@/screens/authScreens/lib/utils";
import { useTranslation } from "react-i18next";

type RegistrationFormState = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegistrationFormStateKey = keyof RegistrationFormState;

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const useRegistrationForm = () => {
  const [state, setState] = useState<RegistrationFormState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const setValue = (key: RegistrationFormStateKey) => (value: string) => {
    setState((p) => ({ ...p, [key]: value }));
  };

  const reset = () => {
    setState(initialState);
  };

  const confirm = async () => {
    const { password, confirmPassword, email } = state;
    if (password !== "" && password !== confirmPassword) {
      reset();
      setError(getAuthErrorMessage("input/passwordsMissmatch", t));
    }

    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(getAuthErrorMessage(error.code, t));
      }
    }
  };

  const isFilled = useMemo(
    () => !!(state.email && state.password && state.confirmPassword),
    [state]
  );

  return {
    state,
    error,
    setEmail: setValue("email"),
    setPassword: setValue("password"),
    setConfirmPassword: setValue("confirmPassword"),
    confirm,
    reset,
    isFilled,
  };
};
