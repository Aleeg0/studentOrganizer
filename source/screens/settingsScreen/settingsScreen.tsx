import { Host, List, Section } from "@expo/ui/swift-ui";
import ThemeToggle from "./ui/themeToggle/themeToggle";
import { useTranslation } from "react-i18next";
import LanguagePicker from "./ui/languagePicker/languagePicker";
import LogoutButton from "./ui/logoutButton";
import { useAuth } from "@contexts";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Host style={{ flex: 1 }}>
      <List>
        <Section title={t("settingsScreen.appearanceTitle")}>
          <ThemeToggle />
          <LanguagePicker />
        </Section>
        {user && (
          <Section title={t("settingsScreen.profileTitle")}>
            <LogoutButton />
          </Section>
        )}
      </List>
    </Host>
  );
};

export default SettingsScreen;
