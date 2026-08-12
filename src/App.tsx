import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as SonnerToaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { ThemeProvider } from '@/lib/theme-provider';

import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import SearchPage from '@/pages/SearchPage';
import AdminPage from '@/pages/AdminPage';
import NotFoundPage from '@/pages/NotFoundPage';

const queryClient = new QueryClient();
const ADMIN_PATH = '/x9q-vault-71-admin-panel';

function HashRouter() {
  return (
    <Router hook={useHashLocation}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/menu" component={MenuPage} />
        <Route path="/search" component={SearchPage} />
        <Route path={ADMIN_PATH} component={AdminPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="yolo-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <HashRouter />
          <Toaster />
          <SonnerToaster position="top-center" />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;