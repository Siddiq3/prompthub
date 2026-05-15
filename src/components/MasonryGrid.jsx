function MasonryGrid({ items, renderItem, children }) {
  // Support both children and items+renderItem patterns
  if (children) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {children}
      </div>
    );
  }

  // Fallback for items+renderItem pattern
  if (!Array.isArray(items)) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <p className="col-span-full text-center text-slate-600 dark:text-slate-400">
          No items to display
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item, index) => (
        <div key={item.id}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default MasonryGrid;
