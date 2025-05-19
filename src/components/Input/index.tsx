// Types
import { type Style } from "../../types/props";
// Utilities
import { cn } from "../../utils/cn";

interface Props extends React.InputHTMLAttributes<HTMLInputElement>, Style {}

/**
 * Capture user input for use in forms, searches etc.
 */

const Input: React.FC<Props> = ({
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
        "rounded-lg border-2 border-[#2A2A2A] h-10 pl-2 w-full bg-white",
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
