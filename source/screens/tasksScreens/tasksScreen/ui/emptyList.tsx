import { useTranslation } from "react-i18next";
import { MessageBlock } from "@ui";

const emptyImageSource = require("../../../../assets/images/emptyList.png");

export default function EmptyList() {
  const { t } = useTranslation();
  return (
    <MessageBlock
      title={t("tasksScreen.emptyTitle")}
      description={t("tasksScreen.emptyDescription")}
      imgPath={emptyImageSource}
    />
  );
}
