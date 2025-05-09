import type { ReactNode } from "react";

/**
 * Apply react style props to a component.
 */
export interface Style {
  /** Additional classes to apply to the component. */
  className?: string;
  /** Additional styles to apply to the component. */
  style?: React.CSSProperties;
}

/**
 * Apply react children prop to a component.
 */
export interface Children {
  children?: ReactNode;
}
