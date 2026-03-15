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
import GoogleButton from "../ui/googleButton";
import styles from "../ui/authScreens.styles";
import { useRegistrationForm } from "@/screens/authScreens/registrationScreen/useRegistrationForm";

export default function RegistrationScreen() {
  const { t } = useTranslation();
  const {
    state,
    error,
    setEmail,
    setPassword,
    setConfirmPassword,
    confirm,
    reset,
    isFilled,
  } = useRegistrationForm();

  const handleGoLogin: UiLinkButtonProps["action"] = (router) => {
    reset();
    setTimeout(() => router.replace("/login"));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text style={styles.title}>{t("registrationScreen.title")}</Text>
          <Text style={styles.subtitle}>
            {t("registrationScreen.description")}
          </Text>
          <View style={styles.form}>
            <TextInput
              value={state.email}
              onChangeText={setEmail}
              style={styles.input}
              placeholder={t("registrationScreen.emailPlaceholder")}
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              value={state.password}
              onChangeText={setPassword}
              style={styles.input}
              placeholder={t("registrationScreen.newPasswordPlaceholder")}
              placeholderTextColor="#999"
              secureTextEntry
              textContentType="password"
            />
            <TextInput
              value={state.confirmPassword}
              onChangeText={setConfirmPassword}
              style={styles.input}
              placeholder={t("registrationScreen.confirmPasswordPlaceholder")}
              placeholderTextColor="#999"
              secureTextEntry
              textContentType="newPassword"
            />
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            <UiButton
              onPress={confirm}
              style={[
                styles.primaryButton,
                !isFilled && styles.primaryButtonDisabled,
              ]}
              caption={t("registrationScreen.registerBtnCaption")}
              textStyle={styles.primaryButtonText}
              disabled={!isFilled}
            />
          </View>
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>
              {t("registrationScreen.dividerText")}
            </Text>
            <View style={styles.dividerLine} />
          </View>
          <GoogleButton />
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              {t("registrationScreen.alreadyRegistered")}
            </Text>
            <UiLinkButton
              action={handleGoLogin}
              style={styles.loginBtn}
              caption={t("registrationScreen.goLoginBtnCaption")}
              textStyle={styles.footerLink}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
