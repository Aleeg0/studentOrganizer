import { Stack, useRouter } from "expo-router";
import { Host, List } from "@expo/ui/swift-ui";
import CloseButton from "./ui/headerButtons/closeButton";
import AddTaskButton from "./ui/headerButtons/addTaskButton";
import DeadlineSection from "./ui/deadlineSection";
import BaseInfoSection from "./ui/baseInfoSection";
import { useState } from "react";
import { useTasks } from "@entities/tasks";

export default function CreateTaskScreen() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const router = useRouter();
  const { addTask } = useTasks();

  const handlePress = async () => {
    router.dismiss();
    await addTask({
      name,
      description,
      deadline: deadline?.toString() ?? null,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerLeft: CloseButton,
          headerRight: () => <AddTaskButton onPress={handlePress} />,
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
          <DeadlineSection date={deadline} onSelectDate={setDeadline} />
        </List>
      </Host>
    </>
  );
}
