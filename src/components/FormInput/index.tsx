// Components
import { Input } from "../Input";
// Forms
import { useFormContext } from "react-hook-form";
// Styles
import { type Style } from "../../types/props";

interface Props extends Style {
  id: string;
  label: string;
  type: "text" | "textarea" | "checkbox";
  placeholder?: string;
}

const FormInput: React.FC<Props> = ({ id, label, type, placeholder }) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;

  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id}>{label}</label>
      {type === "text" && (
        <Input id={id} placeholder={placeholder} {...register(id)} />
      )}
      {type === "textarea" && (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          className="border rounded flex w-full pl-2 pt-1"
          {...register(id)}
        />
      )}
      {type === "checkbox" && (
        <input
          type="checkbox"
          id={id}
          className="border rounded flex w-full"
          {...register(id)}
        />
      )}
      {/* Display error message if there is an error for this field */}
      {errors[id] && (
        <span className="text-xs text-red-500">
          {String(errors[id].message)}
        </span>
      )}
    </div>
  );
};

export { FormInput };
