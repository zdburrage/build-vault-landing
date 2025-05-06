
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/80 border-b">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <span className="text-xl font-bold text-primary">BuildVault</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-foreground hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">
            Testimonials
          </a>
          <a href="#faq" className="text-foreground hover:text-primary transition-colors">
            FAQ
          </a>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
