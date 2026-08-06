export type BadgeType = 'bestseller' | 'barista' | 'new';

export interface BadgeInfo {
  type: BadgeType;
  label: string;
}

export interface MenuItem {
  id: string;
  name: string;
  englishName: string;
  price: number;
  description: string;
  ingredients?: string;
  isAvailable: boolean;
  categoryId: string;
  badge?: BadgeInfo;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}