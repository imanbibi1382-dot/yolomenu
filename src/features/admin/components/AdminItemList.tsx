import { MenuItem } from '@/types';
import { Search, ChevronLeft } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { useMemo, useState } from 'react';
import { categories } from '@/data/menuData';

interface AdminItemListProps {
  items: MenuItem[];
  onEdit: (id: string) => void;
}

export function AdminItemList({ items, onEdit }: AdminItemListProps) {
  const [query, setQuery] = useState('');

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;

    return items.filter((item) =>
      [
        item.name,
        item.englishName,
        item.description,
        item.ingredients || '',
        categories.find((category) => category.id === item.categoryId)?.name || '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    );
  }, [items, query]);

  return (
    <div className="mt-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="جستجو در آیتم‌ها..."
          className="h-10 w-full rounded-lg border border-border bg-background pr-9 pl-3 text-sm outline-none focus:border-primary"
        />
      </div>

      {/* Items Grid */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onEdit(item.id)}
            className="group relative overflow-hidden rounded-lg border border-border bg-card text-right transition hover:border-primary hover:shadow-md"
          >
            <div className="aspect-square overflow-hidden bg-muted">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  بدون عکس
                </div>
              )}
            </div>

            <div className="p-3">
              <h3 className="truncate font-bold text-sm">{item.name}</h3>
              <p className="text-xs text-muted-foreground truncate">
                {item.englishName}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <span className="font-bold text-sm">{formatPrice(item.price)}</span>
                <span
                  className={cn(
                    'h-2 w-2 rounded-full',
                    item.isAvailable ? 'bg-yolo-green' : 'bg-destructive'
                  )}
                />
              </div>
            </div>

            <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 opacity-0 transition group-hover:opacity-100">
              <ChevronLeft size={16} className="text-primary" />
            </div>

            {item.badge && (
              <div className="absolute left-2 top-2 rounded-full bg-primary px-2 py-1">
                <p className="text-xs font-bold text-yolo-white">
                  {item.badge.type === 'bestseller'
                    ? '🔥'
                    : item.badge.type === 'barista'
                      ? '☕'
                      : '✨'}
                </p>
              </div>
            )}
          </button>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="mt-10 flex flex-col items-center justify-center py-10 text-center">
          <p className="text-muted-foreground">هیچ آیتمی پیدا نشد</p>
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mt-2 text-sm text-primary hover:underline"
            >
              پاک کردن جستجو
            </button>
          )}
        </div>
      )}
    </div>
  );
}