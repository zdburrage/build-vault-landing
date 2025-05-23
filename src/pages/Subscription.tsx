import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Calendar, CreditCard, AlertCircle } from "lucide-react";
import { useAuth } from "@workos-inc/authkit-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type WorkOSUser = {
  id: string;
  email: string;
  custom_claims?: {
    role?: string;
  };
};

type Plan = {
  name: string;
  price: number;
  interval: "month" | "year";
  features: string[];
  description: string;
  popular?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    price: 49,
    interval: "month",
    description: "Perfect for small storage facilities",
    features: [
      "Up to 5 projects",
      "Basic cost estimation",
      "Email support",
      "Standard templates",
      "Basic reporting",
    ],
  },
  {
    name: "Professional",
    price: 99,
    interval: "month",
    description: "Ideal for growing businesses",
    features: [
      "Unlimited projects",
      "Advanced cost estimation",
      "Priority support",
      "Custom templates",
      "Advanced reporting",
      "Team collaboration",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 299,
    interval: "month",
    description: "For large-scale operations",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantees",
      "Training sessions",
      "Custom development",
      "White-label options",
    ],
  },
];

// Mock subscription data - in a real app, this would come from your backend
const MOCK_SUBSCRIPTION = {
  plan: "Professional",
  status: "active",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  nextBillingDate: "2024-12-31",
  price: 99,
  interval: "month",
  features: [
    "Unlimited projects",
    "Advanced cost estimation",
    "Priority support",
    "Custom templates",
    "Advanced reporting",
    "Team collaboration",
    "API access",
  ],
};

const Subscription = () => {
  const [billingInterval, setBillingInterval] = useState<"month" | "year">("month");
  const { user, role } = useAuth();
  const [isCustomerAdmin, setIsCustomerAdmin] = useState(false);

  useEffect(() => {
    if (role === "customer-admin") {
      setIsCustomerAdmin(true);
    }
  }, [role]);

  const getDiscountedPrice = (price: number) => {
    if (billingInterval === "year") {
      return price * 10; // 2 months free when paying yearly
    }
    return price;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        {isCustomerAdmin && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Current Subscription</h2>
            <Card className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{MOCK_SUBSCRIPTION.plan} Plan</h3>
                  <p className="text-muted-foreground">
                    ${MOCK_SUBSCRIPTION.price}/{MOCK_SUBSCRIPTION.interval}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    MOCK_SUBSCRIPTION.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {MOCK_SUBSCRIPTION.status.charAt(0).toUpperCase() + MOCK_SUBSCRIPTION.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Start Date</div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{formatDate(MOCK_SUBSCRIPTION.startDate)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Next Billing Date</div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span>{formatDate(MOCK_SUBSCRIPTION.nextBillingDate)}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Expiration Date</div>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-primary" />
                    <span>{formatDate(MOCK_SUBSCRIPTION.endDate)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Included Features</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {MOCK_SUBSCRIPTION.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan for your storage facility business. All plans include
            our core estimation features and regular updates.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-muted p-1 rounded-lg">
            <Button
              variant={billingInterval === "month" ? "default" : "ghost"}
              onClick={() => setBillingInterval("month")}
              className="rounded-md"
            >
              Monthly
            </Button>
            <Button
              variant={billingInterval === "year" ? "default" : "ghost"}
              onClick={() => setBillingInterval("year")}
              className="rounded-md"
            >
              Yearly
              <span className="ml-2 text-xs bg-primary-foreground text-primary px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 relative ${
                plan.popular
                  ? "border-primary shadow-lg"
                  : "border-border"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold">
                    ${getDiscountedPrice(plan.price)}
                  </span>
                  <span className="text-muted-foreground">
                    /{billingInterval}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4">Need a custom solution?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our sales team for a tailored plan that meets your specific needs.
          </p>
          <Button variant="outline">Contact Sales</Button>
        </div>
      </div>
    </div>
  );
};

export default Subscription; 