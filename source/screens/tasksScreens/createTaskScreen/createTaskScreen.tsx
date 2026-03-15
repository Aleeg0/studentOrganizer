import { useRouter } from "expo-router";
import { Host, List } from "@expo/ui/swift-ui";
import { DeadlineSection } from "../ui/deadlineSection";
import BaseInfoSection from "../ui/baseInfoSection";
import { useState } from "react";
import { Task, useTaskNotification, useTasks } from "@entities/tasks";
import { getBeautifulTime } from "@/screens/tasksScreens/createTaskScreen/ui/lib";
import { useTranslation } from "react-i18next";
import CreateTaskScreenOptions from "@/screens/tasksScreens/createTaskScreen/createTaskScreen.options";

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

  const handleCreatePress = async () => {
    const newTask = {
      name,
      description,
      deadlineDate: deadlineDate ?? null,
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
      } else {
        alert("Уведомление не создано (возможно время уже прошло)");
        return;
      }
    }

    await addTask(newTask);
    router.dismiss();
  };

  const handleCancelPress = () => {
    router.dismiss();
  };

  return (
    <>
      <CreateTaskScreenOptions
        onCancelPress={handleCancelPress}
        onCreatePress={handleCreatePress}
        createBtnDisable={isValidating}
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
