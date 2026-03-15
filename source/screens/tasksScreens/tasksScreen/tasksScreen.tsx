import { Host, List } from "@expo/ui/swift-ui";
import { refreshable } from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";
import { ListItem, useTasks } from "@entities/tasks";
import EmptyList from "./ui/emptyList";
import { PlatformColor } from "react-native";
import TasksScreenOptions from "@/screens/tasksScreens/tasksScreen/tasksScreen.options";

export default function TasksScreen() {
  const { tasks, deleteTask, refresh, isLoading } = useTasks();
  const router = useRouter();

  const handleDelete = async (indices: number[]) => {
    const idsToDelete = indices.map((index) => tasks![index]?.id);
    await Promise.all(idsToDelete.map((id) => deleteTask(id)));
  };

  const handleCreatePress = () => {
    router.push("/(tabs)/(tasks)/create");
  };

  const showEmptyState = !isLoading && (!tasks || tasks.length === 0);

  return (
    <>
      <TasksScreenOptions onCreatePress={handleCreatePress} />
      <Host
        style={{
          flex: 1,
          backgroundColor: PlatformColor("systemGroupedBackground"),
        }}
      >
        {showEmptyState ? (
          <EmptyList />
        ) : (
          <List modifiers={[refreshable(refresh)]}>
            <List.ForEach onDelete={(id) => handleDelete(id)}>
              <List.ForEach onDelete={(id) => handleDelete(id)}>
                {tasks?.map((task) => (
                  <ListItem key={task.id} id={task.id} name={task.name} />
                ))}
              </List.ForEach>
            </List.ForEach>
          </List>
        )}
      </Host>
    </>
  );
}
