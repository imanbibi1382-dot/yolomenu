import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';

export function ProductCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (index % 10) * 0.05, ease: 'easeOut' }}
      className={`relative flex gap-4 p-4 rounded-xl border bg-card transition-all hover:-translate-y-[2px] hover:shadow-md ${!item.isAvailable ? 'opacity-60 grayscale-[0.5]' : ''}`}
    >
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex justify-between items-start mb-1 gap-2">
          <div className="min-w-0">
            <h3 className="font-bold text-base text-card-foreground truncate">{item.name}</h3>
            <p className="text-xs text-muted-foreground truncate font-sans tracking-wide" dir="ltr">{item.englishName}</p>
          </div>
          {item.badge && (
            <Badge variant={item.badge.type} className="shrink-0 text-[10px] px-2 py-0">
              {item.badge.label}
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-card-foreground/80 mt-2 line-clamp-2 leading-relaxed">
          {item.description}
        </p>
        
        {item.ingredients && (
          <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
            <span className="font-semibold">ترکیبات:</span> {item.ingredients}
          </p>
        )}
        
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-bold text-yolo-gold dark:text-yolo-gold/90 text-sm">
            {formatPrice(item.price)} <span className="text-[10px] font-normal opacity-80">تومان</span>
          </span>
          
          {!item.isAvailable && (
            <span className="text-xs text-destructive font-medium bg-destructive/10 px-2 py-0.5 rounded-sm">
              ناموجود
            </span>
          )}
        </div>
      </div>
      
      <div className="shrink-0 w-24 h-24 rounded-lg bg-gradient-to-br from-yolo-walnut/10 to-yolo-navy/10 dark:from-yolo-walnut/20 dark:to-yolo-navy/20 flex items-center justify-center border border-border/50">
        <Coffee className="w-8 h-8 opacity-20 text-yolo-navy dark:text-yolo-ivory" />
      </div>
    </motion.div>
  );
}