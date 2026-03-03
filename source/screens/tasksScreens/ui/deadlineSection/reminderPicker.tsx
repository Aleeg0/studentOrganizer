import {
  Button,
  HStack,
  Image,
  Picker,
  Spacer,
  Text,
  Toggle,
  ToggleProps,
} from "@expo/ui/swift-ui";
import { disabled, pickerStyle, tag, tint } from "@expo/ui/swift-ui/modifiers";
import { useTranslation } from "react-i18next";
import { Colors, useColorScheme } from "@/shared/theme";
import { useState } from "react";

const REMINDER_OPTIONS = [
  { label: "За 2 минуты", value: 2 },
  { label: "За 30 минут", value: 30 },
  { label: "За 1 час", value: 60 },
  { label: "За 2 час", value: 60 },
  { label: "За 1 день", value: 1440 },
  { label: "За 1 неделю", value: 10080 },
];

interface Props {
  reminder: number;
  setReminder: (reminder: number) => void;
  isReadOnly?: boolean;
}

export default function ReminderPicker({
  reminder,
  setReminder,
  isReadOnly = false,
}: Props) {
  const [isOn, setIsOn] = useState<boolean>(!!reminder);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const [theme] = useColorScheme();

  const handleIsOnChange: ToggleProps["onIsOnChange"] = (value) => {
    setIsOn(value);
    setReminder(value ? REMINDER_OPTIONS[0].value : 0);
    setIsExpanded(value);
  };

  const handleOnTapExpanded = () => {
    if (isOn && !isReadOnly) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <Button onPress={handleOnTapExpanded} systemImage="calendar">
        <HStack spacing={8}>
          <Image size={20} systemName={"bell"} color={"gray"} />
          <Text modifiers={[tint(Colors[theme].textPrimary)]}>
            {t("createTaskScreen.deadline.reminderTitle")}
          </Text>
          <Spacer />
          <Toggle
            isOn={isOn}
            onIsOnChange={handleIsOnChange}
            modifiers={[tint("#35C759"), disabled(isReadOnly)]}
          />
        </HStack>
      </Button>
      {isExpanded && (
        <Picker
          selection={reminder}
          onSelectionChange={(selection) => {
            setReminder(selection);
          }}
          label={t("createTaskScreen.deadline.reminderPickerTitle")}
          modifiers={[pickerStyle("menu"), tint(Colors[theme].textSecondary)]}
        >
          {REMINDER_OPTIONS.map((option) => (
            <Text key={option.label} modifiers={[tag(option.value)]}>
              {option.label}
            </Text>
          ))}
        </Picker>
      )}
    </>
  );
}
