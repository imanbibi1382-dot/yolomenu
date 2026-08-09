import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import {
  Check,
  ImagePlus,
  Lock,
  Plus,
  RotateCcw,
  Save,
  Search,
  Trash2,
} from 'lucide-react';

import { categories } from '@/data/menuData';
import {
  resetMenuItems,
  useEditableMenuItems,
} from '@/lib/menuStorage';
import { cn, formatPrice } from '@/lib/utils';
import { BadgeType, MenuItem } from '@/types';

const ADMIN_PIN = 'yolo-1405';

const emptyItem: MenuItem = {
  id: '',
  name: '',
  englishName: '',
  price: 0,
  description: '',
  ingredients: '',
  image: '',
  tags: [],
  isAvailable: true,
  categoryId: categories[0].id,
};

function makeId() {
  return `admin-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function itemToForm(item?: MenuItem): MenuItem {
  return item ? { ...item, tags: [...(item.tags || [])] } : { ...emptyItem, id: makeId() };
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(
    () => window.localStorage.getItem('yolo-admin-unlocked') === 'true',
  );
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [items, setItems] = useEditableMenuItems();
  const [selectedId, setSelectedId] = useState(items[0]?.id || '');
  const [query, setQuery] = useState('');
  const [form, setForm] = useState<MenuItem>(() => itemToForm(items[0]));
  const [saved, setSaved] = useState(false);

  const selectedItem = items.find((item) => item.id === selectedId);

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
        .includes(normalized),
    );
  }, [items, query]);

  const stats = useMemo(
    () => ({
      total: items.length,
      available: items.filter((item) => item.isAvailable).length,
      hidden: items.filter((item) => !item.isAvailable).length,
    }),
    [items],
  );

  const openItem = (item: MenuItem) => {
    setSelectedId(item.id);
    setForm(itemToForm(item));
    setSaved(false);
  };

  const startNewItem = () => {
    const next = itemToForm();
    setSelectedId(next.id);
    setForm(next);
    setSaved(false);
  };

  const submitPin = (event: FormEvent) => {
    event.preventDefault();
    if (pin.trim() !== ADMIN_PIN) {
      setPinError('رمز ورود درست نیست.');
      return;
    }

    window.localStorage.setItem('yolo-admin-unlocked', 'true');
    setUnlocked(true);
  };

  const updateField = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const updateBadge = (type: BadgeType | '') => {
    updateField(
      'badge',
      type
        ? {
            type,
            label:
              type === 'bestseller'
                ? 'پرفروش'
                : type === 'barista'
                  ? 'توصیه باریستا'
                  : 'جدید',
          }
        : undefined,
    );
  };

  const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      updateField('image', String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const saveItem = (event: FormEvent) => {
    event.preventDefault();

    const cleaned: MenuItem = {
      ...form,
      name: form.name.trim(),
      englishName: form.englishName.trim(),
      price: Number(form.price) || 0,
      description: form.description.trim(),
      ingredients: form.ingredients?.trim(),
      image: form.image?.trim(),
      tags: (form.tags || []).map((tag) => tag.trim()).filter(Boolean),
    };

    const exists = items.some((item) => item.id === cleaned.id);
    const nextItems = exists
      ? items.map((item) => (item.id === cleaned.id ? cleaned : item))
      : [cleaned, ...items];

    setItems(nextItems);
    setSelectedId(cleaned.id);
    setForm(cleaned);
    setSaved(true);
  };

  const deleteItem = () => {
    const nextItems = items.filter((item) => item.id !== form.id);
    setItems(nextItems);
    const nextSelected = nextItems[0];
    setSelectedId(nextSelected?.id || '');
    setForm(itemToForm(nextSelected));
    setSaved(false);
  };

  const resetAll = () => {
    if (!window.confirm('همه تغییرات پنل حذف شود و منو به حالت اولیه برگردد؟')) {
      return;
    }

    resetMenuItems();
    window.location.reload();
  };

  if (!unlocked) {
    return (
      <main className="min-h-[100dvh] bg-yolo-navy px-5 py-10 text-yolo-white" dir="rtl">
        <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-md flex-col justify-center">
          <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl bg-yolo-ivory text-yolo-navy">
            <Lock size={26} />
          </div>
          <h1 className="text-3xl font-black">پنل مدیریت YOLO</h1>
          <p className="mt-3 text-sm leading-7 text-yolo-ivory/75">
            ورود این بخش با مسیر مخفی و رمز داخلی محافظت شده است.
          </p>

          <form onSubmit={submitPin} className="mt-8 space-y-3">
            <input
              value={pin}
              onChange={(event) => {
                setPin(event.target.value);
                setPinError('');
              }}
              type="password"
              placeholder="رمز ورود"
              className="h-12 w-full rounded-lg border border-yolo-ivory/15 bg-white/10 px-4 text-base outline-none transition focus:border-yolo-ivory"
            />
            {pinError && <p className="text-sm text-red-200">{pinError}</p>}
            <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-yolo-ivory font-bold text-yolo-navy">
              <Check size={18} />
              ورود
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-background text-foreground" dir="rtl">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-5 lg:px-6">
        <header className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              YOLO Admin
            </p>
            <h1 className="mt-1 text-2xl font-black">مدیریت منو</h1>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <p className="text-lg font-black">{stats.total}</p>
              <p className="text-xs text-muted-foreground">آیتم</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <p className="text-lg font-black">{stats.available}</p>
              <p className="text-xs text-muted-foreground">موجود</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <p className="text-lg font-black">{stats.hidden}</p>
              <p className="text-xs text-muted-foreground">ناموجود</p>
            </div>
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="min-h-0 rounded-lg border border-border bg-card">
            <div className="border-b border-border p-3">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="جستجو در آیتم‌ها"
                  className="h-10 w-full rounded-lg border border-border bg-background pr-9 pl-3 text-sm outline-none focus:border-primary"
                />
              </div>
              <button
                onClick={startNewItem}
                className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-yolo-navy text-sm font-bold text-yolo-white dark:bg-yolo-ivory dark:text-yolo-navy"
              >
                <Plus size={17} />
                آیتم جدید
              </button>
            </div>
            <div className="max-h-[72dvh] overflow-y-auto p-2">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => openItem(item)}
                  className={cn(
                    'mb-2 flex w-full items-center gap-3 rounded-lg border p-2 text-right transition',
                    selectedId === item.id
                      ? 'border-primary bg-accent'
                      : 'border-transparent hover:border-border hover:bg-background',
                  )}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="h-14 w-14 rounded-md object-cover bg-muted"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-bold">{item.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {formatPrice(item.price)} تومان
                    </span>
                  </span>
                  <span
                    className={cn(
                      'h-2.5 w-2.5 rounded-full',
                      item.isAvailable ? 'bg-yolo-green' : 'bg-destructive',
                    )}
                  />
                </button>
              ))}
            </div>
          </aside>

          <form onSubmit={saveItem} className="rounded-lg border border-border bg-card p-4 lg:p-5">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-xs font-bold text-muted-foreground">نام فارسی</span>
                  <input
                    required
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-bold text-muted-foreground">نام انگلیسی</span>
                  <input
                    required
                    dir="ltr"
                    value={form.englishName}
                    onChange={(event) => updateField('englishName', event.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-bold text-muted-foreground">قیمت تومان</span>
                  <input
                    required
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(event) => updateField('price', Number(event.target.value))}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-bold text-muted-foreground">دسته‌بندی</span>
                  <select
                    value={form.categoryId}
                    onChange={(event) => updateField('categoryId', event.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-bold text-muted-foreground">توضیحات</span>
                  <textarea
                    required
                    value={form.description}
                    onChange={(event) => updateField('description', event.target.value)}
                    rows={4}
                    className="w-full resize-none rounded-lg border border-border bg-background px-3 py-2 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-bold text-muted-foreground">ترکیبات</span>
                  <input
                    value={form.ingredients || ''}
                    onChange={(event) => updateField('ingredients', event.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </label>
                <label className="space-y-1.5 sm:col-span-2">
                  <span className="text-xs font-bold text-muted-foreground">تگ‌ها با کاما</span>
                  <input
                    value={(form.tags || []).join(', ')}
                    onChange={(event) =>
                      updateField(
                        'tags',
                        event.target.value.split(',').map((tag) => tag.trim()),
                      )
                    }
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  />
                </label>
              </div>

              <div className="space-y-4">
                <div className="overflow-hidden rounded-lg border border-border bg-background">
                  {form.image ? (
                    <img src={form.image} alt="" className="aspect-square w-full object-cover" />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center bg-muted text-muted-foreground">
                      <ImagePlus size={32} />
                    </div>
                  )}
                </div>
                <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-bold">
                  <ImagePlus size={17} />
                  آپلود عکس
                  <input type="file" accept="image/*" onChange={handleImageFile} className="hidden" />
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-bold text-muted-foreground">آدرس عکس</span>
                  <input
                    dir="ltr"
                    value={form.image || ''}
                    onChange={(event) => updateField('image', event.target.value)}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-primary"
                  />
                </label>
                <label className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                  <span className="text-sm font-bold">موجود باشد</span>
                  <input
                    type="checkbox"
                    checked={form.isAvailable}
                    onChange={(event) => updateField('isAvailable', event.target.checked)}
                    className="h-5 w-5"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-bold text-muted-foreground">نشان</span>
                  <select
                    value={form.badge?.type || ''}
                    onChange={(event) => updateBadge(event.target.value as BadgeType | '')}
                    className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
                  >
                    <option value="">بدون نشان</option>
                    <option value="bestseller">پرفروش</option>
                    <option value="barista">توصیه باریستا</option>
                    <option value="new">جدید</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
              <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-yolo-navy font-bold text-yolo-white dark:bg-yolo-ivory dark:text-yolo-navy">
                <Save size={18} />
                ذخیره آیتم
              </button>
              {selectedItem && (
                <button
                  type="button"
                  onClick={deleteItem}
                  className="flex h-11 items-center justify-center gap-2 rounded-lg border border-destructive/30 px-4 font-bold text-destructive"
                >
                  <Trash2 size={18} />
                  حذف
                </button>
              )}
              <button
                type="button"
                onClick={resetAll}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 font-bold"
              >
                <RotateCcw size={18} />
                ریست منو
              </button>
            </div>

            {saved && (
              <p className="mt-3 rounded-lg bg-yolo-green/10 px-3 py-2 text-sm font-bold text-yolo-green">
                تغییرات ذخیره شد و در صفحه منو اعمال می‌شود.
              </p>
            )}
          </form>
        </div>
      </div>
    </main>
  );
}
