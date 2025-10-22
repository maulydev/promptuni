const ErrorState = ({ error }: { error: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-foreground/5 rounded-3xl">
      <div className="bg-foreground/5 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
        <span className="text-2xl">😕</span>
      </div>
      <div className="text-center py-4 text-red-500">{error}</div>
      <p className="text-muted-foreground text-lg mb-6">
        Try reloading your page and if error persist contact support.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/80 transition-colors shadow-sm"
      >
        Reload
      </button>
    </div>
  );
};

export default ErrorState;
