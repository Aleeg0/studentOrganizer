import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Colors, useColorScheme } from "@/shared/theme";
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
import { getBeautifulTime } from "@/screens/tasksScreens/createTaskScreen/ui/lib";

interface Props {
  time: Date | null;
  setTime: (time: Date | null) => void;
  isReadOnly?: boolean;
}

const today = new Date();

export default function TimeTogglePicker({
  time,
  setTime,
  isReadOnly = false,
}: Props) {
  const [isOn, setIsOn] = useState<boolean>(!!time);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, i18n } = useTranslation();
  const [theme] = useColorScheme();

  const handleIsOnChange: ToggleProps["onIsOnChange"] = (value) => {
    setIsOn(value);
    setTime(value ? today : null);
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
          <Image size={20} systemName={"clock"} color={"gray"} />
          <VStack alignment="leading">
            <Text modifiers={[tint(Colors[theme].textPrimary)]}>
              {t("createTaskScreen.deadline.timeTitle")}
            </Text>
            {isOn && (
              <Text modifiers={[font({ size: 13 })]}>
                {getBeautifulTime(time!, i18n.language)}
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
          selection={time!}
          displayedComponents={["hourAndMinute"]}
          onDateChange={setTime}
          modifiers={[
            datePickerStyle("wheel"),
            listRowInsets({ top: 0, leading: 12, trailing: 12 }),
            labelsHidden(),
          ]}
        />
      )}
    </>
  );
}
