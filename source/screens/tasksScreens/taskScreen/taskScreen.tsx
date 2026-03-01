import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import EditButton from "./ui/editButton";
import { Host, List, Section } from "@expo/ui/swift-ui";
import { useEffect, useMemo, useState } from "react";
import BaseInfoSection from "@/screens/tasksScreens/createTaskScreen/ui/baseInfoSection";
import DeadlineSection from "@/screens/tasksScreens/createTaskScreen/ui/deadlineSection";
import { useTranslation } from "react-i18next";
import DeleteButton from "@/screens/tasksScreens/taskScreen/ui/deleteButton";
import { useTasks } from "@entities/tasks";

export default function TaskScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTask, tasks, deleteTask } = useTasks();

  const task = useMemo(
    () => tasks!.find((task) => task.id === id),
    [id, tasks]
  );

  const [name, setName] = useState(task?.name ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [deadline, setDeadline] = useState<Date | null>(
    task?.deadline ? new Date(task.deadline) : null
  );

  useEffect(() => {
    if (!task) {
      router.dismissTo("/(tabs)/(tasks)");
    }
  }, [task, router]);

  if (!task) {
    return null;
  }

  const handleEditPress = async () => {
    if (isEditing) {
      await updateTask({
        id,
        name,
        description,
        deadline: deadline?.toString() ?? null,
      });
    }
    setIsEditing(!isEditing);
  };

  const handleDelete = async () => {
    await deleteTask(id);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: isEditing ? t("tabs.task") : t("tabs.taskReadonly"),
          headerRight: () => (
            <EditButton
              onPress={handleEditPress}
              systemImage={
                isEditing ? "checkmark" : "pencil.and.list.clipboard"
              }
            />
          ),
        }}
      />
      <Host style={{ flex: 1 }}>
        <List>
          <BaseInfoSection
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            isReadOnly={!isEditing}
          />
          <DeadlineSection
            date={deadline}
            onSelectDate={setDeadline}
            isReadOnly={!isEditing}
          />
          <Section>
            <DeleteButton onDelete={handleDelete} />
          </Section>
        </List>
      </Host>
    </>
  );
}
