import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { ThemeProvider } from 'next-themes';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Public site sections
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Pricing } from '@/components/Pricing';
import { Works } from '@/components/Works';
import { Process } from '@/components/Process';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Technology } from '@/components/Technology';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

// Auth pages
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignUpPage } from '@/pages/auth/SignUpPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';

// Dashboard
import { DashboardLayout } from '@/pages/dashboard/DashboardLayout';
import { DashboardOverview } from '@/pages/dashboard/DashboardOverview';
import { ProjectsPage } from '@/pages/dashboard/ProjectsPage';
import { MessagesPage } from '@/pages/dashboard/MessagesPage';
import { ProfilePage } from '@/pages/dashboard/ProfilePage';
import { SettingsPage } from '@/pages/dashboard/SettingsPage';

// Service pages
import { WebsitesPage } from '@/pages/services/WebsitesPage';
import { UIUXPage } from '@/pages/services/UIUXPage';
import { BrandingPage } from '@/pages/services/BrandingPage';
import { LandingPagesPage } from '@/pages/services/LandingPagesPage';
import { GameProjectsPage } from '@/pages/services/GameProjectsPage';

// 404
import NotFound from '@/pages/not-found';
import { PrivacyPage, TermsPage, CookiesPage } from '@/pages/legal';

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary relative flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Pricing />
        <Works />
        <Process />
        <WhyChooseUs />
        <Technology />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function DashboardRoutes() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <Switch>
          <Route path="/dashboard" component={DashboardOverview} />
          <Route path="/dashboard/projects" component={ProjectsPage} />
          <Route path="/dashboard/messages" component={MessagesPage} />
          <Route path="/dashboard/profile" component={ProfilePage} />
          <Route path="/dashboard/settings" component={SettingsPage} />
        </Switch>
      </DashboardLayout>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <LanguageProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$$/, '')}>
                <Switch>
                  {/* Auth */}
                  <Route path="/login" component={LoginPage} />
                  <Route path="/signup" component={SignUpPage} />
                  <Route path="/forgot-password" component={ForgotPasswordPage} />

                  {/* Dashboard */}
                  <Route path="/dashboard" component={DashboardRoutes} />
                  <Route path="/dashboard/:rest*" component={DashboardRoutes} />

                  {/* Service pages */}
                  <Route path="/services/websites" component={WebsitesPage} />
                  <Route path="/services/ui-ux" component={UIUXPage} />
                  <Route path="/services/branding" component={BrandingPage} />
                  <Route path="/services/landing-pages" component={LandingPagesPage} />
                  <Route path="/services/game-projects" component={GameProjectsPage} />

                  {/* Legal pages */}
                  <Route path="/privacy" component={PrivacyPage} />
                  <Route path="/terms" component={TermsPage} />
                  <Route path="/cookies" component={CookiesPage} />

                  {/* Home */}
                  <Route path="/" component={Home} />

                  {/* 404 */}
                  <Route component={NotFound} />
                </Switch>
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
