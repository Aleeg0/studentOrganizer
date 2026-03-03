import { Stack, useRouter } from "expo-router";
import { Host, List } from "@expo/ui/swift-ui";
import CloseButton from "./ui/headerButtons/closeButton";
import AddTaskButton from "./ui/headerButtons/addTaskButton";
import { DeadlineSection } from "../ui/deadlineSection";
import BaseInfoSection from "../ui/baseInfoSection";
import { useState } from "react";
import { Task, useTaskNotification, useTasks } from "@entities/tasks";
import { getBeautifulTime } from "@/screens/tasksScreens/createTaskScreen/ui/lib";
import { useTranslation } from "react-i18next";

export default function CreateTaskScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);
  const [deadlineTime, setDeadlineTime] = useState<Date | null>(null);
  const [reminder, setReminder] = useState(0);
  const router = useRouter();
  const { addTask, isValidating } = useTasks();
  const { scheduleTaskReminder } = useTaskNotification();
  const { i18n } = useTranslation();

  const handlePress = async () => {
    const newTask = {
      name,
      description,
      deadlineDate: deadlineDate?.toDateString() ?? null,
      deadlineTime: deadlineTime
        ? getBeautifulTime(deadlineTime, i18n.language)
        : null,
      reminder: reminder,
    } as Omit<Task, "id">;

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
        newTask.notificationId = newNotifId;
        await addTask(newTask);
        router.dismiss();
      } else {
        alert("Уведомление не создано (возможно время уже прошло)");
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: CloseButton,
          headerRight: () => (
            <AddTaskButton onPress={handlePress} disabled={isValidating} />
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
          />
          <DeadlineSection
            date={deadlineDate}
            setDate={setDeadlineDate}
            time={deadlineTime}
            setTime={setDeadlineTime}
            reminder={reminder}
            setReminder={setReminder}
          />
        </List>
      </Host>
    </>
  );
}
