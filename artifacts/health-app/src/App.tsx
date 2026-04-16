import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Layout } from "@/components/layout";
import Home from "@/pages/home";
import Nutrition from "@/pages/nutrition";
import Fitness from "@/pages/fitness";
import AiCoach from "@/pages/ai-coach";
import History from "@/pages/history";
import Profile from "@/pages/profile";
import NotFound from "@/pages/not-found";
import { ThemeProvider } from "@/components/theme-provider";
import AuthPage from "@/pages/auth";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { LanguageProvider } from "@/contexts/language-context";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-pulse">
            <span className="text-background text-2xl font-black">B</span>
          </div>
          <p className="text-sm text-muted-foreground">Loading BodyLogic...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/nutrition" component={Nutrition} />
        <Route path="/fitness" component={Fitness} />
        <Route path="/ai-coach" component={AiCoach} />
        <Route path="/history" component={History} />
        <Route path="/profile" component={Profile} />
        {/* Redirect old standalone routes into the Profile hub */}
        <Route path="/achievements"><Redirect to="/profile" /></Route>
        <Route path="/settings"><Redirect to="/profile" /></Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="bodylogic-theme">
      <LanguageProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </QueryClientProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
