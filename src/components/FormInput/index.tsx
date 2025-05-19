// Components
import { Checkbox } from "../Checkbox";
import { Input } from "../Input";
// Forms
import { useFormContext } from "react-hook-form";
// Types
import { type Style } from "../../types/props";
// Utilities
import { get } from "lodash";

interface Props extends Style {
  // id for input element
  id: string;
  // Name to be registered with react-hook-form
  name: string;
  // Label for input element
  label?: string;
  // Type of input element
  type: "text" | "number" | "select" | "textarea" | "checkbox";
  // Placeholder for input element
  placeholder?: string;
}

const FormInput: React.FC<Props> = ({ id, name, label, type, placeholder }) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const error = get(errors, name);

  return (
    <div className="flex flex-col">
      {label && (
        <label className="text-xs mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      {type === "text" && (
        <Input id={id} placeholder={placeholder} {...register(name)} />
      )}
      {type === "number" && (
        <Input
          id={id}
          type="number"
          placeholder={placeholder}
          {...register(name)}
        />
      )}
      {type === "textarea" && (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          className="border rounded flex w-full pl-2 pt-1"
          {...register(name)}
        />
      )}
      {type === "checkbox" && <Checkbox {...register(name)} />}
      {error && (
        <span className="text-xs text-red-500">{String(error.message)}</span>
      )}
    </div>
  );
};

export { FormInput };
