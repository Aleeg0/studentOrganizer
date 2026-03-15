import { Href, Router, useRouter } from "expo-router";
import UiButton, { UiButtonProps } from "../uiButton/uiButton";

export interface UiLinkButtonProps extends Omit<UiButtonProps, "onPress"> {
  to?: Href;
  action?: (router: Router) => void;
}

export default function UiLinkButton({
  to,
  action,
  ...props
}: UiLinkButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (action) {
      action(router);
    } else if (to) {
      router.push(to);
    }
  };

  return <UiButton {...props} onPress={handlePress} />;
}
