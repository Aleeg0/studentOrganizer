import { NativeTabs } from "expo-router/unstable-native-tabs";
import { useTranslation } from "react-i18next";

const TabsLayout = () => {
  const { t } = useTranslation();

  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>{t("tabs.tracker")}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="checklist" md="playlist_add_check" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="scheduler">
        <NativeTabs.Trigger.Label>{t("tabs.schedule")}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar.and.person" md="event" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>{t("tabs.settings")}</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
