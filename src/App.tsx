import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, AuthKitProvider } from "@workos-inc/authkit-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardLayout from "@/components/DashboardLayout";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Estimator from "@/pages/Estimator";
import EstimatorStart from "@/pages/EstimatorStart";
import Profile from "@/pages/Profile";
import Subscription from "@/pages/Subscription";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user } = useAuth();

  // Protected route wrapper
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!user) {
      return <Navigate to="/" />;
    }
    return <DashboardLayout>{children}</DashboardLayout>;
  };

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estimator"
          element={<Estimator />}
        />
        <Route
          path="/estimator/start"
          element={<EstimatorStart />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

const App = () => {
  return (
    <AuthKitProvider
      clientId={import.meta.env.VITE_WORKOS_CLIENT_ID}
      redirectUri={import.meta.env.VITE_WORKOS_REDIRECT_URI}
    >
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </QueryClientProvider>
    </AuthKitProvider>
  );
};

export default App;
