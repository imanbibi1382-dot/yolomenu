import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Coffee } from 'lucide-react';
import { useState } from 'react';

export function BaristaPick({ item, index }: { item: MenuItem; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative flex flex-col rounded-3xl bg-card card-shadow border border-card-border overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 w-full max-w-[280px] mx-auto sm:max-w-none"
    >
      <div className="relative h-[220px] w-full bg-muted overflow-hidden">
        {item.image && !imgError ? (
          <>
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
            {/* Gradient overlay to blend image into the card */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
            <Coffee className="w-12 h-12 opacity-20 text-primary" />
          </div>
        )}
        
        {item.badge && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant={item.badge.type} className="shadow-md px-3 py-1 text-[10px]">
              {item.badge.label}
            </Badge>
          </div>
        )}
      </div>

      <div className="px-5 pb-6 pt-2 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-bold text-lg text-card-foreground leading-tight">{item.name}</h3>
          <p className="text-xs text-muted-foreground font-sans tracking-widest mt-1 opacity-70" dir="ltr">
            {item.englishName}
          </p>
        </div>
        
        <p className="text-sm text-card-foreground/75 line-clamp-3 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between border-t border-border/50 pt-4">
          <span className="font-bold text-yolo-navy dark:text-yolo-ivory text-lg flex items-baseline gap-1">
            {formatPrice(item.price)}
            <span className="text-[11px] font-medium opacity-70 relative -top-1">تومان</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
