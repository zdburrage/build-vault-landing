import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Building2, Calculator } from "lucide-react";
import LocationSelector from "@/components/LocationSelector";

type Location = {
  city: string;
  state: string;
  stateName: string;
};

const EstimatorStart = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState<Location | undefined>();
  const [projectName, setProjectName] = useState("");

  const handleStart = () => {
    if (location && projectName) {
      // In a real app, you'd save this to your state management/store
      navigate("/estimator", {
        state: {
          location,
          projectName,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Start Your Storage Unit Project Estimate</h1>
          <p className="text-lg text-gray-600">
            Enter your project details to begin creating an accurate estimate
          </p>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="project-name" className="text-sm font-medium mb-2 block">
                Project Name
              </Label>
              <Input
                id="project-name"
                placeholder="e.g., Storage Complex #247"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div>
              <Label className="text-sm font-medium mb-2 block">
                Project Location
              </Label>
              <LocationSelector
                selectedLocation={location}
                onLocationSelect={setLocation}
              />
              <p className="text-sm text-gray-500 mt-2">
                Enter your city and state to get accurate local cost estimates
              </p>
            </div>

            <div className="pt-4">
              <Button
                className="w-full"
                size="lg"
                onClick={handleStart}
                disabled={!location || !projectName}
              >
                <Calculator className="mr-2 h-5 w-5" />
                Start Estimating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4">
            <Building2 className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Accurate Estimates</h3>
            <p className="text-sm text-gray-600">
              Get precise cost estimates based on local market data and historical projects
            </p>
          </Card>
          <Card className="p-4">
            <Calculator className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Detailed Breakdown</h3>
            <p className="text-sm text-gray-600">
              View comprehensive cost breakdowns for materials, labor, and equipment
            </p>
          </Card>
          <Card className="p-4">
            <ArrowRight className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold mb-2">Save & Compare</h3>
            <p className="text-sm text-gray-600">
              Save your estimates and compare different project scenarios
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EstimatorStart; 