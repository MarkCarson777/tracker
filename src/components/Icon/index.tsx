import type { ReactElement } from "react";

import Check from "./icons/check.svg?react";
import ChevronDown from "./icons/chevronDown.svg?react";
import ChevronUp from "./icons/chevronUp.svg?react";
import Close from "./icons/close.svg?react";
import Facebook from "./icons/facebook.svg?react";
import Google from "./icons/google.svg?react";
import Trash from "./icons/trash.svg?react";
import Warning from "./icons/warning.svg?react";

export interface IconProps {
  // The name of the icon to be rendered
  icon: string;
  // The color of the icon
  color?: string;
  // The size of the icon in pixels
  size?: number;
}

interface IconComponents {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const icons: IconComponents = {
  Check,
  ChevronDown,
  ChevronUp,
  Close,
  Facebook,
  Google,
  Trash,
  Warning,
};

export function Icon({ icon, color, size, ...rest }: IconProps): ReactElement {
  const Component = icons[icon];

  // If the icon is not found, log an error and return a warning icon
  if (!Component) {
    console.error(`Icon "${icon}" not found.`);
    return <Icon icon="Warning" color="#ea332e" size={16} />;
  }

  return (
    <Component
      className="inline-block"
      {...rest}
      fill={color}
      width={size}
      height={size}
    />
  );
}
