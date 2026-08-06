import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { useState } from 'react';

export function ProductCard({ item, index }: { item: MenuItem; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: (index % 10) * 0.05, ease: 'easeOut' }}
      className={`relative flex gap-4 p-4 rounded-xl border bg-card transition-all hover:-translate-y-[2px] hover:shadow-md ${!item.isAvailable ? 'opacity-55 grayscale-[0.4]' : ''}`}
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

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {item.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[9px] px-1.5 py-0.5 rounded-sm bg-primary/8 text-primary/70 dark:bg-primary/10 dark:text-primary/60 font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="font-bold text-yolo-navy dark:text-yolo-ivory text-sm">
            {formatPrice(item.price)}
            <span className="text-[10px] font-normal opacity-70 ms-1">تومان</span>
          </span>

          {!item.isAvailable && (
            <span className="text-xs text-destructive font-medium bg-destructive/10 px-2 py-0.5 rounded-sm">
              ناموجود
            </span>
          )}
        </div>
      </div>

      {/* Product image or placeholder */}
      <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-border/50 bg-muted/40">
        {item.image && !imgError ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20">
            <Coffee className="w-8 h-8 opacity-20 text-yolo-navy dark:text-yolo-ivory" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
