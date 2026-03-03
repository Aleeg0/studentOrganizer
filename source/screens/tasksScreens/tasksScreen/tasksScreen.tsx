import { Host, List } from "@expo/ui/swift-ui";
import { refreshable } from "@expo/ui/swift-ui/modifiers";
import { Stack } from "expo-router";
import { ListItem, useTasks } from "@entities/tasks";
import CreateTaskButton from "./ui/createTaskButton";
import EmptyList from "./ui/emptyList";
import { PlatformColor } from "react-native";

export default function TasksScreen() {
  const { tasks, deleteTask, refresh, isLoading } = useTasks();

  const handleDelete = async (indices: number[]) => {
    const idsToDelete = indices.map((index) => tasks![index]?.id);
    await Promise.all(idsToDelete.map((id) => deleteTask(id)));
  };

  const showEmptyState = !isLoading && (!tasks || tasks.length === 0);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: CreateTaskButton,
        }}
      />
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
