const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-foreground/5 rounded-3xl gap-y-4">
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-t-accent border-b-accent border-gray-300 animate-spin rounded-full" />
      
      {/* Text */}
      <p className="text-lg font-medium">Loading prompts...</p>
      <p className="text-sm text-muted-foreground/70">
        Please wait while we fetch your prompts.
      </p>
    </div>
  );
};

export default LoadingState;
