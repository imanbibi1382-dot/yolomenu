import { useState } from 'react';
import { Link } from 'wouter';
import { Lock, Check, LogOut, Home, Coffee, Plus } from 'lucide-react';
import { resetMenuItems, useEditableMenuItems } from '@/lib/menuStorage';
import { AdminItemList } from '@/features/admin/components/AdminItemList';
import { AdminAddItemPage } from '@/features/admin/pages/AdminAddItemPage';
import { AdminEditItemPage } from '@/features/admin/pages/AdminEditItemPage';

const ADMIN_PIN = 'yolo-1405';
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

type AdminView = 'list' | 'add' | 'edit';

function AdminHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-yolo-navy text-yolo-ivory dark:bg-yolo-ivory dark:text-yolo-navy">
            <Coffee size={18} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              YOLO Admin
            </p>
            <p className="text-sm font-black leading-none">پنل مدیریت منو</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-bold transition hover:bg-muted"
          >
            <Home size={15} />
            مشاهده منو
          </Link>
          <button
            onClick={onLogout}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-destructive/30 px-3 text-xs font-bold text-destructive transition hover:bg-destructive/5"
          >
            <LogOut size={15} />
            خروج
          </button>
        </div>
      </div>
    </header>
  );
}

function LoginScreen({ onLogin, error }: { onLogin: (pin: string) => void; error: string }) {
  const [pin, setPin] = useState('');

  return (
    <main className="min-h-[100dvh] bg-yolo-navy px-5 py-10 text-yolo-white" dir="rtl">
      <div className="mx-auto flex min-h-[calc(100dvh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-yolo-ivory text-yolo-navy shadow-lg">
          <Lock size={30} />
        </div>
        <h1 className="text-3xl font-black">پنل مدیریت YOLO</h1>
        <p className="mt-3 text-sm leading-7 text-yolo-ivory/75">
          این بخش کاملاً جدا از منوی عمومی است و برای ورود نیاز به رمز دارد.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin(pin);
          }}
          className="mt-8 space-y-3"
        >
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            type="password"
            placeholder="رمز ورود"
            autoFocus
            className="h-12 w-full rounded-lg border border-yolo-ivory/15 bg-white/10 px-4 text-base outline-none transition focus:border-yolo-ivory placeholder:text-yolo-ivory/40"
          />
          {error && <p className="text-sm font-bold text-red-300">{error}</p>}
          <button className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-yolo-ivory font-bold text-yolo-navy transition hover:bg-yolo-ivory/90">
            <Check size={18} />
            ورود به پنل
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-yolo-ivory/60 transition hover:text-yolo-ivory"
          >
            <Home size={15} />
            بازگشت به منوی اصلی
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return window.localStorage.getItem('yolo-admin-unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [pinError, setPinError] = useState('');
  const [view, setView] = useState<AdminView>('list');
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleLogin = (pin: string) => {
    if (pin.trim() !== ADMIN_PIN) {
      setPinError('رمز ورود درست نیست.');
      return;
    }
    try {
      window.localStorage.setItem('yolo-admin-unlocked', 'true');
    } catch {}
    setPinError('');
    setUnlocked(true);
  };

  const handleLogout = () => {
    try {
      window.localStorage.removeItem('yolo-admin-unlocked');
    } catch {}
    setUnlocked(false);
    setView('list');
    setEditingId(null);
  };

  if (!unlocked) {
    return <LoginScreen onLogin={handleLogin} error={pinError} />;
  }

  return (
    <div dir="rtl">
      <AdminHeader onLogout={handleLogout} />
      {view === 'list' && (
        <AdminListView
          onAdd={() => { setEditingId(null); setView('add'); }}
          onEdit={(id) => { setEditingId(id); setView('edit'); }}
        />
      )}
      {view === 'add' && (
        <AdminAddItemPage onDone={() => { setEditingId(null); setView('list'); }} />
      )}
      {view === 'edit' && editingId && (
        <AdminEditItemPage itemId={editingId} onDone={() => { setEditingId(null); setView('list'); }} />
      )}
    </div>
  );
}

function AdminListView({ onAdd, onEdit }: { onAdd: () => void; onEdit: (id: string) => void }) {
  const [menuItems] = useEditableMenuItems();

  const resetAll = () => {
    if (!window.confirm('همه تغییرات پنل حذف شود و منو به حالت اولیه برگردد؟')) {
      return;
    }
    resetMenuItems();
    window.location.reload();
  };

  return (
    <main className="min-h-[100dvh] bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-5 lg:px-6">
        <header className="flex flex-col gap-4 border-b border-border pb-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              YOLO Admin
            </p>
            <h1 className="mt-1 text-2xl font-black">مدیریت منو</h1>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <p className="text-lg font-black">{menuItems.length}</p>
              <p className="text-xs text-muted-foreground">آیتم</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <p className="text-lg font-black">{menuItems.filter(i => i.isAvailable).length}</p>
              <p className="text-xs text-muted-foreground">موجود</p>
            </div>
            <div className="rounded-lg border border-border bg-card px-4 py-2">
              <p className="text-lg font-black">{menuItems.filter(i => !i.isAvailable).length}</p>
              <p className="text-xs text-muted-foreground">ناموجود</p>
            </div>
          </div>
        </header>
        <div className="mt-5">
          <button
            onClick={onAdd}
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-yolo-navy px-6 font-bold text-yolo-white transition hover:bg-yolo-navy/90 dark:bg-yolo-ivory dark:text-yolo-navy"
          >
            <Plus size={17} />
            آیتم جدید
          </button>
        </div>
        <AdminItemList items={menuItems} onEdit={onEdit} />
        <div className="mt-6 flex justify-end">
          <button
            onClick={resetAll}
            className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 font-bold transition hover:bg-muted"
          >
            ⟲ ریست منو
          </button>
        </div>
      </div>
    </main>
  );
}