import { Host, List } from "@expo/ui/swift-ui";
import { Stack } from "expo-router";
import CreateTaskButton from "./ui/createTaskButton";
import { ListItem, useTasks } from "@entities/tasks";

export default function TasksScreen() {
  const { tasks, deleteTask } = useTasks();

  const handleDelete = async (indices: number[]) => {
    const idsToDelete = indices.map((index) => tasks![index]?.id);
    await Promise.all(idsToDelete.map((id) => deleteTask(id)));
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: CreateTaskButton,
        }}
      />
      <Host style={{ flex: 1 }}>
        <List>
          <List.ForEach onDelete={(id) => handleDelete(id)}>
            {tasks?.map((task) => (
              <ListItem key={task.id} id={task.id} name={task.name} />
            ))}
          </List.ForEach>
        </List>
      </Host>
    </>
  );
}
