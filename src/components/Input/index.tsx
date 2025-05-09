import { cn } from "../../utils/cn";
import { type Style } from "../../types/props";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, Style {}

/**
 * Capture user input for use in forms, searches etc.
 */

const Input: React.FC<Props> = ({
  value,
  disabled = false,
  readOnly = false,
  className,
  ...props
}) => {
  return (
    <input
      {...props}
      className={cn(
        // Base styles
        "rounded border border-blue-500",
        // Read only & disabled
        !readOnly && !disabled && "hover:border-blue-400",
        // Disabled
        disabled && "opacity-50",
        // Read only
        readOnly && "opacity-100",
        // Additional classes
        className
      )}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
};

export { Input };
