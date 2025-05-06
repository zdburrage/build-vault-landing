
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="mb-6">
            <span className="gradient-text">Estimate Storage Unit Builds</span> With Speed & Precision
          </h1>
          <p className="text-xl text-muted-foreground mb-8 md:text-2xl">
            The all-in-one estimating solution that helps contractors win more storage unit projects with accurate bids and professional proposals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#pricing">Get Started <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="#features">See Features</a>
            </Button>
          </div>
        </div>
        <div className="mt-12 relative max-w-4xl mx-auto">
          <div className="bg-white p-2 rounded-xl shadow-2xl border">
            <div className="aspect-[16/9] bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center bg-blue-50">
                <p className="text-lg text-gray-500">App Screenshot</p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-4 -left-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
