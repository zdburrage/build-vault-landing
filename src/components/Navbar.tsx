import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '@workos-inc/authkit-react';
import { Calculator, Building2, User, CreditCard } from "lucide-react";

const Navbar = () => {
  const { user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSectionClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If we're not on the homepage, navigate to homepage with hash
      navigate(`/#${sectionId}`);
    } else {
      // If we're already on homepage, just scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">BuildVault</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <button
            onClick={() => handleSectionClick('features')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => handleSectionClick('how-it-works')}
            className="text-foreground hover:text-primary transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => handleSectionClick('pricing')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => handleSectionClick('testimonials')}
            className="text-foreground hover:text-primary transition-colors"
          >
            Testimonials
          </button>
          <button
            onClick={() => handleSectionClick('faq')}
            className="text-foreground hover:text-primary transition-colors"
          >
            FAQ
          </button>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Button asChild>
                <Link to="/estimator/start" className="flex items-center gap-2">
                  <Calculator className="h-4 w-4" />
                  Start Estimating
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Link to="/subscription">
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Subscription
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={() => signOut()}>
                  Sign Out
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
