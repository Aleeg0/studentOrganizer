import { useTranslation } from "react-i18next";
import { Section } from "@expo/ui/swift-ui";
import DateTogglePicker from "./dateTogglePicker";
import TimeTogglePicker from "./timeTogglePicker";
import ReminderPicker from "./reminderPicker";

interface Props {
  date: Date | null;
  setDate: (date: Date | null) => void;
  time: Date | null;
  setTime: (date: Date | null) => void;
  reminder: number;
  setReminder: (reminder: number) => void;
  isReadOnly?: boolean;
}

export default function DeadlineSection({
  date,
  setDate,
  time,
  setTime,
  reminder,
  setReminder,
  isReadOnly = false,
}: Props) {
  const { t } = useTranslation();

  return (
    <Section title={t("createTaskScreen.deadline.sectionTitle")}>
      <DateTogglePicker date={date} setDate={setDate} isReadOnly={isReadOnly} />
      <TimeTogglePicker time={time} setTime={setTime} isReadOnly={isReadOnly} />
      <ReminderPicker
        reminder={reminder}
        setReminder={setReminder}
        isReadOnly={!(!isReadOnly && date && time)}
      />
    </Section>
  );
}
