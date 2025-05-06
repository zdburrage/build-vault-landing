
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Starter",
    price: "$79",
    period: "/month",
    description: "Perfect for small contractors just getting started with storage unit projects",
    features: [
      "Up to 5 estimates per month",
      "Basic material database",
      "Standard proposal templates",
      "Email support",
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "Ideal for growing contractors specializing in storage unit construction",
    features: [
      "Unlimited estimates",
      "Full material database with custom items",
      "Advanced proposal templates",
      "Project tracking & reporting",
      "Priority email & phone support",
    ],
    buttonText: "Sign Up Now",
    buttonVariant: "default",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    description: "For established companies with multiple storage unit projects",
    features: [
      "Everything in Professional",
      "Multiple user accounts",
      "API access for custom integrations",
      "Dedicated account manager",
      "Training & onboarding",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="section bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the plan that's right for your business with our straightforward pricing options
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`price-card ${plan.popular ? "price-card-popular" : ""}`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary hover:bg-primary">
                  Most Popular
                </Badge>
              )}
              <div className="mb-6">
                <h3 className="text-2xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="text-primary mr-2 h-5 w-5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                className="w-full" 
                variant={plan.buttonVariant as "outline" | "default"}
              >
                {plan.buttonText}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
