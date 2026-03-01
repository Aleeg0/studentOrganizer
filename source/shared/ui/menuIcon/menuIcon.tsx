import { Button, ButtonProps, Host, Menu, MenuProps } from "@expo/ui/swift-ui";
import { labelStyle, pickerStyle, tag } from "@expo/ui/swift-ui/modifiers";
import { useState } from "react";

export interface MenuIconProps {
  items: ButtonProps[];
}

export default function MenuIcon({ items }: MenuIconProps) {
  const [curIcon, setCurIcon] = useState<MenuProps["systemImage"]>(
    items?.[0].systemImage ?? "1.circle"
  );

  const handlePress = (item: ButtonProps) => {
    setCurIcon(item.systemImage ?? curIcon);
    item.onPress?.();
  };

  return (
    <Host matchContents>
      <Menu
        label="Icon Only Button"
        systemImage={curIcon}
        modifiers={[labelStyle("iconOnly"), pickerStyle("menu")]}
      >
        {items.map((item, index) => (
          <Button
            key={index}
            {...item}
            onPress={() => handlePress(item)}
            modifiers={[tag(index)]}
          />
        ))}
      </Menu>
    </Host>
  );
}
