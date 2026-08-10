import { Home, Coffee, Search } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function BottomNav() {
  const [location] = useLocation();
  const searchActive = location === '/search';

  const navItems = [
    { href: '/', label: 'خانه', icon: Home },
    { href: '/menu', label: 'منو', icon: Coffee },
    { href: '/search', label: 'جستجو', icon: Search },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[340px] pb-[env(safe-area-inset-bottom)]">
      <div className="bg-background/85 backdrop-blur-xl border border-border/50 shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] rounded-full h-16 flex items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = location === item.href || 
            (item.href !== '/' && location.startsWith(item.href) && !searchActive);
            
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-full transition-colors group"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300",
                  isActive ? 'bg-primary/10' : 'hover:bg-muted/10'
                )}
              >
                <Icon 
                  className={cn(
                    "h-5 w-5 mb-1 transition-all duration-300", 
                    isActive ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
                  )} 
                  strokeWidth={isActive ? 2.5 : 2} 
                />
                <span className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {item.label}
                </span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                  <motion.div 
                    layoutId="bottom-nav-indicator"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
