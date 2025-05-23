import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthKitProvider } from '@workos-inc/authkit-react';
import { authConfig } from './lib/auth';
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import Estimator from "./pages/Estimator";
import EstimatorStart from "./pages/EstimatorStart";
import Profile from "./pages/Profile";
import Subscription from "./pages/Subscription";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";

const queryClient = new QueryClient();

const App = () => (
  <AuthKitProvider
    clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
    redirectUri={import.meta.env.VITE_WORKOS_REDIRECT_URI}
  >
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/estimator/start" element={<EstimatorStart />} />
              <Route path="/estimator" element={<Estimator />} />
              {/* Redirect /estimator to /estimator/start if no project data */}
              <Route path="/estimator" element={<Navigate to="/estimator/start" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/subscription" element={<Subscription />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </AuthKitProvider>
);

export default App;
