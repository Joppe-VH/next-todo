const spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ${className}`}
    />
  );
};
export default spinner;
