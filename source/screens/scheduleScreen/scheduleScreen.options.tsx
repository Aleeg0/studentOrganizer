import { useTranslation } from "react-i18next";
import { LessonNumSubgroup } from "@entities/lessons";
import { Stack } from "expo-router";
import { NativeStackHeaderItemButton } from "@react-navigation/native-stack";

interface Props {
  subgroup: LessonNumSubgroup;
  onChangeSubgroup: (subgroup: LessonNumSubgroup) => void;
  title: string;
  onShare: NativeStackHeaderItemButton["onPress"];
}

type ScheduleMenuItem = {
  label: NativeStackHeaderItemButton["label"];
  icon: NativeStackHeaderItemButton["icon"];
};

function ScheduleScreenOptions({
  subgroup,
  onChangeSubgroup,
  title,
  onShare,
}: Props) {
  const { t } = useTranslation();
  const items: ScheduleMenuItem[] = [
    {
      label: t("scheduleScreen.menu.allSubgroups"),
      icon: {
        type: "sfSymbol",
        name: "person.2",
      },
    },
    {
      label: t("scheduleScreen.menu.firstSubgroup"),
      icon: {
        type: "sfSymbol",
        name: "1.circle",
      },
    },
    {
      label: t("scheduleScreen.menu.secondSubgroup"),
      icon: {
        type: "sfSymbol",
        name: "2.circle",
      },
    },
  ];

  return (
    <Stack.Screen
      options={{
        title,
        unstable_headerRightItems: () => [
          {
            type: "button",
            label: "",
            icon: {
              name: "square.and.arrow.up",
              type: "sfSymbol",
            },
            onPress: onShare,
          },
          {
            type: "menu",
            label: "",
            icon: items[subgroup].icon,
            menu: {
              items: items.map((item, i) => ({
                type: "action",
                label: item.label,
                icon: item.icon,
                onPress: () => onChangeSubgroup(i as LessonNumSubgroup),
              })),
            },
          },
        ],
      }}
    />
  );
}

export default ScheduleScreenOptions;
