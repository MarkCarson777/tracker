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
      <input type="checkbox" {...register(name)} className="sr-only" />
      <div className="flex items-center justify-center size-5 rounded border border-gray-400">
        {isChecked && <Icon icon="Check" size={14} color="#FFFFFF" />}
      </div>
    </label>
  );
};

export { Checkbox };
