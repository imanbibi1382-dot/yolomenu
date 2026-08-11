import { useState, FormEvent } from 'react';
import { Route, Switch } from 'wouter';
import { Lock } from 'lucide-react';
import { Check } from 'lucide-react';
import { resetMenuItems, useEditableMenuItems } from '@/lib/menuStorage';
import { AdminItemList } from '@/features/admin/components/AdminItemList';
import { AdminAddItemPage } from '@/features/admin/pages/AdminAddItemPage';
import { AdminEditItemPage } from '@/features/admin/pages/AdminEditItemPage';

const ADMIN_PIN = 'yolo-1405';

function AdminMenuPage() {
  const [menuItems] = useEditableMenuItems();

  const resetAll = () => {
    if (!window.confirm('همه تغییرات پنل حذف شود و منو به حالت اولیه برگردد؟')) {
      return;
    }

    resetMenuItems();
    window.location.reload();
  };

  return (
    <main className="min-h-[100dvh] bg-background text-foreground" dir="rtl">
      <AdminItemList items={menuItems} />
      
      {/* Reset button - fixed at bottom right */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={resetAll}
          className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 font-bold transition hover:bg-muted"
        >
          ⟲ ریست منو
        </button>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(
    () => window.localStorage.getItem('yolo-admin-unlocked') === 'true'
  );
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');

  const submitPin = (event: FormEvent) => {
    event.preventDefault();
    if (pin.trim() !== ADMIN_PIN) {
      setPinError('رمز ورود درست نیست.');
      return;
    }

    window.localStorage.setItem('yolo-admin-unlocked', 'true');
    setUnlocked(true);
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
    <Switch>
      <Route path="/x9q-vault-71-admin-panel" component={AdminMenuPage} />
      <Route path="/x9q-vault-71-admin-panel/menu" component={AdminMenuPage} />
      <Route path="/x9q-vault-71-admin-panel/menu/new" component={AdminAddItemPage} />
      <Route path="/x9q-vault-71-admin-panel/menu/:id/edit" component={AdminEditItemPage} />
    </Switch>
  );
}