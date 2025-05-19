// Types
import { type Children, type Style } from "../../types/props";
import { cn } from "../../utils/cn";

interface Props
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    Children,
    Style {
  variant: "primary" | "secondary";
}

const Button: React.FC<Props> = ({
  variant,
  children,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={cn(
        "w-full font-semibold h-10 px-3 rounded-lg flex items-center justify-center space-x-2 cursor-pointer",
        variant === "primary" && "bg-[#2A2A2A] text-[#E6FEAD] hover:bg-black",
        variant === "secondary" &&
          "bg-white text-[#2A2A2A] border-2 border-[#2A2A2A] hover:bg-gray-50",
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
