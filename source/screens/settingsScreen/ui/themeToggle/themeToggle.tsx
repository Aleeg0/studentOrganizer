import {
  Host,
  HStack,
  Image,
  Spacer,
  Text,
  Toggle,
  ToggleProps,
} from "@expo/ui/swift-ui";
import { background, clipShape, frame } from "@expo/ui/swift-ui/modifiers";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/shared/theme";

export default function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useColorScheme();
  const handleIsOnChanger: ToggleProps["onIsOnChange"] = (value) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <Host>
      <HStack>
        <HStack spacing={10}>
          <Image
            systemName="circle.righthalf.filled"
            color="white"
            size={18}
            modifiers={[
              frame({ width: 28, height: 28 }),
              background("#00a6ff"),
              clipShape("roundedRectangle"),
            ]}
          />
          <Text>{t("settingsScreen.themeToggleCaption")}</Text>
        </HStack>
        <Spacer />
        <Toggle isOn={theme === "dark"} onIsOnChange={handleIsOnChanger} />
      </HStack>
    </Host>
  );
}
