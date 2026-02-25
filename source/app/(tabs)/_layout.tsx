import { NativeTabs } from "expo-router/unstable-native-tabs";

const TabsLayout = () => {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Tracker</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="checklist" md="playlist_add_check" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="scheduler">
        <NativeTabs.Trigger.Label>Scheduler</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="calendar.and.person" md="event" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="gear" md="settings" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

export default TabsLayout;
