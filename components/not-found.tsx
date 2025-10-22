interface NotFoundProps {
  setSelectedCategory?: (category: string) => void;
  setSearchQuery?: (query: string) => void;
}

const NotFound = ({ setSelectedCategory, setSearchQuery }: NotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center bg-foreground/5 rounded-3xl">
      <div className="bg-foreground/5 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-6">
        <span className="text-2xl">😕</span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
        No prompts found
      </h2>
      <p className="text-muted-foreground text-lg mb-6">
        Try adjusting your search or selecting a different category.
      </p>
      {setSearchQuery && setSelectedCategory && (
        <button
          className="px-6 py-2 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/80 transition-colors shadow-sm"
          onClick={() => {
            setSelectedCategory("all");
            setSearchQuery("");
          }}
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default NotFound;
