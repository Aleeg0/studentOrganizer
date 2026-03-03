import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Host, List, Section } from "@expo/ui/swift-ui";
import { Task, useTaskNotification, useTasks } from "@entities/tasks";
import BaseInfoSection from "../ui/baseInfoSection";
import { DeadlineSection } from "../ui/deadlineSection";
import EditButton from "./ui/editButton";
import DeleteButton from "./ui/deleteButton";
import { getBeautifulTime } from "@/screens/tasksScreens/createTaskScreen/ui/lib";

export default function TaskScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const { t, i18n } = useTranslation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { updateTask, tasks, deleteTask } = useTasks();
  const { cancelTaskReminder, scheduleTaskReminder } = useTaskNotification();

  const task = useMemo(
    () => tasks!.find((task) => task.id === id),
    [id, tasks]
  );

  const [name, setName] = useState(task?.name ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(
    task?.deadlineDate ? new Date(task.deadlineDate) : null
  );
  const [deadlineTime, setDeadlineTime] = useState<Date | null>(
    task?.deadlineTime ? new Date(`1970-01-01T${task.deadlineTime}:00`) : null
  );
  const [reminder, setReminder] = useState(task?.reminder ?? 0);

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
      const updatedTask = {
        id,
        name,
        description,
        deadlineDate: deadlineDate?.toDateString() ?? null,
        deadlineTime: deadlineTime
          ? getBeautifulTime(deadlineTime, i18n.language)
          : null,
        reminder: reminder,
      } as Task;

      const notificationId = task?.notificationId;

      if (notificationId) {
        await cancelTaskReminder(notificationId);
        updatedTask.notificationId = null;
      }

      if (reminder) {
        const newNotifId = await scheduleTaskReminder(
          name,
          new Date(
            deadlineDate!.getFullYear(),
            deadlineDate!.getMonth(),
            deadlineDate!.getDate(),
            deadlineTime!.getHours(),
            deadlineTime!.getMinutes()
          ),
          reminder
        );

        if (newNotifId) {
          updatedTask.notificationId = newNotifId;
        } else {
          alert("Уведомление не создано (возможно время уже прошло)");
        }
      }

      await updateTask(updatedTask);
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
            date={deadlineDate}
            setDate={setDeadlineDate}
            time={deadlineTime}
            setTime={setDeadlineTime}
            reminder={reminder}
            setReminder={setReminder}
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
