import { type Children, type Style } from "../../types/props";
import { cn } from "../../utils/cn";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Children,
    Style {}

const Button: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={cn(
        "bg-blue-500 text-white font-semibold py-2 px-4 rounded",
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
