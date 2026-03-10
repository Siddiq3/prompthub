function MasonryGrid({ items, renderItem }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="fade-in-up"
          style={{ animationDelay: `${Math.min(index, 11) * 35}ms` }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

export default MasonryGrid;
