import { PageWrapper } from '@/components/layout/PageWrapper';
import { categories } from '@/data/menuData';
import { useEditableMenuItems } from '@/lib/menuStorage';
import { ProductCard } from '@/components/ui/ProductCard';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { cn } from '@/lib/utils';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [menuItems] = useEditableMenuItems();
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const tabsRef = useRef<HTMLDivElement>(null);

  const [location] = useLocation();

  useEffect(() => {
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

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    categoryRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
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
  }, []);

  return (
    <PageWrapper>
      <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
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
      </div>

      <div className="flex-1 mt-1 pb-8">
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
    </PageWrapper>
  );
}
