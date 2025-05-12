import type { ReactElement } from "react";

import Check from "./icons/check.svg?react";
import Close from "./icons/close.svg?react";
import Trash from "./icons/trash.svg?react";

export interface IconProps {
  icon: string;
  color?: string;
  size?: number;
  [key: string]: any;
}

interface IconComponents {
  [key: string]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

const icons: IconComponents = {
  Check,
  Close,
  Trash,
};

export function Icon({ icon, color, size, ...rest }: IconProps): ReactElement {
  const Component = icons[icon];

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
