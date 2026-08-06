import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Coffee } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <PageWrapper>
      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6 text-muted-foreground">
          <Coffee size={32} />
        </div>
        <h1 className="text-4xl font-black mb-2 text-yolo-navy dark:text-yolo-gold">۴۰۴</h1>
        <h2 className="text-xl font-bold mb-4">صفحه پیدا نشد</h2>
        <p className="text-muted-foreground mb-8">
          متاسفانه صفحه‌ای که به دنبال آن هستید وجود ندارد یا حذف شده است.
        </p>
        <Button asChild className="rounded-full px-8 bg-yolo-navy text-yolo-ivory dark:bg-yolo-gold dark:text-yolo-navy">
          <Link href="/">بازگشت به خانه</Link>
        </Button>
      </div>
    </PageWrapper>
  );
}