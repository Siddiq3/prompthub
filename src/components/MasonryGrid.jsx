function MasonryGrid({ items, renderItem }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4">
      {items.map((item, index) => (
        <div
          key={item.id}
          className="fade-in-up mb-5 break-inside-avoid"
          style={{ animationDelay: `${Math.min(index, 11) * 35}ms` }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default MasonryGrid;
