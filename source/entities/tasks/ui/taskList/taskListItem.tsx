// import {
//   Alert,
//   Animated as RNAnimated,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { useTheme } from "@react-navigation/native";
// import { Ionicons } from "@expo/vector-icons";
// import Swipeable from "react-native-gesture-handler/Swipeable";
// import { RectButton } from "react-native-gesture-handler";
// import { Task } from "../../model/types";
//
// interface Props extends Task {}
//
// export default function TaskListItem({
//   id,
//   name,
//   description,
//   subject,
//   deadLine,
// }: Props) {
//   const { colors } = useTheme();
//
//   const deadlineDate = new Date(deadLine);
//   const isExpired = new Date() > deadlineDate;
//
//   const formattedDate = new Intl.DateTimeFormat("ru-RU", {
//     day: "numeric",
//     month: "long",
//     hour: "2-digit",
//     minute: "2-digit",
//   }).format(deadlineDate);
//
//   const renderRightActions = (
//     progress: RNAnimated.AnimatedInterpolation<number>,
//     dragX: RNAnimated.AnimatedInterpolation<number>
//   ) => {
//     return (
//       <View style={styles.deleteActionContainer}>
//         <RectButton
//           style={styles.deleteButton}
//           onPress={() => {
//             Alert.alert(
//               "Завершить задачу?",
//               "Задача будет удалена из списка.",
//               [
//                 { text: "Отмена", style: "cancel" },
//                 {
//                   text: "Завершить",
//                   style: "destructive",
//                   onPress: () => onDelete(id),
//                 },
//               ]
//             );
//           }}
//         >
//           <Ionicons name="trash-outline" size={24} color="white" />
//           <Text style={styles.deleteText}>Удалить</Text>
//         </RectButton>
//       </View>
//     );
//   };
//
//   return (
//     <Swipeable
//       renderRightActions={renderRightActions}
//       friction={2}
//       rightThreshold={40}
//     >
//       <View style={[styles.lessonCard, { backgroundColor: colors.lessonCard || "#fff" }]}>
//         {/* Левая часть: Тексты */}
//         <View style={styles.textContainer}>
//           <Text
//             style={[styles.title, { color: colors.text }]}
//             numberOfLines={1}
//           >
//             {name}
//           </Text>
//
//           <View style={styles.dateRow}>
//             <Ionicons
//               name="time-outline"
//               size={14}
//               color={isExpired ? "#FF3B30" : "#8E8E93"}
//               style={{ marginRight: 4 }}
//             />
//             <Text
//               style={[
//                 styles.deadline,
//                 { color: isExpired ? "#FF3B30" : "#8E8E93" }, // Красный если просрочено, серый iOS иначе
//               ]}
//             >
//               {isExpired ? "Просрочено: " : "Дедлайн: "} {formattedDate}
//             </Text>
//           </View>
//         </View>
//
//         {/* Правая часть: Иконка Subject */}
//         <View
//           style={[
//             styles.iconContainer,
//             { backgroundColor: subject.color + "20" },
//           ]}
//         >
//           {/* +20 добавляет прозрачность hex цвету для фона */}
//           <Ionicons
//             name={(subject.icon as any) || "ios-radio-button-on"}
//             size={28}
//             color={subject.color}
//           />
//         </View>
//       </View>
//     </Swipeable>
//   );
// }
//
// const styles = StyleSheet.create({
//   lessonCard: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: 16,
//     borderRadius: 16,
//     marginBottom: 16, // Отступ между карточками
//     // Тени в стиле iOS
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     // Тень для Android
//     elevation: 4,
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: 10,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 6,
//     letterSpacing: -0.5, // Немного плотнее, как в iOS
//   },
//   dateRow: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   deadline: {
//     fontSize: 13,
//     fontWeight: "500",
//   },
//   iconContainer: {
//     width: 50,
//     height: 50,
//     borderRadius: 14, // Скругленный квадрат (Squircle style)
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   // Стили для свайпа
//   deleteActionContainer: {
//     width: 100,
//     marginBottom: 16, // Компенсируем margin карточки
//     marginLeft: 10,
//   },
//   deleteButton: {
//     flex: 1,
//     backgroundColor: "#FF3B30", // Стандартный красный iOS
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 16,
//   },
//   deleteText: {
//     color: "white",
//     fontSize: 12,
//     fontWeight: "600",
//     marginTop: 4,
//   },
// });
//
// // export default function TaskListItem({
// //   id,
// //   name,
// //   description,
// //   subject,
// // }: Props) {
// //   const { colors } = useTheme();
// //
// //   return (
// //     <View style={[styles.container, { backgroundColor: colors.background }]}>
// //       <View>
// //         <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
// //       </View>
// //       <View style={styles.rightPart}>{subject.icon}</View>
// //     </View>
// //   );
// // }
// //
// // const styles = StyleSheet.create({
// //   container: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     borderRadius: 16,
// //     borderWidth: 1,
// //     paddingVertical: 15,
// //     paddingHorizontal: 20,
// //   },
// //   rightPart: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   name: {
// //     fontSize: 18,
// //     fontWeight: "bold",
// //   },
// //   descriptionContainer: {
// //     opacity: 0.7,
// //   },
// //   description: {
// //     fontSize: 16,
// //   },
// // });
