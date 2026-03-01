import { useTranslation } from "react-i18next";
import { Button, ButtonProps, Host, Menu } from "@expo/ui/swift-ui";
import { labelStyle, tag } from "@expo/ui/swift-ui/modifiers";
import { LessonNumSubgroup } from "@entities/lessons";

interface Props {
  subgroup: LessonNumSubgroup;
  onChangeSubgroup: (subgroup: LessonNumSubgroup) => void;
}

function RightHeader({ subgroup, onChangeSubgroup }: Props) {
  const { t } = useTranslation();
  const items: ButtonProps[] = [
    {
      label: t("scheduleScreen.menu.allSubgroups"),
      systemImage: "person.2",
    },
    {
      label: t("scheduleScreen.menu.firstSubgroup"),
      systemImage: "1.circle",
    },
    {
      label: t("scheduleScreen.menu.secondSubgroup"),
      systemImage: "2.circle",
    },
  ];
  const subgroupMap: LessonNumSubgroup[] = [0, 1, 2] as const;

  return (
    <Host matchContents>
      <Menu
        label="Icon Only Button"
        systemImage={items[subgroup].systemImage}
        modifiers={[labelStyle("iconOnly")]}
      >
        {items.map((item, index) => (
          <Button
            key={index}
            label={item.label}
            systemImage={item.systemImage}
            onPress={() => onChangeSubgroup(subgroupMap[index])}
            modifiers={[tag(index)]}
          />
        ))}
      </Menu>
    </Host>
  );
}

export default RightHeader;
