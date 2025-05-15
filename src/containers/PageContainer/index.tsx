interface Props {
  children: React.ReactNode;
}

const PageContainer: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {children}
    </div>
  );
};

export { PageContainer };
