function MasonryGrid({ items, renderItem }) {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 2xl:columns-4">
      {items.map((item) => (
        <div key={item.id} className="mb-5 break-inside-avoid">
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default MasonryGrid;
