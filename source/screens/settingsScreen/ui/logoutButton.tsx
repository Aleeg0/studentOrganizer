import { Button, HStack, Spacer, Text } from "@expo/ui/swift-ui";
import { useTranslation } from "react-i18next";
import { signOut } from "firebase/auth";
import { auth, logoutWithGoogle } from "@/shared/firebase";
import { Alert } from "react-native";

export default function LogoutButton() {
  const { t } = useTranslation();

  const handleLogoutPress = async () => {
    Alert.alert(
      t("settingsScreen.logout.title"),
      t("settingsScreen.logout.description"),
      [
        {
          text: t("settingsScreen.logout.cancelCaption"),
          style: "cancel",
        },
        {
          text: t("settingsScreen.logout.submitCaption"),
          style: "destructive",
          onPress: async () => {
            await signOut(auth);
            await logoutWithGoogle();
          },
        },
      ]
    );
  };

  return (
    <Button role={"destructive"} onPress={handleLogoutPress}>
      <HStack>
        <Spacer />
        <Text>{t("settingsScreen.logout.btnCaption")}</Text>
        <Spacer />
      </HStack>
    </Button>
  );
}
