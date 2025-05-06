
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/90 to-primary">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-6">Ready to Transform Your Estimating Process?</h2>
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Join hundreds of storage unit contractors who are saving time and winning more projects with BuildVault.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
            <a href="#pricing">Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
          <p className="mt-6 text-white/80">No credit card required. 14-day free trial.</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
