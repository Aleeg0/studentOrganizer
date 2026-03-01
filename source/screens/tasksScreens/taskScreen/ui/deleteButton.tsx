import { Button, HStack, Spacer, Text } from "@expo/ui/swift-ui";
import { useTranslation } from "react-i18next";
import { labelsHidden } from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";
import { Alert } from "react-native";

interface Props {
  onDelete: () => Promise<void>;
}

export default function DeleteButton({ onDelete }: Props) {
  const [isAlertShow, setIsAlertShow] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleDelete = async () => {
    Alert.alert(
      t("taskScreen.deleteAlert.title"),
      t("taskScreen.deleteAlert.description"),
      [
        {
          text: t("taskScreen.deleteAlert.cancelBtnCaption"),
          style: "cancel",
          onPress: () => setIsAlertShow(false),
        },
        {
          text: t("taskScreen.deleteAlert.submitBtnCaption"),
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <Button
      role={"destructive"}
      modifiers={[labelsHidden()]}
      onPress={handleDelete}
    >
      <HStack>
        <Spacer />
        <Text>{t("taskScreen.deleteBtnCaption")}</Text>
        <Spacer />
      </HStack>
    </Button>
  );
}
