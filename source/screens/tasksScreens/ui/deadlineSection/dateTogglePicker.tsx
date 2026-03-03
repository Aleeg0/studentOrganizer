import {
  Button,
  DatePicker,
  HStack,
  Image,
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
import { Colors, useColorScheme } from "@/shared/theme";
import { getBeautifulDate } from "@/screens/tasksScreens/createTaskScreen/ui/lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  date: Date | null;
  setDate: (date: Date | null) => void;
  isReadOnly?: boolean;
}

const today = new Date();

export default function DateTogglePicker({ date, setDate, isReadOnly }: Props) {
  const [isOn, setIsOn] = useState<boolean>(!!date);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const [theme] = useColorScheme();

  const handleIsOnChange: ToggleProps["onIsOnChange"] = (value) => {
    setIsOn(value);
    setDate(value ? today : null);
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
          <Image size={20} systemName={"calendar"} color={"gray"} />
          <VStack alignment="leading">
            <Text modifiers={[tint(Colors[theme].textPrimary)]}>
              {t("createTaskScreen.deadline.dataTitle")}
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
          onDateChange={setDate}
          modifiers={[
            datePickerStyle("graphical"),
            listRowInsets({ top: 0, leading: 12, trailing: 12 }),
            labelsHidden(),
          ]}
        />
      )}
    </>
  );
}
