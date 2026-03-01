import { Section, SectionProps } from "@expo/ui/swift-ui";
import { useRouter } from "expo-router";
import GroupSectionItem from "./groupSectionItem";
import { StudentGroup } from "../../model/types";
import { getBeautifulDescription } from "../../model/lib";
import { useTranslation } from "react-i18next";

interface Props {
  title: SectionProps["title"];
  items: StudentGroup[];
}

export default function GroupSection({ title, items }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  const onPress = (name: StudentGroup["name"]) => {
    router.push(`/(tabs)/scheduler/${name}`);
  };

  return (
    <Section title={title}>
      {items.map((item) => (
        <GroupSectionItem
          key={item.name}
          onPress={() => onPress(item.name)}
          name={item.name}
          description={getBeautifulDescription({
            ...item,
            courseTitle: t("groupsScreen.courseTitle"),
          })}
        />
      ))}
    </Section>
  );
}
