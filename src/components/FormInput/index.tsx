// Components
import { Checkbox } from "../Checkbox";
import { Input } from "../Input";
// Forms
import { useFormContext } from "react-hook-form";
// Utilities
import { get } from "lodash";
// Styles
import { type Style } from "../../types/props";

interface Props extends Style {
  id: string;
  fieldName: string;
  label?: string;
  type: "text" | "textarea" | "checkbox";
  placeholder?: string;
}

const FormInput: React.FC<Props> = ({
  id,
  fieldName,
  label,
  type,
  placeholder,
}) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  const error = get(errors, fieldName);

  return (
    <div className="flex flex-col">
      {label && <label htmlFor={id}>{label}</label>}
      {type === "text" && (
        <Input id={id} placeholder={placeholder} {...register(fieldName)} />
      )}
      {type === "textarea" && (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          className="border rounded flex w-full pl-2 pt-1"
          {...register(fieldName)}
        />
      )}
      {type === "checkbox" && <Checkbox {...register(fieldName)} />}
      {error && (
        <span className="text-xs text-red-500">{String(error.message)}</span>
      )}
    </div>
  );
};

export { FormInput };
