import { Host, List, Section } from "@expo/ui/swift-ui";
import ThemeToggle from "./ui/themeToggle/themeToggle";
import { useTranslation } from "react-i18next";
import { useAuth } from "@contexts";
import LanguagePicker from "./ui/languagePicker/languagePicker";
import LogoutButton from "./ui/logoutButton";
import ProfileInfo from "./ui/profileInfo/profileInfo";

const SettingsScreen = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <Host style={{ flex: 1 }}>
      <List>
        {user && (
          <Section title={t("settingsScreen.profileTitle")}>
            <ProfileInfo />
            <LogoutButton />
          </Section>
        )}
        <Section title={t("settingsScreen.appearanceTitle")}>
          <ThemeToggle />
          <LanguagePicker />
        </Section>
      </List>
    </Host>
  );
};

export default SettingsScreen;
