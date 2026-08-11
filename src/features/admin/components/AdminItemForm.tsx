import { MenuItem } from '@/types';
import { Save, Trash2 } from 'lucide-react';
import { BasicInfoSection } from './BasicInfoSection';
import { DescriptionSection } from './DescriptionSection';
import { ImageSection } from './ImageSection';
import { SettingsSection } from './SettingsSection';

interface AdminItemFormProps {
  values: MenuItem;
  isDirty: boolean;
  errors: Record<string, string>;
  isLoading?: boolean;
  onUpdate: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
  onSave: () => void;
  onDelete?: () => void;
  onCancel: () => void;
  isNewItem?: boolean;
}

export function AdminItemForm({
  values,
  isDirty,
  errors,
  isLoading = false,
  onUpdate,
  onSave,
  onDelete,
  onCancel,
  isNewItem = false,
}: AdminItemFormProps) {
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave();
    }} className="flex flex-col gap-6">
      {/* Form sections */}
      <BasicInfoSection values={values} errors={errors} onUpdate={onUpdate} />
      <DescriptionSection values={values} errors={errors} onUpdate={onUpdate} />
      <ImageSection values={values} onUpdate={onUpdate} />
      <SettingsSection values={values} onUpdate={onUpdate} />

      {/* Action buttons */}
      <div className="sticky bottom-0 flex flex-col gap-3 border-t border-border bg-card pt-4 sm:flex-row">
        <button
          type="submit"
          disabled={!isDirty || isLoading}
          className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-yolo-navy font-bold text-yolo-white disabled:opacity-50 dark:bg-yolo-ivory dark:text-yolo-navy transition"
        >
          <Save size={18} />
          {isNewItem ? 'ایجاد آیتم' : 'ذخیره تغییرات'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 font-bold transition hover:bg-muted disabled:opacity-50"
        >
          انصراف
        </button>

        {onDelete && !isNewItem && (
          <button
            type="button"
            onClick={onDelete}
            disabled={isLoading}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-destructive/30 px-4 font-bold text-destructive transition hover:bg-destructive/5 disabled:opacity-50"
          >
            <Trash2 size={18} />
            حذف
          </button>
        )}
      </div>
    </form>
  );
}