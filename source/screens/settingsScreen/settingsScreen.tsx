import { Host, List, Section } from "@expo/ui/swift-ui";
import ThemeToggle from "./ui/themeToggle/themeToggle";
import { useTranslation } from "react-i18next";
import LanguagePicker from "./ui/languagePicker/languagePicker";

const SettingsScreen = () => {
  const { t } = useTranslation();

  return (
    <Host style={{ flex: 1 }}>
      <List>
        <Section title={t("settingsScreen.appearanceTitle")}>
          <ThemeToggle />
          <LanguagePicker />
        </Section>
      </List>
    </Host>
  );
};

export default SettingsScreen;
