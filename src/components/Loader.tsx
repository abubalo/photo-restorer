const Loader = () => {
  return (
    <div className="fixed  top-0 left-0 right-0 bottom-0 flex flex-col gap-2 items-center justify-center select-none">
      <div className="w-12 h-12 border-t-4 border-b-4 dark:border-white rounded-full animate-spin"></div>
      <div className="text-lg">Please wait while you request is processing...</div>
    </div>
  );
};

export default Loader;
