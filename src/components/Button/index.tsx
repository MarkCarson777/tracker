// Types
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
        "w-full  bg-[#2A2A2A] text-[#E6FEAD] font-semibold py-2 px-3 rounded-lg flex items-center justify-center space-x-2",
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
