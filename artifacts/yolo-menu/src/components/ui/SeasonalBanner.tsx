import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function SeasonalBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="relative w-full rounded-3xl overflow-hidden card-shadow my-6 group cursor-pointer"
    >
      {/* Background with CSS gradients and texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2D4A7A] via-yolo-navy to-[#0F1929] dark:from-[#1C2C47] dark:via-[#111A29] dark:to-[#080C14]">
        {/* Subtle decorative radial gradients */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yolo-green/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-yolo-ivory/10 rounded-full blur-2xl translate-y-1/4 -translate-x-1/4 mix-blend-overlay" />
        
        {/* Noise overlay (CSS filter approach) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
      </div>

      <div className="relative p-7 sm:p-8 flex flex-col justify-between min-h-[220px]">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 text-[10px] font-bold tracking-wider mb-4">
            فصل ویژه
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            کلد برو نارگیل با لیمو
          </h2>
          <p className="text-white/80 text-sm max-w-[220px] leading-relaxed">
            خنکای مرکبات و شیرینی ملایم نارگیل؛ طعمی که تابستان را به یاد می‌آورد.
          </p>
        </div>

        <div className="mt-6">
          <Link href="/menu" className="inline-flex items-center gap-2 text-white text-sm font-medium hover:opacity-80 transition-opacity">
            سفارش دهید
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
