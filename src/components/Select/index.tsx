import { useState } from "react";
import { cn } from "../../utils/cn";
import type { Style } from "../../types/props";

interface Props extends Style {
  options: {
    label: string;
    value: string;
  }[];
  value: string;
  onChange: (value: string) => void;
}

const Select: React.FC<Props> = ({ value, options, className, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedLabel, setSelectedLabel] = useState(
    options.find((option) => option.value === value)?.label || ""
  );

  const onToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const onOptionSelect = (option: { label: string; value: string }) => {
    setSelectedValue(option.value);
    setSelectedLabel(option.label);
    onChange(option.value);
    setIsOpen(false);
  };

  return (
    <div className={cn("w-full", className)}>
      <div onClick={onToggleOpen}>
        {selectedLabel}
        <span>▼</span>
      </div>

      {isOpen && (
        <ul>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => onOptionSelect(option)}
              className={selectedValue === option.value ? "selected" : ""}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export { Select };
