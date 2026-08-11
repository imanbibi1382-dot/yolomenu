import { MenuItem, BadgeType } from '@/types';

interface SettingsSectionProps {
  values: MenuItem;
  onUpdate: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
}

export function SettingsSection({ values, onUpdate }: SettingsSectionProps) {
  const updateBadge = (type: BadgeType | '') => {
    onUpdate(
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
        : undefined
    );
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-4">
        <h3 className="font-bold text-lg">تنظیمات و نشان‌ها</h3>
      </div>

      <label className="flex items-center justify-between rounded-lg border border-border bg-background px-4 py-3">
        <span className="font-bold">موجود باشد</span>
        <input
          type="checkbox"
          checked={values.isAvailable}
          onChange={(e) => onUpdate('isAvailable', e.target.checked)}
          className="h-5 w-5 cursor-pointer"
        />
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">نشان / برچسب</span>
        <select
          value={values.badge?.type || ''}
          onChange={(e) => updateBadge(e.target.value as BadgeType | '')}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 outline-none focus:border-primary"
        >
          <option value="">بدون نشان</option>
          <option value="bestseller">🔥 پرفروش</option>
          <option value="barista">☕ توصیه باریستا</option>
          <option value="new">✨ جدید</option>
        </select>
      </label>

      {values.badge && (
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
          <p className="text-sm text-muted-foreground">
            نشان انتخاب شده: <span className="font-bold text-primary">{values.badge.label}</span>
          </p>
        </div>
      )}
    </div>
  );
}