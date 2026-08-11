import { MenuItem } from '@/types';
import { categories } from '@/data/menuData';

interface BasicInfoSectionProps {
  values: MenuItem;
  errors: Record<string, string>;
  onUpdate: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
}

export function BasicInfoSection({ values, errors, onUpdate }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-4">
        <h3 className="font-bold text-lg">اطلاعات پایه</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-1.5">
          <span className="text-xs font-bold text-muted-foreground">نام فارسی</span>
          <input
            required
            value={values.name}
            onChange={(e) => onUpdate('name', e.target.value)}
            className={`h-10 w-full rounded-lg border bg-background px-3 outline-none focus:border-primary ${
              errors.name ? 'border-destructive' : 'border-border'
            }`}
            placeholder="نام محصول به فارسی"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-bold text-muted-foreground">نام انگلیسی</span>
          <input
            required
            dir="ltr"
            value={values.englishName}
            onChange={(e) => onUpdate('englishName', e.target.value)}
            className={`h-10 w-full rounded-lg border bg-background px-3 outline-none focus:border-primary ${
              errors.englishName ? 'border-destructive' : 'border-border'
            }`}
            placeholder="Product name in English"
          />
          {errors.englishName && (
            <p className="text-xs text-destructive">{errors.englishName}</p>
          )}
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-bold text-muted-foreground">قیمت (تومان)</span>
          <input
            required
            type="number"
            min="0"
            step="1000"
            value={values.price}
            onChange={(e) => onUpdate('price', Number(e.target.value))}
            className={`h-10 w-full rounded-lg border bg-background px-3 outline-none focus:border-primary ${
              errors.price ? 'border-destructive' : 'border-border'
            }`}
          />
          {errors.price && (
            <p className="text-xs text-destructive">{errors.price}</p>
          )}
        </label>

        <label className="space-y-1.5">
          <span className="text-xs font-bold text-muted-foreground">دسته‌بندی</span>
          <select
            value={values.categoryId}
            onChange={(e) => onUpdate('categoryId', e.target.value)}
            className={`h-10 w-full rounded-lg border bg-background px-3 outline-none focus:border-primary ${
              errors.categoryId ? 'border-destructive' : 'border-border'
            }`}
          >
            <option value="">انتخاب دسته‌بندی</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-xs text-destructive">{errors.categoryId}</p>
          )}
        </label>
      </div>
    </div>
  );
}