import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, MapPin, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";

type UnitType = {
  size: string;
  count: number;
};

type CostSummary = {
  materials: number;
  labor: number;
  equipment: number;
  subcontractors: number;
  contingency: number;
};

type Step = {
  id: string;
  title: string;
  description: string;
};

const STEPS: Step[] = [
  {
    id: "dimensions",
    title: "Building Dimensions",
    description: "Enter the overall dimensions and unit mix for your storage facility",
  },
  {
    id: "materials",
    title: "Materials",
    description: "Select materials and finishes for your project",
  },
  {
    id: "labor",
    title: "Labor Costs",
    description: "Configure labor rates and requirements",
  },
  {
    id: "equipment",
    title: "Equipment",
    description: "Add equipment and machinery costs",
  },
  {
    id: "subcontractors",
    title: "Subcontractors",
    description: "Include subcontractor costs and fees",
  },
  {
    id: "summary",
    title: "Summary",
    description: "Review and finalize your estimate",
  },
];

const Estimator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [buildingWidth, setBuildingWidth] = useState(120);
  const [buildingLength, setBuildingLength] = useState(250);
  const [units, setUnits] = useState<UnitType[]>([
    { size: "10×10", count: 24 },
    { size: "10×15", count: 18 },
    { size: "10×20", count: 12 },
  ]);
  const [costSummary, setCostSummary] = useState<CostSummary>({
    materials: 124350,
    labor: 86200,
    equipment: 42800,
    subcontractors: 68500,
    contingency: 32185,
  });

  const totalUnits = units.reduce((sum, unit) => sum + unit.count, 0);
  const subtotal = costSummary.materials + costSummary.labor + costSummary.equipment + costSummary.subcontractors;
  const total = subtotal + costSummary.contingency;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <Card className="p-4">
                <Label htmlFor="width" className="text-sm text-gray-500 mb-1">Building Width</Label>
                <div className="flex items-center">
                  <Input
                    id="width"
                    type="number"
                    value={buildingWidth}
                    onChange={(e) => setBuildingWidth(Number(e.target.value))}
                    className="text-xl font-medium border-0 bg-transparent p-0 h-auto"
                  />
                  <span className="ml-1 text-gray-500">ft</span>
                </div>
              </Card>

              <Card className="p-4">
                <Label htmlFor="length" className="text-sm text-gray-500 mb-1">Building Length</Label>
                <div className="flex items-center">
                  <Input
                    id="length"
                    type="number"
                    value={buildingLength}
                    onChange={(e) => setBuildingLength(Number(e.target.value))}
                    className="text-xl font-medium border-0 bg-transparent p-0 h-auto"
                  />
                  <span className="ml-1 text-gray-500">ft</span>
                </div>
              </Card>
            </div>

            <Card className="mb-8">
              <div className="bg-gray-50 px-4 py-2 border-b font-medium">Unit Calculations</div>
              <div className="p-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  {units.map((unit, index) => (
                    <Card key={unit.size} className="p-3">
                      <div className="text-xs text-gray-500">{unit.size} Units</div>
                      <Input
                        type="number"
                        value={unit.count}
                        onChange={(e) => {
                          const newUnits = [...units];
                          newUnits[index].count = Number(e.target.value);
                          setUnits(newUnits);
                        }}
                        className="font-medium border-0 bg-transparent p-0 h-auto"
                      />
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <div className="text-sm font-medium">Total Units:</div>
                  <div className="text-lg font-bold text-primary">{totalUnits}</div>
                </div>
              </div>
            </Card>
          </>
        );
      case 1:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-medium mb-4">Materials Selection</h4>
              <p className="text-muted-foreground">Materials selection coming soon...</p>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-medium mb-4">Labor Costs</h4>
              <p className="text-muted-foreground">Labor costs configuration coming soon...</p>
            </Card>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-medium mb-4">Equipment Costs</h4>
              <p className="text-muted-foreground">Equipment costs coming soon...</p>
            </Card>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-medium mb-4">Subcontractor Costs</h4>
              <p className="text-muted-foreground">Subcontractor costs coming soon...</p>
            </Card>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-medium mb-4">Final Summary</h4>
              <p className="text-muted-foreground">Final summary coming soon...</p>
            </Card>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-primary h-12 flex items-center px-4 text-white">
        <div className="font-medium">BuildVault Estimator</div>
        <div className="ml-auto flex items-center gap-4">
          <span className="text-sm">Project: Storage Complex #247</span>
          <span className="bg-secondary text-white text-xs px-2 py-1 rounded">DRAFT</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-48 bg-white p-3 border-r border-gray-200">
          <div className="text-sm font-medium text-gray-700 mb-2">Project Sections</div>
          <div className="space-y-1">
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className={`px-2 py-1 rounded text-sm cursor-pointer ${
                  index === currentStep
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
                onClick={() => setCurrentStep(index)}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h3 className="text-lg font-semibold">{STEPS[currentStep].title}</h3>
              <p className="text-muted-foreground">{STEPS[currentStep].description}</p>
            </div>

            {renderStepContent()}

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Previous
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={currentStep === STEPS.length - 1}
              >
                {currentStep === STEPS.length - 2 ? "Review" : "Next"}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-64 border-l border-gray-200 p-4 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Texas</span>
          </div>
          <div className="text-sm font-medium text-gray-700 mb-3">Cost Summary</div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Materials:</span>
              <span>${costSummary.materials.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Labor:</span>
              <span>${costSummary.labor.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Equipment:</span>
              <span>${costSummary.equipment.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Subcontractors:</span>
              <span>${costSummary.subcontractors.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Contingency (10%):</span>
              <span>${costSummary.contingency.toLocaleString()}</span>
            </div>
            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
              <span>Total Estimate:</span>
              <span className="text-primary">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="text-sm text-gray-600">
            All changes are automatically saved
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Estimator; 