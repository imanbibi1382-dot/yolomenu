import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useEditableMenuItems } from '@/lib/menuStorage';
import { useItemForm } from '../hooks/useItemForm';
import { AdminItemForm } from '../components/AdminItemForm';
import { toast } from 'sonner';

interface AdminAddItemPageProps {
  onDone: () => void;
}

export function AdminAddItemPage({ onDone }: AdminAddItemPageProps) {
  const [menuItems, setMenuItems] = useEditableMenuItems();
  const { values, isDirty, errors, updateField, validate, reset } = useItemForm({});
  const [isLoading, setIsLoading] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  const handleSave = async () => {
    if (!validate()) {
      toast.error('لطفاً تمام فیلدهای الزامی را پر کنید');
      return;
    }

    setIsLoading(true);

    try {
      const cleaned = {
        ...values,
        name: values.name.trim(),
        englishName: values.englishName.trim(),
        price: Number(values.price) || 0,
        description: values.description.trim(),
        ingredients: values.ingredients?.trim(),
        image: values.image?.trim(),
        tags: (values.tags || []).map((t) => t.trim()).filter(Boolean),
      };

      setMenuItems([cleaned, ...menuItems]);
      toast.success('آیتم جدید با موفقیت اضافه شد');
      onDone();
    } catch (error) {
      toast.error('خطا در ذخیره‌ی آیتم');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      onDone();
    }
  };

  return (
    <main className="min-h-[100dvh] bg-background text-foreground" dir="rtl">
      <div className="mx-auto w-full max-w-2xl px-4 py-5 lg:px-6">
        {/* Header */}
        <header className="mb-6 flex items-center gap-3 border-b border-border pb-5">
          <button
            onClick={handleCancel}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              YOLO Admin
            </p>
            <h1 className="text-xl font-black">ایجاد آیتم جدید</h1>
          </div>
        </header>

        {/* Form */}
        <AdminItemForm
          values={values}
          isDirty={isDirty}
          errors={errors}
          isLoading={isLoading}
          onUpdate={updateField}
          onSave={handleSave}
          onCancel={handleCancel}
          isNewItem={true}
        />
      </div>

      {/* Unsaved changes dialog */}
      {showUnsavedDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="mx-4 max-w-sm rounded-lg bg-card p-6 shadow-lg">
            <h2 className="text-lg font-bold">تغییرات ذخیره‌ نشده</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              آیا می‌خواهید بدون ذخیره‌ی تغییرات از این صفحه خارج شوید؟
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setShowUnsavedDialog(false);
                  reset();
                  onDone();
                }}
                className="flex-1 rounded-lg bg-destructive px-4 py-2 font-bold text-white transition hover:bg-destructive/90"
              >
                خروج بدون ذخیره
              </button>
              <button
                onClick={() => setShowUnsavedDialog(false)}
                className="flex-1 rounded-lg border border-border px-4 py-2 font-bold transition hover:bg-muted"
              >
                ادامه ویرایش
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}