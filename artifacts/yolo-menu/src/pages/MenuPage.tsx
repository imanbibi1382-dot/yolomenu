import { PageWrapper } from '@/components/layout/PageWrapper';
import { categories } from '@/data/menuData';
import { useEditableMenuItems } from '@/lib/menuStorage';
import { ProductCard } from '@/components/ui/ProductCard';
import { Search, X } from 'lucide-react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [menuItems] = useEditableMenuItems();
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const [location] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.location.search.includes('focus=search')) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }

    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      if (categories.some(c => c.id === id)) {
        setActiveCategory(id);
        setTimeout(() => {
          categoryRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return menuItems;

    const query = searchQuery.toLowerCase().trim();
    return menuItems.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.englishName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.tags || []).some(t => t.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const renderContent = () => {
    if (searchQuery.trim()) {
      if (filteredItems.length === 0) {
        return (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 px-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center text-muted-foreground mb-5">
              <Search size={24} strokeWidth={1.5} />
            </div>
            <h3 className="font-bold text-lg mb-2">نتیجه‌ای یافت نشد</h3>
            <p className="text-sm text-muted-foreground">عبارت دیگری را جستجو کنید.</p>
          </motion.div>
        );
      }
      return (
        <div className="flex flex-col gap-4 px-5 pb-8 pt-4">
          <p className="text-sm text-muted-foreground mb-1 px-1">
            {filteredItems.length} نتیجه برای «{searchQuery}»
          </p>
          {filteredItems.map((item, i) => (
            <ProductCard key={item.id} item={item} index={i} />
          ))}
        </div>
      );
    }

    return (
      <div className="pb-8">
        {categories.map((category, index) => {
          const categoryItems = menuItems.filter(item => item.categoryId === category.id);
          if (categoryItems.length === 0) return null;

          return (
            <div
              key={category.id}
              id={category.id}
              ref={el => { categoryRefs.current[category.id] = el; }}
              className="pt-6 scroll-mt-28"
            >
              <h2 className="font-bold text-2xl px-6 mb-6 sticky top-[116px] bg-background/95 backdrop-blur-xl py-3 z-10 flex items-center gap-3 shadow-sm border-b border-border/40">
                <span className="w-1.5 h-7 bg-primary rounded-full inline-block opacity-90" />
                {category.name}
              </h2>
              
              <div className="flex flex-col gap-4 px-5 mb-8">
                {categoryItems.map((item, i) => (
                  <ProductCard key={item.id} item={item} index={i} />
                ))}
              </div>
              
              {index < categories.length - 1 && (
                <div className="w-[85%] mx-auto h-px bg-border/40 my-2" />
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    categoryRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setSearchQuery('');
  };

  useEffect(() => {
    if (searchQuery) return;

    const observer = new IntersectionObserver((entries) => {
      const visibleEntries = entries.filter(e => e.isIntersecting);
      if (visibleEntries.length > 0) {
        const active = visibleEntries[0].target.id;
        setActiveCategory(active);

        const tabEl = document.getElementById(`tab-${active}`);
        if (tabEl && tabsRef.current) {
          const tabsContainer = tabsRef.current;
          const scrollLeft = tabEl.offsetLeft - (tabsContainer.clientWidth / 2) + (tabEl.clientWidth / 2);
          tabsContainer.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        }
      }
    }, {
      rootMargin: '-130px 0px -70% 0px',
      threshold: [0, 0.5, 1]
    });

    Object.values(categoryRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [searchQuery]);

  return (
    <PageWrapper>
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
        {/* Search Bar */}
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
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div
            ref={tabsRef}
            className="flex overflow-x-auto no-scrollbar px-5 pb-3 pt-1 gap-2 snap-x"
            dir="rtl"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  id={`tab-${category.id}`}
                  onClick={() => scrollToCategory(category.id)}
                  className={cn(
                    "relative shrink-0 px-5 py-2 text-[13px] font-semibold transition-all snap-start",
                    isActive
                      ? "text-yolo-white bg-yolo-navy dark:text-yolo-navy dark:bg-yolo-ivory rounded-full shadow-md"
                      : "text-muted-foreground hover:text-foreground rounded-lg"
                  )}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex-1 mt-1">
        {renderContent()}
      </div>
    </PageWrapper>
  );
}
