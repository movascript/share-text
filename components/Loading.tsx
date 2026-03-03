const Loading = () => {
  return (
    <span className="flex m-2 items-center gap-2">
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.2s]" />
      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-.4s]" />
    </span>
  );
};

export default Loading;
