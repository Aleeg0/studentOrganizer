import {
  Host,
  HStack,
  Image,
  Picker,
  PickerProps,
  Text,
} from "@expo/ui/swift-ui";
import {
  background,
  clipShape,
  frame,
  pickerStyle,
  tag,
} from "@expo/ui/swift-ui/modifiers";
import { useTranslation } from "react-i18next";

export default function LanguagePicker() {
  const { i18n, t } = useTranslation();

  const languages = [
    { code: "en", label: t("languagePicker.english") },
    { code: "ru", label: t("languagePicker.russian") },
  ];

  const handleSelectionChange: PickerProps["onSelectionChange"] = async (
    lng: string
  ) => {
    await i18n.changeLanguage(lng);
  };

  return (
    <Host>
      <HStack spacing={10}>
        <Image
          systemName="globe"
          color="white"
          size={18}
          modifiers={[
            frame({ width: 28, height: 28 }),
            background("#ff9100"),
            clipShape("roundedRectangle"),
          ]}
        />
        <Picker
          label={t("languagePicker.title")}
          selection={i18n.language}
          onSelectionChange={handleSelectionChange}
          modifiers={[pickerStyle("menu")]}
        >
          {languages.map((lang) => (
            <Text key={lang.code} modifiers={[tag(lang.code)]}>
              {lang.label}
            </Text>
          ))}
        </Picker>
      </HStack>
    </Host>
  );
}
