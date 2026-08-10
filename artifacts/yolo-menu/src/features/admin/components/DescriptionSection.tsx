import { MenuItem } from '@/types';

interface DescriptionSectionProps {
  values: MenuItem;
  errors: Record<string, string>;
  onUpdate: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
}

export function DescriptionSection({
  values,
  errors,
  onUpdate,
}: DescriptionSectionProps) {
  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-4">
        <h3 className="font-bold text-lg">توضیحات و ترکیبات</h3>
      </div>

      <label className="space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">توضیحات محصول</span>
        <textarea
          required
          value={values.description}
          onChange={(e) => onUpdate('description', e.target.value)}
          rows={4}
          className={`w-full resize-none rounded-lg border bg-background px-3 py-2 outline-none focus:border-primary ${
            errors.description ? 'border-destructive' : 'border-border'
          }`}
          placeholder="توضیحات کامل محصول را اینجا وارد کنید"
        />
        {errors.description && (
          <p className="text-xs text-destructive">{errors.description}</p>
        )}
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">ترکیبات</span>
        <input
          value={values.ingredients || ''}
          onChange={(e) => onUpdate('ingredients', e.target.value)}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
          placeholder="مثال: شیر، قهوه، شکر"
        />
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">تگ‌ها (با کاما جدا کنید)</span>
        <input
          value={(values.tags || []).join(', ')}
          onChange={(e) =>
            onUpdate(
              'tags',
              e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
            )
          }
          className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
          placeholder="مثال: گرم، نوشیدنی، بدون قند"
        />
      </label>
    </div>
  );
}
