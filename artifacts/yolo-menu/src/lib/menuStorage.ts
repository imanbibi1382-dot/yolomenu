import { useCallback, useEffect, useState } from 'react';

import { menuItems as defaultMenuItems } from '@/data/menuData';
import { MenuItem } from '@/types';

const STORAGE_KEY = 'yolo-admin-menu-items';
const EVENT_NAME = 'yolo-menu-items-updated';

function cloneDefaultItems() {
  return defaultMenuItems.map((item) => ({ ...item }));
}

function readStoredItems(): MenuItem[] {
  if (typeof window === 'undefined') return cloneDefaultItems();

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return cloneDefaultItems();

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return cloneDefaultItems();
    return parsed as MenuItem[];
  } catch {
    return cloneDefaultItems();
  }
}

export function getMenuItems() {
  return readStoredItems();
}

export function saveMenuItems(items: MenuItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function resetMenuItems() {
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(EVENT_NAME));
}

export function useEditableMenuItems() {
  const [items, setItems] = useState<MenuItem[]>(() => readStoredItems());

  useEffect(() => {
    const refresh = () => setItems(readStoredItems());

    window.addEventListener(EVENT_NAME, refresh);
    window.addEventListener('storage', refresh);

    return () => {
      window.removeEventListener(EVENT_NAME, refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const updateItems = useCallback((nextItems: MenuItem[]) => {
    saveMenuItems(nextItems);
    setItems(nextItems);
  }, []);

  return [items, updateItems] as const;
}
