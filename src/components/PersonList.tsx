import type { ReactNode } from 'react';

type PersonListProps<T> = {
  items: T[];
  loading?: boolean;
  skeleton?: ReactNode;
  skeletonCount?: number;
  emptyMessage?: string;
  noResultsMessage?: string;
  gridClass?: string;
  renderItem: (item: T) => ReactNode;
  keyExtractor?: (item: T, index: number) => string | number;
};

export function PersonList<T>({
  items,
  loading = false,
  skeleton,
  skeletonCount = 4,
  emptyMessage = 'Nenhum item encontrado.',
  noResultsMessage: _noResultsMessage = 'Nenhum item encontrado para os filtros aplicados.',
  gridClass = 'grid gap-4 sm:gap-5 lg:gap-5 xl:gap-6 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4',
  renderItem,
  keyExtractor,
}: PersonListProps<T>) {
  if (loading) {
    const itemsArr = Array.from({ length: skeletonCount });
    return (
      <div className={gridClass}>
        {itemsArr.map((_, i) => (
          <div key={i}>{skeleton ?? <div className="h-24 bg-border rounded" />}</div>
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return <p className="text-muted text-center py-12">{emptyMessage}</p>;
  }

  return (
    <div className={gridClass}>
      {items.map((item, idx) => (
        <div key={keyExtractor ? keyExtractor(item, idx) : (idx as number)}>
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default PersonList;
