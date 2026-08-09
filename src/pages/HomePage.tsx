import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { categories, menuItems } from '@/data/menuData';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Coffee, CupSoda, Cake, GlassWater, Droplet, Leaf, Croissant, Utensils, Package, ChevronLeft } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';
import { BaristaPick } from '@/components/ui/BaristaPick';
import { SeasonalBanner } from '@/components/ui/SeasonalBanner';

const iconMap: Record<string, React.ElementType> = {
  'coffee': Coffee,
  'cup-soda': CupSoda,
  'cake': Cake,
  'glass-water': GlassWater,
  'droplet': Droplet,
  'leaf': Leaf,
  'croissant': Croissant,
  'utensils': Utensils,
  'package': Package,
};

export default function HomePage() {
  const featuredItems = menuItems.filter(i => i.badge?.type === 'barista');
  const highlightItem = featuredItems[0];
  const baristaPicks = featuredItems.slice(1, 3); // next 2 items

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col pb-6">
        
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-16 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Atmospheric background */}
          <div className="absolute inset-0 pointer-events-none">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[400px] h-[300px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-60 dark:opacity-40" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-6 relative"
          >
            <h1 className="text-7xl font-black tracking-tighter text-yolo-navy dark:text-yolo-ivory leading-none drop-shadow-sm">
              YOLO
            </h1>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl font-bold mb-3 text-foreground tracking-tight"
          >
            کافه تخصصی یولو
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-sm max-w-[280px] leading-relaxed mb-8"
          >
            شما فقط یک بار زندگی می‌کنید، پس بهترین قهوه را بنوشید. تجربه‌ای متفاوت از طعم و فضا.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              className="rounded-full px-8 py-6 h-auto text-base font-medium bg-yolo-navy text-yolo-ivory hover:bg-yolo-navy/90 dark:bg-yolo-ivory dark:text-yolo-navy dark:hover:bg-yolo-ivory/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              asChild
            >
              <Link href="/menu">
                مشاهده منو
              </Link>
            </Button>
          </motion.div>
        </section>

        {/* Today's Highlight */}
        {highlightItem && (
          <section className="px-5 mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <h3 className="font-bold text-lg">بهترین امروز</h3>
            </div>
            <ProductCard item={highlightItem} index={0} />
          </section>
        )}

        {/* Categories Grid */}
        <section className="px-5 mb-10">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold text-lg">دسته‌بندی‌ها</h3>
            <Link href="/menu" className="text-xs text-primary font-medium hover:opacity-80 flex items-center gap-0.5">
              همه <ChevronLeft className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon || 'coffee'] || Coffee;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  key={cat.id}
                >
                  <Link
                    href={`/menu#${cat.id}`}
                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-card border border-card-border shadow-sm gap-3 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer aspect-[4/5] group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/5 dark:bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-medium text-center leading-tight">{cat.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Barista Picks */}
        {baristaPicks.length > 0 && (
          <section className="px-5 mb-10">
            <h3 className="font-bold text-lg mb-5 text-center">پیشنهاد باریستا</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {baristaPicks.map((item, i) => (
                <BaristaPick key={item.id} item={item} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* Seasonal Banner */}
        <section className="px-5 mb-10">
          <SeasonalBanner />
        </section>

        {/* Brand Story */}
        <section className="px-5 mb-8">
          <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary/40 rounded-r-3xl" />
            <p className="text-[13px] leading-8 text-foreground/80 font-medium pe-2">
              یولو جایی است که هر فنجان قهوه یک لحظه خاص می‌آفریند.
              ما با بهترین دانه‌های تخصصی دنیا کار می‌کنیم و هر نوشیدنی را با دقت و عشق آماده می‌کنیم.
              چون زندگی یک بار است، هر لحظه‌اش ارزش بهترین را دارد.
            </p>
          </div>
        </section>

      </div>
    </PageWrapper>
  );
}
