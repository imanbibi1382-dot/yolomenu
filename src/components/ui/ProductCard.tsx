import { MenuItem } from '@/types';
import { formatPrice, cn } from '@/lib/utils';
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
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "relative flex min-h-[130px] rounded-2xl bg-card card-shadow border border-card-border overflow-hidden transition-all duration-300",
        "hover:-translate-y-[3px] hover:shadow-[0_8px_20px_rgba(23,38,61,0.1)] dark:hover:shadow-[0_8px_20px_rgba(0,0,0,0.5)]",
        !item.isAvailable && "opacity-60 grayscale-[0.5]"
      )}
    >
      <div className="flex-1 p-4 flex flex-col min-w-0">
        <div className="flex justify-between items-start gap-2 mb-1">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-base text-card-foreground truncate">{item.name}</h3>
            <p className="text-[11px] text-muted-foreground font-sans tracking-wider opacity-80" dir="ltr">{item.englishName}</p>
          </div>
          {item.badge && (
            <Badge variant={item.badge.type} className="shrink-0 text-[9px] px-2 py-0.5 shadow-sm">
              {item.badge.label}
            </Badge>
          )}
        </div>

        <p className="text-sm text-card-foreground/80 mt-1 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {item.ingredients && (
          <p className="text-[11px] text-muted-foreground/80 mt-1.5 italic line-clamp-1">
            {item.ingredients}
          </p>
        )}

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {item.tags.slice(0, 3).map(tag => (
              <span
                key={tag}
                className="text-[9px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between">
          {!item.isAvailable ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-muted-foreground text-sm line-through decoration-muted-foreground/50">
                {formatPrice(item.price)}
              </span>
              <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border border-destructive/20 text-destructive bg-destructive/5 uppercase rotate-[-2deg]">
                ناموجود
              </span>
            </div>
          ) : (
            <span className="font-bold text-yolo-navy dark:text-yolo-ivory text-base flex items-baseline gap-1">
              {formatPrice(item.price)}
              <span className="text-[10px] font-medium text-yolo-navy/70 dark:text-yolo-ivory/70 relative -top-1">تومان</span>
            </span>
          )}
        </div>
      </div>

      {/* Image on the Left (RTL End) */}
      <div className="shrink-0 w-[120px] relative bg-muted/30">
        {item.image && !imgError ? (
          <>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
            {/* Soft gradient overlay at bottom of image */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <Coffee className="w-8 h-8 opacity-20 text-yolo-navy dark:text-yolo-ivory" />
          </div>
        )}
      </div>
    </motion.div>
  );
}
