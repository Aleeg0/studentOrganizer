import { Host, List } from "@expo/ui/swift-ui";
import { groupBySpecializationDigits, GroupSection, useGroups, } from "@entities/groups";
import { refreshable } from "@expo/ui/swift-ui/modifiers";
import { CircularProgress } from "@expo/ui/jetpack-compose";
import { Stack } from "expo-router";
import { useDeferredValue, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const GroupsScreen = () => {
  const [filter, setFilter] = useState("");
  const deferredFilter = useDeferredValue(filter);
  const { t } = useTranslation();
  const { groups, refetch, isLoading } = useGroups();

  const handleRefresh = async () => {
    await refetch();
  };

  const filteredAndGroupedGroups = useMemo(() => {
    if (!groups) return {};

    if (!deferredFilter) {
      return groupBySpecializationDigits(groups);
    }

    const filteredData = groups.filter((group) =>
      group.name.toLowerCase().includes(deferredFilter)
    );

    return groupBySpecializationDigits(filteredData);
  }, [groups, deferredFilter]);

  return (
    <>
      <Stack.Screen
        options={{
          headerSearchBarOptions: {
            onChangeText: (e) => setFilter(e.nativeEvent.text),
            placeholder: t("groupsScreen.searchPlaceholder"),
          },
        }}
      />
      <Host style={{ flex: 1 }}>
        {!isLoading ? (
          <List modifiers={[refreshable(handleRefresh)]}>
            {Object.entries(filteredAndGroupedGroups).map(
              ([prefix, groups]) => (
                <GroupSection key={prefix} title={prefix} items={groups} />
              )
            )}
          </List>
        ) : (
          <CircularProgress />
        )}
      </Host>
    </>
  );
};

export default GroupsScreen;
