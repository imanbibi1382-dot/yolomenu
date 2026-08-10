import assert from 'node:assert/strict';
import test from 'node:test';

import { filterMenuItems } from './menuFilters';

test('returns all items for empty search query', () => {
  const items = [
    { id: '1', name: 'قهوه', englishName: 'Coffee', description: 'Classic', tags: ['hot'] },
    { id: '2', name: 'شیک', englishName: 'Shake', description: 'Cold', tags: ['sweet'] },
  ] as any;

  assert.deepEqual(filterMenuItems(items, ''), items);
});

test('matches name, english name, description and tags case-insensitively', () => {
  const items = [
    { id: '1', name: 'قهوه', englishName: 'Coffee', description: 'Classic', tags: ['hot'] },
    { id: '2', name: 'شیک', englishName: 'Shake', description: 'Cold', tags: ['sweet'] },
    { id: '3', name: 'کاپوچینو', englishName: 'Cappuccino', description: 'Milk foam', tags: ['cream'] },
  ] as any;

  assert.deepEqual(filterMenuItems(items, 'cappu'), [{ id: '3', name: 'کاپوچینو', englishName: 'Cappuccino', description: 'Milk foam', tags: ['cream'] }]);
  assert.deepEqual(filterMenuItems(items, 'SWEET'), [{ id: '2', name: 'شیک', englishName: 'Shake', description: 'Cold', tags: ['sweet'] }]);
});
