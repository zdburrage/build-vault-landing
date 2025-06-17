import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from '@workos-inc/authkit-react';
import { Calculator, Menu, X } from "lucide-react";
import { useState } from "react";
import bvLogo from "@/assets/bv_transparent.png";

const Navbar = () => {
  const { user, signIn, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={bvLogo} alt="BuildVault Logo" className="h-32 w-auto" />
        </Link>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b md:hidden">
            <div className="container py-4 space-y-4">
              <button
                onClick={() => handleSectionClick('features')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => handleSectionClick('how-it-works')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                How It Works
              </button>
              <button
                onClick={() => handleSectionClick('pricing')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => handleSectionClick('testimonials')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => handleSectionClick('faq')}
                className="block w-full text-left px-4 py-2 text-foreground hover:text-primary transition-colors"
              >
                FAQ
              </button>
            </div>
          </div>
        )}

        {/* Right-side navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Button asChild>
            <Link to="/estimator/start" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Start Estimating
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
