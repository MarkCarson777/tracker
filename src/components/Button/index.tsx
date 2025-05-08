interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

export function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
