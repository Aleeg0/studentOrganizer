import { Section, TextField } from "@expo/ui/swift-ui";
import {
  disabled,
  font,
  lineLimit,
  listRowSeparator,
} from "@expo/ui/swift-ui/modifiers";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  name?: string;
  setName?: Dispatch<SetStateAction<string>>;
  description?: string;
  setDescription?: Dispatch<SetStateAction<string>>;
  isReadOnly?: boolean;
}

export default function BaseInfoSection({
  name = "",
  description = "",
  setName,
  setDescription,
  isReadOnly = false,
}: Props) {
  const { t } = useTranslation();

  return (
    <Section title={t("createTaskScreen.baseInfo.title")}>
      <TextField
        defaultValue={name}
        onChangeText={setName}
        modifiers={[
          font({ size: 20, weight: "bold" }),
          listRowSeparator("hidden"),
          disabled(isReadOnly),
        ]}
        placeholder={t("createTaskScreen.baseInfo.namePlaceholder")}
      />
      <TextField
        defaultValue={description}
        onChangeText={setDescription}
        multiline={true}
        modifiers={[font({ size: 16 }), lineLimit(10), disabled(isReadOnly)]}
        placeholder={t("createTaskScreen.baseInfo.descriptionPlaceholder")}
      />
    </Section>
  );
}
