// Components
import { Icon } from "../Icon";
// Forms
import { useFormContext } from "react-hook-form";
// Styles
import type { Style } from "../../types/props";

interface Props extends Style {
  name: string;
}

const Checkbox: React.FC<Props> = ({ name }) => {
  const { register } = useFormContext();

  return (
    <label>
      <input type="checkbox" {...register(name)} className="sr-only peer" />
      <div className="flex items-center justify-center size-5 rounded border border-gray-400 peer-checked:bg-blue-500 peer-checked:border-blue-500">
        <Icon icon="Check" size={14} color="#FFFFFF" />
      </div>
    </label>
  );
};

export { Checkbox };
