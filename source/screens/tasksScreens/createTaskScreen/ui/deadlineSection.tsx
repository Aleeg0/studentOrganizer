import {
  Button,
  DatePicker,
  HStack,
  Image,
  Label,
  Section,
  Spacer,
  Text,
  Toggle,
  ToggleProps,
  VStack,
} from "@expo/ui/swift-ui";
import {
  datePickerStyle,
  disabled,
  font,
  labelsHidden,
  listRowInsets,
  tint,
} from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getBeautifulDate } from "@/screens/tasksScreens/createTaskScreen/ui/lib";
import { Colors, useColorScheme } from "@/shared/theme";

interface Props {
  date?: Date | null;
  onSelectDate?: (date: Date | null) => void;
  isReadOnly?: boolean;
}

const today = new Date();

export default function DeadlineSection({
  date = null,
  onSelectDate,
  isReadOnly = false,
}: Props) {
  const [isOn, setIsOn] = useState<boolean>(!!date);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const [theme] = useColorScheme();

  const handleIsOnChange: ToggleProps["onIsOnChange"] = (value) => {
    setIsOn(value);
    onSelectDate?.(value ? today : null);
    setIsExpanded(value);
  };

  const handleOnTapExpanded = () => {
    if (isOn && !isReadOnly) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Section title={t("createTaskScreen.deadlineTitle")}>
      <Button onPress={handleOnTapExpanded} systemImage="calendar">
        <HStack spacing={8}>
          <Image size={20} systemName={"calendar"} color={"gray"} />
          <VStack alignment="leading">
            <Text modifiers={[tint(Colors[theme].textPrimary)]}>
              {t("createTaskScreen.dataTitle")}
            </Text>
            {isOn && (
              <Text modifiers={[font({ size: 13 })]}>
                {getBeautifulDate(date!, t, i18n.language)}
              </Text>
            )}
          </VStack>
          <Spacer />
          <Toggle
            isOn={isOn}
            onIsOnChange={handleIsOnChange}
            modifiers={[tint("#35C759"), disabled(isReadOnly)]}
          />
        </HStack>
      </Button>
      {isExpanded && (
        <DatePicker
          range={{ start: today }}
          selection={date!}
          displayedComponents={["date"]}
          onDateChange={onSelectDate}
          modifiers={[
            datePickerStyle("graphical"),
            listRowInsets({ top: 0, leading: 12, trailing: 12 }),
            labelsHidden(),
          ]}
        />
      )}
      <Label title={"52"} />
    </Section>
  );
}
