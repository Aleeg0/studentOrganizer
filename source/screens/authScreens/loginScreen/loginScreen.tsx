import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { UiButton, UiLinkButton, UiLinkButtonProps } from "@/shared/ui";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/shared/firebase";
import { FirebaseError } from "@firebase/app";
import { getAuthErrorMessage } from "../lib/utils";
import GoogleButton from "../ui/googleButton";
import styles from "../ui/authScreens.styles";

export default function LoginScreen() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoginClick = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(getAuthErrorMessage(error.code, t));
      }
    }
  };

  const handleGoLogin: UiLinkButtonProps["action"] = (router) => {
    setEmail("");
    setPassword("");
    setTimeout(() => router.replace("/registration"));
  };

  const loginBtnDisabled = !email || !password;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{t("loginScreen.title")}</Text>
          <Text style={styles.subtitle}>{t("loginScreen.description")}</Text>
          <View style={styles.form}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder={t("loginScreen.emailPlaceholder")}
              placeholderTextColor="#999"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoComplete="email"
              autoCapitalize="none"
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder={t("loginScreen.passwordPlaceholder")}
              placeholderTextColor="#999"
              secureTextEntry
              textContentType="password"
              autoComplete="password"
            />
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <UiButton
              onPress={handleLoginClick}
              style={[
                styles.primaryButton,
                loginBtnDisabled && styles.primaryButtonDisabled,
              ]}
              caption={t("loginScreen.registerBtnCaption")}
              textStyle={styles.primaryButtonText}
              disabled={loginBtnDisabled}
            />
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>
              {t("loginScreen.dividerText")}
            </Text>
            <View style={styles.dividerLine} />
          </View>
          <GoogleButton />
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {t("loginScreen.notRegistered")}
            </Text>
            <UiLinkButton
              action={handleGoLogin}
              style={styles.loginBtn}
              caption={t("loginScreen.goRegistrationBtnCaption")}
              textStyle={styles.footerLink}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
