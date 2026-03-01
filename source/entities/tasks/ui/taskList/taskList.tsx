import { FlatList, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { Task } from "@/entities/tasks";
import TaskListItem from "./taskListItem";

interface Props {
  tasks: Task[];
}

export default function TaskList({ tasks }: Props) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={true}
      renderItem={({ item }) => (
        <Link href={`/tasks/${item.id}`} asChild>
          <Pressable>
            <TaskListItem {...item} />
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16, // Отступы слева и справа для карточек
    paddingTop: 20,
    paddingBottom: 40, // Отступ снизу, чтобы контент не перекрывался барами
  },
});
