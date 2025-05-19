import { useState } from "react";
import { cn } from "../../utils/cn";
import type { Style } from "../../types/props";
import { Icon } from "../Icon";

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
    <div
      className={cn(
        "relative h-10 rounded w-full flex flex-col border border-gray-400 px-2 items-center justify-center cursor-pointer",
        className
      )}
    >
      <div
        className="flex items-center justify-between w-full"
        onClick={onToggleOpen}
      >
        <span
          className={
            selectedLabel === "Select an option"
              ? "text-gray-500"
              : "text-black"
          }
        >
          {selectedLabel}
        </span>
        <Icon
          icon={isOpen ? "ChevronUp" : "ChevronDown"}
          size={16}
          color="#9aa1ad"
        />
      </div>
      {isOpen && (
        <ul className="absolute top-full left-0 z-10 mt-2 w-full rounded-md shadow-lg bg-white border border-gray-400 focus:outline-none overflow-hidden">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => onOptionSelect(option)}
              className={cn(
                "flex items-center relative h-10 px-3 hover:bg-gray-200",
                selectedValue === option.value && "bg-gray-200"
              )}
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
