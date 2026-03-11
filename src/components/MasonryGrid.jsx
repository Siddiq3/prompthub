function MasonryGrid({ items, renderItem }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="fade-in-up"
          style={{ animationDelay: `${Math.min(index, 11) * 28}ms` }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default MasonryGrid;
