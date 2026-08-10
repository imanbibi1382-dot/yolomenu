import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'wouter';
import { useEditableMenuItems } from '@/lib/menuStorage';
import { useItemForm } from '../hooks/useItemForm';
import { AdminItemForm } from '../components/AdminItemForm';
import { toast } from 'sonner';

export function AdminEditItemPage() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute('/x9q-vault-71-admin-panel/menu/:id/edit');
  const [menuItems, setMenuItems] = useEditableMenuItems();
  const [isLoading, setIsLoading] = useState(false);
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  const itemId = params?.id as string;
  const item = menuItems.find((i) => i.id === itemId);

  const { values, isDirty, errors, updateField, validate, reset } = useItemForm({
    initialItem: item,
  });

  useEffect(() => {
    if (!item && match) {
      toast.error('آیتم یافت نشد');
      navigate('/x9q-vault-71-admin-panel/menu');
    }
  }, [item, match, navigate]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

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

      const nextItems = menuItems.map((i) =>
        i.id === cleaned.id ? cleaned : i
      );

      setMenuItems(nextItems);
      toast.success('آیتم با موفقیت ویرایش شد');
      navigate('/x9q-vault-71-admin-panel/menu');
    } catch (error) {
      toast.error('خطا در ذخیره‌ی آیتم');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm('آیا مطمئنید که می‌خواهید این آیتم را حذف کنید؟')
    ) {
      return;
    }

    setIsLoading(true);

    try {
      const nextItems = menuItems.filter((i) => i.id !== itemId);
      setMenuItems(nextItems);
      toast.success('آیتم با موفقیت حذف شد');
      navigate('/x9q-vault-71-admin-panel/menu');
    } catch (error) {
      toast.error('خطا در حذف آیتم');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (isDirty) {
      setShowUnsavedDialog(true);
    } else {
      navigate('/x9q-vault-71-admin-panel/menu');
    }
  };

  if (!item) {
    return (
      <main className="min-h-[100dvh] flex items-center justify-center bg-background" dir="rtl">
        <div className="text-center">
          <p className="text-muted-foreground">آیتم یافت نشد</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[100dvh] bg-background text-foreground" dir="rtl">
      <div className="mx-auto w-full max-w-2xl px-4 py-5 lg:px-6">
        {/* Header */}
        <header className="mb-6 flex items-center gap-3 border-b border-border pb-5">
          <Link
            href="/x9q-vault-71-admin-panel/menu"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border transition hover:bg-muted"
          >
            <ChevronLeft size={20} />
          </Link>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              YOLO Admin
            </p>
            <h1 className="text-xl font-black">ویرایش آیتم</h1>
            <p className="text-xs text-muted-foreground mt-1">{item.name}</p>
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
          onDelete={handleDelete}
          onCancel={handleCancel}
          isNewItem={false}
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
                  navigate('/x9q-vault-71-admin-panel/menu');
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
