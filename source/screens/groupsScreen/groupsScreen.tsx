import { Host, List } from "@expo/ui/swift-ui";
import {
  groupBySpecializationDigits,
  GroupSection,
  useGroups,
} from "@entities/groups";
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
// import { useCallback, useMemo, useState } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { FlashList } from "@shopify/flash-list";
// import { Stack } from "expo-router";
// import { useTranslation } from "react-i18next";
// import {
//   GroupedStudentGroups,
//   StudentGroup,
//   useGroups,
// } from "@entities/groups"; // Импорт типа // Твой хук
// import { CircularProgress } from "@expo/ui/jetpack-compose";
// import { Host } from "@expo/ui/swift-ui";
//
// // --- ТИПЫ ДЛЯ СПИСКА ---
// // Мы превращаем вложенную структуру в один длинный массив
// type ListItem =
//   | { type: "header"; title: string }
//   | { type: "row"; data: StudentGroup };
//
// const GroupsScreen = () => {
//   const [filter, setFilter] = useState("");
//   const { t } = useTranslation();
//   const { groups, refetch, isLoading } = useGroups();
//
//   const flatData = useMemo(() => {
//     if (!groups) return [];
//
//     const query = filter.toLowerCase().trim();
//     const result: ListItem[] = [];
//
//     const filtered = query
//       ? groups.filter((g) => g.name.toLowerCase().includes(query))
//       : groups;
//
//     const groupsMap: GroupedStudentGroups = {};
//
//     for (const group of filtered) {
//       const prefix = group.name.length >= 3 ? group.name.slice(0, 3) : "Other";
//       if (!groupsMap[prefix]) groupsMap[prefix] = [];
//       groupsMap[prefix].push(group);
//     }
//
//     Object.entries(groupsMap).forEach(([title, items]) => {
//       result.push({ type: "header", title });
//       items.forEach((item) => {
//         result.push({ type: "row", data: item });
//       });
//     });
//
//     return result;
//   }, [groups, filter]);
//
//   const renderItem = useCallback(({ item }: { item: ListItem }) => {
//     if (item.type === "header") {
//       return (
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerText}>{item.title}</Text>
//         </View>
//       );
//     }
//
//     return (
//       <View style={styles.rowContainer}>
//         <Text style={styles.rowTitle}>{item.data.name}</Text>
//         <Text style={styles.rowSubtitle}>{item.data.specialityAbbrev}</Text>
//       </View>
//     );
//   }, []);
//
//   const getItemType = useCallback((item: ListItem) => item.type, []);
//
//   const stickyHeaderIndices = useMemo(() => {
//     return flatData
//       .map((item, index) => (item.type === "header" ? index : null))
//       .filter((item) => item !== null) as number[];
//   }, [flatData]);
//
//   return (
//     <>
//       <Stack.Screen
//         options={{
//           headerSearchBarOptions: {
//             onChangeText: (e) => setFilter(e.nativeEvent.text),
//             placeholder: t("groupsScreen.searchPlaceholder"),
//             hideWhenScrolling: false,
//           },
//         }}
//       />
//
//       <View style={{ flex: 1, backgroundColor: "#fff", top: 100 }}>
//         {isLoading && !groups ? (
//           <Host style={{ flex: 1 }}>
//             <CircularProgress />
//           </Host>
//         ) : (
//           <FlashList
//             data={flatData}
//             renderItem={renderItem}
//             getItemType={getItemType}
//             keyExtractor={(item, index) =>
//               item.type === "header" ? `h-${item.title}` : `g-${item.data.id}`
//             }
//             stickyHeaderIndices={stickyHeaderIndices}
//             onRefresh={refetch}
//             refreshing={isLoading}
//             keyboardShouldPersistTaps="handled"
//             keyboardDismissMode="on-drag"
//           />
//         )}
//       </View>
//     </>
//   );
// };
//
// const styles = StyleSheet.create({
//   headerContainer: {
//     backgroundColor: "#f4f4f6", // Светло-серый фон заголовка
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     justifyContent: "center",
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   rowContainer: {
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#eee",
//     backgroundColor: "#fff",
//   },
//   rowTitle: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   rowSubtitle: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 2,
//   },
// });
//
// export default GroupsScreen;
