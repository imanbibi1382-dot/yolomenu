import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from '@/lib/theme-provider';

import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import AdminPage from '@/pages/AdminPage';
import NotFoundPage from '@/pages/NotFoundPage';

const queryClient = new QueryClient();
const ADMIN_HOST_PREFIX = 'x9q-vault-71';
const ADMIN_PATH = '/x9q-vault-71-admin-panel';

function Router() {
  const isAdminHost =
    typeof window !== 'undefined' &&
    window.location.hostname.startsWith(ADMIN_HOST_PREFIX);

  if (isAdminHost) {
    return <AdminPage />;
  }

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/menu" component={MenuPage} />
      <Route path={ADMIN_PATH} component={AdminPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="yolo-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
