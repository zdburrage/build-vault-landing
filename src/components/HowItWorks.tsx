
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Input Project Details",
    description: "Enter the specifications of your storage unit project including dimensions, number of units, and any custom features.",
  },
  {
    number: "02",
    title: "Select Materials & Finishes",
    description: "Choose from our database of materials, or add custom items to match your specific project requirements.",
  },
  {
    number: "03",
    title: "Generate Detailed Estimate",
    description: "Our system calculates all costs including materials, labor, equipment, and overhead with industry-standard accuracy.",
  },
  {
    number: "04",
    title: "Create Professional Proposal",
    description: "Convert your estimate into a client-ready proposal with customizable templates and your branding.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-3">How BuildVault Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to create accurate storage unit estimates and win more projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="border-t-4 border-t-primary">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-primary mb-2">{step.number}</div>
                <h3 className="text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 bg-muted rounded-xl p-8 relative overflow-hidden">
          <div className="max-w-lg">
            <h3 className="mb-4">See BuildVault In Action</h3>
            <p className="text-lg mb-6">
              Watch how easy it is to create professional storage unit estimates in minutes, not hours.
            </p>
            <div className="flex items-center space-x-2">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                ▶
              </div>
              <span className="font-medium">Watch Demo (2 min)</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-full bg-primary/10 -mr-10 rounded-l-full" />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
