import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft, MapPin, Home } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { generateEstimate, type EstimateResponse } from "@/services/estimateService";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type UnitType = {
  size: string;
  count: number;
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
    id: "construction",
    title: "Construction Details",
    description: "Specify construction type and additional features",
  },
  {
    id: "summary",
    title: "Summary",
    description: "Review and generate your estimate",
  },
];

const Estimator = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [buildingWidth, setBuildingWidth] = useState(120);
  const [buildingLength, setBuildingLength] = useState(250);
  const [stories, setStories] = useState(1);
  const [constructionType, setConstructionType] = useState<"metal" | "concrete" | "wood">("metal");
  const [includeClimateControl, setIncludeClimateControl] = useState(false);
  const [optionalAddOns, setOptionalAddOns] = useState({
    solarPanels: false,
    elevator: false,
    officeBuildout: false,
  });
  const [units, setUnits] = useState<UnitType[]>([
    { size: "10×10", count: 24 },
    { size: "10×15", count: 18 },
    { size: "10×20", count: 12 },
  ]);
  const [estimate, setEstimate] = useState<EstimateResponse | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const totalUnits = units.reduce((sum, unit) => sum + unit.count, 0);
  const squareFootage = buildingWidth * buildingLength * stories;

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

  const handleGenerateEstimate = async () => {
    try {
      setIsGenerating(true);
      const locationData = location.state?.location;
      if (!locationData) {
        throw new Error("Location data is required");
      }

      const request = {
        location: locationData,
        buildingWidth,
        buildingLength,
        units,
        stories,
        constructionType,
        includeClimateControl,
        optionalAddOns,
      };

      const response = await generateEstimate(request);
      setEstimate(response);
      toast.success("Estimate generated successfully!");
    } catch (error) {
      console.error("Error generating estimate:", error);
      toast.error("Failed to generate estimate. Please try again.");
    } finally {
      setIsGenerating(false);
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
              <h4 className="font-medium mb-4">Construction Details</h4>
              <div className="space-y-4">
                <div>
                  <Label>Number of Stories</Label>
                  <Select value={stories.toString()} onValueChange={(value) => setStories(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Story</SelectItem>
                      <SelectItem value="2">2 Stories</SelectItem>
                      <SelectItem value="3">3 Stories</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Construction Type</Label>
                  <Select value={constructionType} onValueChange={(value) => setConstructionType(value as "metal" | "concrete" | "wood")}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metal">Metal Frame</SelectItem>
                      <SelectItem value="concrete">Concrete</SelectItem>
                      <SelectItem value="wood">Wood Frame</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label>Climate Control</Label>
                  <Switch
                    checked={includeClimateControl}
                    onCheckedChange={setIncludeClimateControl}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Optional Add-ons</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Solar Panels</span>
                      <Switch
                        checked={optionalAddOns.solarPanels}
                        onCheckedChange={(checked) =>
                          setOptionalAddOns((prev) => ({ ...prev, solarPanels: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Elevator</span>
                      <Switch
                        checked={optionalAddOns.elevator}
                        onCheckedChange={(checked) =>
                          setOptionalAddOns((prev) => ({ ...prev, elevator: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Office Buildout</span>
                      <Switch
                        checked={optionalAddOns.officeBuildout}
                        onCheckedChange={(checked) =>
                          setOptionalAddOns((prev) => ({ ...prev, officeBuildout: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="font-medium mb-4">Project Summary</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Total Units</Label>
                    <div className="text-lg font-medium">{totalUnits}</div>
                  </div>
                  <div>
                    <Label>Square Footage</Label>
                    <div className="text-lg font-medium">{squareFootage.toLocaleString()} sq ft</div>
                  </div>
                  <div>
                    <Label>Stories</Label>
                    <div className="text-lg font-medium">{stories}</div>
                  </div>
                  <div>
                    <Label>Construction Type</Label>
                    <div className="text-lg font-medium capitalize">{constructionType}</div>
                  </div>
                </div>

                {estimate ? (
                  <div className="mt-6 space-y-4">
                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-2">Cost Estimate</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Site Preparation:</span>
                          <span>${estimate.cost_estimate.site_prep.estimated_cost.min.toLocaleString()} - ${estimate.cost_estimate.site_prep.estimated_cost.max.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Construction:</span>
                          <span>${estimate.cost_estimate.construction.materials_and_labor.min.toLocaleString()} - ${estimate.cost_estimate.construction.materials_and_labor.max.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>MEP Systems:</span>
                          <span>${(estimate.cost_estimate.MEP.HVAC.min + estimate.cost_estimate.MEP.electrical.min + estimate.cost_estimate.MEP.plumbing.min).toLocaleString()} - ${(estimate.cost_estimate.MEP.HVAC.max + estimate.cost_estimate.MEP.electrical.max + estimate.cost_estimate.MEP.plumbing.max).toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                          <span>Total Estimate:</span>
                          <span className="text-primary">${estimate.cost_estimate.total_estimate.min.toLocaleString()} - ${estimate.cost_estimate.total_estimate.max.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h5 className="font-medium mb-2">Assumptions</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                        {estimate.assumptions.map((assumption, index) => (
                          <li key={index}>{assumption}</li>
                        ))}
                      </ul>
                    </div>

                    {estimate.notes && (
                      <div className="border-t pt-4">
                        <h5 className="font-medium mb-2">Notes</h5>
                        <p className="text-sm text-gray-600">{estimate.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="mt-6">
                    <Button
                      className="w-full"
                      onClick={handleGenerateEstimate}
                      disabled={isGenerating}
                    >
                      {isGenerating ? "Generating Estimate..." : "Generate Estimate"}
                    </Button>
                  </div>
                )}
              </div>
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
          <span className="text-sm">Project: {location.state?.projectName || "New Project"}</span>
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
            <span className="text-sm font-medium">
              {location.state?.location?.city}, {location.state?.location?.state}
            </span>
          </div>
          <div className="text-sm font-medium text-gray-700 mb-3">Project Summary</div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Units:</span>
              <span>{totalUnits}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Square Footage:</span>
              <span>{squareFootage.toLocaleString()} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Stories:</span>
              <span>{stories}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Construction:</span>
              <span className="capitalize">{constructionType}</span>
            </div>
            {estimate && (
              <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                <span>Total Estimate:</span>
                <span className="text-primary">
                  ${estimate.cost_estimate.total_estimate.min.toLocaleString()} - ${estimate.cost_estimate.total_estimate.max.toLocaleString()}
                </span>
              </div>
            )}
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