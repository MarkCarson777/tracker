import { cn } from "../../utils/cn";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-blue-500 text-white font-semibold py-2 px-4 rounded",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
