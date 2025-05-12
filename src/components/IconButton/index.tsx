import { type Style } from "../../types/props";
import { cn } from "../../utils/cn";
import { Icon } from "../Icon";

interface Props extends Style {
  // The icon to be rendered
  icon: string;
  // The size of the icon in pixels
  size: number;
  // Additional classes for styling
  className?: string;
  // Function to handle click events
  onClick: () => void;
}

const IconButton: React.FC<Props> = ({ icon, size, className, onClick }) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center border border-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-300",
        className
      )}
      onClick={onClick}
    >
      <Icon color="#447df7" icon={icon} size={size} />
    </button>
  );
};

export { IconButton };
