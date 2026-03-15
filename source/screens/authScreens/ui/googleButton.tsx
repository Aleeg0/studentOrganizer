import { useTranslation } from "react-i18next";
import { Alert, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "expo-router";
import { UiButton } from "@ui";
import { loginWithGoogle } from "@/shared/firebase";
import { getAuthErrorMessage } from "@/screens/authScreens/lib/utils";

export default function GoogleButton() {
  const { t } = useTranslation();

  const handlePress = async () => {
    try {
      await loginWithGoogle();
    } catch {
      Alert.alert(getAuthErrorMessage("auth/googleError", t));
    }
  };

  return (
    <UiButton
      caption={t("registrationScreen.googleBtnCaption")}
      textStyle={styles.caption}
      style={styles.container}
      icon={
        <Ionicons
          name="logo-google"
          size={20}
          color="#DB4437"
          style={styles.icon}
        />
      }
      onPress={handlePress}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.ios.systemBackground,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 12,
    padding: 16,
  },
  caption: {
    fontSize: 16,
    fontWeight: "600",
    color: Color.ios.label,
  },
  icon: {
    marginRight: 12,
  },
});
