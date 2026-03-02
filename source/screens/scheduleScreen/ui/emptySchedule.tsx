import { useTranslation } from "react-i18next";
import { MessageBlock } from "@ui";

const emptyImageSource = require("../../../assets/images/emptySchedule.png");

export default function EmptySchedule() {
  const { t } = useTranslation();
  return (
    <MessageBlock
      title={t("scheduleScreen.emptyTitle")}
      description={t("scheduleScreen.emptyDescription")}
      imgPath={emptyImageSource}
    />
  );
}
