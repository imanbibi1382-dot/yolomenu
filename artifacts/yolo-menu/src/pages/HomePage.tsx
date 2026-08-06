import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { categories, menuItems } from '@/data/menuData';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { Coffee, CupSoda, Cake, GlassWater, Droplet, Leaf, Croissant, Utensils, Package } from 'lucide-react';
import { ProductCard } from '@/components/ui/ProductCard';

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
  const featuredItems = menuItems.filter(i => i.badge?.type === 'barista').slice(0, 2);

  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative px-6 py-12 flex flex-col items-center justify-center text-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-yolo-navy/5 to-background pointer-events-none" />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-black text-yolo-navy dark:text-yolo-gold tracking-tighter mb-4"
          >
            YOLO
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl font-bold mb-2"
          >
            کافه تخصصی یولو
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-sm max-w-[280px] leading-relaxed"
          >
            شما فقط یک بار زندگی می‌کنید، پس بهترین قهوه را بنوشید.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6"
          >
            <Button className="rounded-full px-8 bg-yolo-navy text-yolo-ivory hover:bg-yolo-navy/90 dark:bg-yolo-gold dark:text-yolo-navy dark:hover:bg-yolo-gold/90" asChild>
              <Link href="/menu">مشاهده منو</Link>
            </Button>
          </motion.div>
        </section>

        {/* Categories Grid */}
        <section className="px-4 py-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-lg">دسته‌بندی‌ها</h3>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon || 'coffee'] || Coffee;
              return (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  key={cat.id}
                >
                  <Link 
                    href={`/menu#${cat.id}`}
                    className="flex flex-col items-center justify-center p-3 rounded-2xl bg-card border shadow-sm gap-2 hover:border-primary/50 transition-colors cursor-pointer aspect-square"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <span className="text-[11px] font-medium text-center">{cat.name}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Featured Section */}
        <section className="px-4 py-6 mb-6">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-bold text-lg">پیشنهاد باریستا</h3>
          </div>
          <div className="flex flex-col gap-3">
            {featuredItems.map((item, i) => (
              <ProductCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>
      </div>
    </PageWrapper>
  );
}