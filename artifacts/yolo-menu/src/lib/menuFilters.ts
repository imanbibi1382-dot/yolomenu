import { MenuItem } from '@/types';

export function filterMenuItems(items: MenuItem[], query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return items;

  return items.filter((item) => {
    const searchableText = [
      item.name,
      item.englishName,
      item.description,
      item.ingredients || '',
      ...(item.tags || []),
    ]
      .join(' ')
      .toLowerCase();

    return searchableText.includes(normalizedQuery);
  });
}

export function getCategoryItems(items: MenuItem[], categoryId: string) {
  return items.filter((item) => item.categoryId === categoryId);
}
