import { TFunction } from "i18next";

export const getAuthErrorMessage = (
  errorCode: string,
  t: TFunction<"translation", undefined>
) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return t("authErrors.emailAlreadyInUse");
    case "auth/invalid-email":
      return t("authErrors.invalidateEmail");
    case "auth/weak-password":
      return t("authErrors.weakPassword");
    case "auth/user-not-found":
      return t("authErrors.invalidateCredentials");
    case "auth/invalid-credential":
      return t("authErrors.invalidateCredentials");
    case "auth/network-request-failed":
      return t("authErrors.networkRequestFailed");
    case "auth/googleError":
      return t("authErrors.googleError");
    case "input/passwordsMissmatch":
      return t("authErrors.passwordsMissmatch");
    default:
      return t("authErrors.unknownError");
  }
};
