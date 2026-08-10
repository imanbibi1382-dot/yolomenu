import { Moon, Sun, Search } from 'lucide-react';
import { useTheme } from '@/lib/theme-provider';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Header() {
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md transition-all duration-300",
        scrolled ? "border-b border-border shadow-sm" : "border-b-transparent"
      )}
    >
      <div className="container mx-auto max-w-md px-5 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="font-black text-3xl tracking-tighter text-yolo-navy dark:text-yolo-ivory transition-colors duration-300">
            YOLO
          </Link>
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" asChild className="rounded-full hover:bg-muted/60 transition-colors">
            <Link href="/search" aria-label="جستجو">
              <Search className="h-5 w-5 text-foreground/80" strokeWidth={2} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-muted/60 transition-colors"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="تغییر تم"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5 text-foreground/80" strokeWidth={2} />
            ) : (
              <Moon className="h-5 w-5 text-foreground/80" strokeWidth={2} />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
