
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Instant Calculations",
    description: "Generate accurate material and labor costs in seconds, not days, for any storage unit project.",
    icon: "⚡",
  },
  {
    title: "Material Database",
    description: "Access up-to-date prices for all construction materials needed for storage unit builds.",
    icon: "📊",
  },
  {
    title: "Customizable Templates",
    description: "Tailor proposals to match specific storage unit design requirements and client expectations.",
    icon: "🛠️",
  },
  {
    title: "Project Tracking",
    description: "Monitor project progress and compare estimated vs. actual costs for better future bidding.",
    icon: "📈",
  },
  {
    title: "Professional Proposals",
    description: "Generate client-ready proposals that showcase your expertise and win more projects.",
    icon: "📝",
  },
  {
    title: "Mobile Access",
    description: "Create and modify estimates on-site from your smartphone or tablet device.",
    icon: "📱",
  },
];

const Features = () => {
  return (
    <section id="features" className="section bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="mb-3">Powerful Estimating Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create accurate estimates for storage unit construction projects
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card">
              <CardHeader className="pb-2">
                <div className="text-3xl mb-2">{feature.icon}</div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
