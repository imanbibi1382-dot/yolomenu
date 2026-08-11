import { MenuItem } from '@/types';

export interface ItemFormState {
  values: MenuItem;
  isDirty: boolean;
  errors: Record<string, string>;
}

export interface AdminContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}