import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "home",
        }}
      />
      <Tabs.Screen name="sheduler" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
};

export default TabsLayout;
