const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="mb-3">
        <img
          src="/images/icons/no-folder.svg"
          alt="Empty folder icon"
          className="size-20"
        />
      </div>
      <p className="text-gray-300 text-xs">
        You don't have any orders yet. Click{" "}
        <span className="text-[#E75F34] text-xs !pointer-events-auto cursor-pointer">
          here
        </span>{" "}
        to build your first project.
      </p>
    </div>
  );
};

export default EmptyState;
