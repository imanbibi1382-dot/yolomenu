import { MenuItem } from '@/types';
import { ImagePlus, X } from 'lucide-react';
import { ChangeEvent } from 'react';

interface ImageSectionProps {
  values: MenuItem;
  onUpdate: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
}

export function ImageSection({ values, onUpdate }: ImageSectionProps) {
  const handleImageFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onUpdate('image', String(reader.result));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    onUpdate('image', '');
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-border pb-4">
        <h3 className="font-bold text-lg">عکس محصول</h3>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-background">
        {values.image ? (
          <div className="relative aspect-square w-full">
            <img
              src={values.image}
              alt="محصول"
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={removeImage}
              className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-white hover:bg-destructive/90"
              aria-label="حذف عکس"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex aspect-square w-full items-center justify-center bg-muted text-muted-foreground">
            <div className="text-center">
              <ImagePlus size={40} className="mx-auto mb-2" />
              <p className="text-sm">عکس محصول را انتخاب کنید</p>
            </div>
          </div>
        )}
      </div>

      <label className="flex h-10 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-bold transition hover:bg-muted">
        <ImagePlus size={17} />
        {values.image ? 'تغییر عکس' : 'آپلود عکس'}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          className="hidden"
        />
      </label>

      <label className="space-y-1.5">
        <span className="text-xs font-bold text-muted-foreground">آدرس عکس (URL)</span>
        <input
          dir="ltr"
          value={values.image || ''}
          onChange={(e) => onUpdate('image', e.target.value)}
          className="h-10 w-full rounded-lg border border-border bg-background px-3 text-xs outline-none focus:border-primary"
          placeholder="https://example.com/image.jpg"
        />
      </label>
    </div>
  );
}