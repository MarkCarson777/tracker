import * as React from "react";
import { cn } from "../../utils/cn";

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  isChecked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  valid?: boolean;
  onChange: (isChecked: boolean) => void;
}

/**
 * The checkbox allows an option to be toggled on/off.
 */

const Checkbox: React.FC<Props> = ({
  isChecked = false,
  disabled = false,
  readOnly = false,
  valid = true,
  onChange,
  ...props
}) => {
  const onKeyDown =
    !disabled && !readOnly
      ? (e: React.KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === " ") {
            e.preventDefault();
            onChange(!isChecked);
          }
        }
      : undefined;

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isChecked}
      aria-readonly={readOnly}
      className={cn(
        // Base styles
        "relative rounded border-2 border-grey-200 text-white h-6 w-6",
        // Read only
        !readOnly && !disabled && "hover:border-ui-400",
        (readOnly || disabled) && "pointer-events-none",
        // Checked
        isChecked &&
          valid &&
          "border-transparent bg-blue-500 hover:border-transparent",
        isChecked && valid && !readOnly && !disabled && "hover:bg-blue-400",
        // Invalid
        !valid &&
          "border-blue-500 text-blue-500 hover:border-blue-400 hover:text-blue-400",
        // Disabled
        disabled && "opacity-50"
      )}
      onClick={() => onChange(!isChecked)}
      onKeyDown={onKeyDown}
      disabled={disabled || readOnly}
      {...props}
    >
      <span className="sr-only">{isChecked ? "Checked" : "Unchecked"}</span>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          !isChecked ? "invisible" : undefined
        )}
      >
        ?
      </div>
    </button>
  );
};

export { Checkbox };
