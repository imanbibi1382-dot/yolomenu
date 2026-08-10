import { PageWrapper } from '@/components/layout/PageWrapper';
import { useEditableMenuItems } from '@/lib/menuStorage';
import { ProductCard } from '@/components/ui/ProductCard';
import { Search, X } from 'lucide-react';
import { useMemo, useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems] = useEditableMenuItems();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  }, []);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.englishName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.tags || []).some(t => t.toLowerCase().includes(query))
    );
  }, [menuItems, searchQuery]);

  return (
    <PageWrapper>
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
        <div className="px-5 py-3">
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/60 group-focus-within:text-primary transition-colors" />
            <input
              ref={searchInputRef}
              type="search"
              placeholder="جستجوی محصول، ترکیبات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-11 pl-11 pr-11 rounded-2xl bg-card border border-border/60 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 focus:bg-card transition-all text-sm outline-none placeholder:text-muted-foreground shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="پاک کردن جستجو"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 mt-1 pb-8 px-5">
        {!searchQuery.trim() ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            برای شروع جستجو، یک عبارت وارد کنید.
            <div className="mt-4">
              <Link
                href="/menu"
                className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-yolo-white hover:bg-primary/90 transition-colors"
              >
                بازگشت به منو
              </Link>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 px-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground mb-5">
              <Search size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-sm text-muted-foreground">لطفاً عبارت دیگری را وارد کنید.</p>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-4 pt-4">
            <p className="text-sm text-muted-foreground mb-1 px-1">
              {filteredItems.length} نتیجه برای «{searchQuery}»
            </p>
            {filteredItems.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
