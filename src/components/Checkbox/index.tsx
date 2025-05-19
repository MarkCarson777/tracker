// Components
import { Icon } from "../Icon";
// Forms
import { useFormContext, useWatch } from "react-hook-form";
// Types
import type { Style } from "../../types/props";

interface Props extends Style {
  // Name to be registered with react-hook-form
  name: string;
}

const Checkbox: React.FC<Props> = ({ name }) => {
  const { register, control } = useFormContext();
  const isChecked = useWatch({ control, name });

  return (
    <label>
      <input type="checkbox" {...register(name)} className="peer sr-only" />
      <div className="flex items-center justify-center size-5 rounded border-2 border-[#2A2A2A] peer-checked:bg-[#2A2A2A]">
        {isChecked && <Icon icon="Check" size={14} color="#E6FEAD" />}
      </div>
    </label>
  );
};

export { Checkbox };
