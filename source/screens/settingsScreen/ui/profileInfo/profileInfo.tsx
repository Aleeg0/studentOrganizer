import { Button, HStack, Text, VStack } from "@expo/ui/swift-ui";
import { Image as ExpoImage } from "expo-image";
import {
  cornerRadius,
  font,
  foregroundStyle,
  frame,
} from "@expo/ui/swift-ui/modifiers";
import { useAuth, useAuthActions } from "@contexts";
import { Color } from "expo-router";
import { Alert, AlertButton } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";

const imageSize = 60;

const fallbackImage = require("../../../../assets/images/profileFallback.jpg");

export default function ProfileInfo() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { updateProfileUrl } = useAuthActions();

  const handleLoadImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!granted) {
      Alert.alert(
        t("settingsScreen.profileInfo.grantedErrorTitle"),
        t("settingsScreen.profileInfo.libraryGrantedError")
      );
      return;
    }

    const { canceled, assets } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!canceled) {
      await updateProfileUrl(assets[0].uri);
    }
  };

  const handleCameraImage = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();

    if (!granted) {
      Alert.alert(
        t("settingsScreen.profileInfo.grantedErrorTitle"),
        t("settingsScreen.profileInfo.cameraGrantedError")
      );
      return;
    }

    try {
      const { canceled, assets } = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!canceled) {
        await updateProfileUrl(assets[0].uri);
      }
    } catch {
      Alert.alert(
        t("common.errorTitle"),
        t("settingsScreen.profileInfo.cameraUnhandledError")
      );
    }
  };

  const handleAddPhoto = () => {
    const buttons: AlertButton[] = [
      {
        text: t("settingsScreen.profileInfo.cameraBtnCaption"),
        onPress: handleCameraImage,
      },
      {
        text: t("settingsScreen.profileInfo.libraryBtnCaption"),
        onPress: handleLoadImage,
      },
      {
        text: t("settingsScreen.profileInfo.cancelBtnCaption"),
        style: "cancel",
      },
    ];

    if (user?.photoURL) {
      buttons.splice(2, 0, {
        text: t("settingsScreen.profileInfo.removeBtnCaption"),
        onPress: () => updateProfileUrl(null),
        style: "destructive",
      });
    }

    Alert.alert(
      t("settingsScreen.profileInfo.chooseAlertTitle"),
      t("settingsScreen.profileInfo.chooseAlertMessage"),
      buttons
    );
  };

  const name = user?.displayName;
  const email = user?.email;
  const profileImage = user?.photoURL;

  return (
    <HStack spacing={16}>
      <Button
        onPress={handleAddPhoto}
        modifiers={[
          frame({ width: imageSize, height: imageSize }),
          cornerRadius(100),
        ]}
      >
        <ExpoImage
          source={profileImage ? { uri: profileImage } : fallbackImage}
          style={{ width: imageSize, height: imageSize }}
          contentFit="fill"
        />
      </Button>
      <VStack spacing={2} alignment={"leading"}>
        {name && (
          <Text modifiers={[font({ weight: "semibold", size: 20 })]}>
            {name}
          </Text>
        )}
        {email && (
          <Text
            modifiers={[
              font(!name ? { weight: "semibold", size: 20 } : {}),
              foregroundStyle({
                type: "color",
                color: (name
                  ? Color.ios.secondaryLabe
                  : Color.ios.label) as string,
              }),
            ]}
          >
            {email}
          </Text>
        )}
      </VStack>
    </HStack>
  );
}
