import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const [userType, setUserType] = useState<"contractor" | "developer">("contractor");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const states = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  return (
    <section className="relative py-20 md:py-32 overflow-hidden w-full max-w-full">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10 w-full max-w-full" />
      <div className="container mx-auto px-0 sm:px-4 relative z-10 w-full max-w-full">
        <div className="max-w-3xl mx-auto text-center mb-12 w-full px-2">
          <div className="flex justify-center mb-6 w-full">
            <Tabs 
              defaultValue="contractor" 
              className="w-full max-w-xs sm:max-w-md"
              onValueChange={(value) => setUserType(value as "contractor" | "developer")}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="contractor">Contractor</TabsTrigger>
                <TabsTrigger value="developer">Developer</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <h1 className="mb-6">
            <span className="gradient-text">Estimate Storage Unit Builds</span> With Speed & Precision
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 md:text-2xl">
            {userType === "contractor" 
              ? "The all-in-one estimating solution that helps contractors win more storage unit projects with accurate bids and professional proposals."
              : "The complete platform that helps developers evaluate costs, compare contractors, and track project expenses for storage facility investments."}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center w-full">
            <div className="w-full sm:w-auto mb-4 sm:mb-0 flex gap-2">
              <div className="relative flex-1 w-full">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="pl-9 w-[200px]"
                />
              </div>
              <Select value={state} onValueChange={setState}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.value} value={state.value}>
                      {state.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button size="lg" className="text-lg px-8" asChild>
              <a href="#pricing">Get Started <ArrowRight className="ml-2 h-4 w-4" /></a>
            </Button>
            
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <a href="#features">See Features</a>
            </Button>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 relative max-w-4xl mx-auto">
          <div className="bg-white p-2 sm:p-4 rounded-xl shadow-2xl border">
            <AspectRatio ratio={16/9} className="rounded-lg overflow-hidden">
              <div className="w-full h-full bg-white">
                {/* Mocked Screenshot of Estimation Page */}
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-primary h-10 sm:h-12 flex items-center px-3 sm:px-4 text-white">
                    <div className="font-medium text-sm sm:text-base">BuildVault Estimator</div>
                    <div className="ml-auto flex items-center gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm">Project: Storage Complex #247</span>
                      <span className="bg-secondary text-white text-xs px-2 py-0.5 sm:py-1 rounded">DRAFT</span>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-32 sm:w-48 bg-gray-100 p-2 sm:p-3 border-r border-gray-200">
                      <div className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Project Sections</div>
                      <div className="space-y-1">
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs sm:text-sm">Building Dimensions</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm">Materials</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm">Labor Costs</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm">Equipment</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm">Subcontractors</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-xs sm:text-sm">Summary</div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-3 sm:p-4">
                      <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Building Dimensions</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="border rounded p-2 sm:p-3 bg-gray-50">
                          <div className="text-xs sm:text-sm text-gray-500 mb-1">Building Width</div>
                          <div className="flex items-center">
                            <div className="text-lg sm:text-xl font-medium">120</div>
                            <div className="ml-1 text-xs sm:text-sm text-gray-500">ft</div>
                          </div>
                        </div>
                        <div className="border rounded p-2 sm:p-3 bg-gray-50">
                          <div className="text-xs sm:text-sm text-gray-500 mb-1">Building Length</div>
                          <div className="flex items-center">
                            <div className="text-lg sm:text-xl font-medium">250</div>
                            <div className="ml-1 text-xs sm:text-sm text-gray-500">ft</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-md mb-6">
                        <div className="bg-gray-50 px-4 py-2 border-b font-medium">Unit Calculations</div>
                        <div className="p-4">
                          <div className="grid grid-cols-3 gap-3 mb-4">
                            <div className="bg-white border rounded p-2">
                              <div className="text-xs text-gray-500">10×10 Units</div>
                              <div className="font-medium">24</div>
                            </div>
                            <div className="bg-white border rounded p-2">
                              <div className="text-xs text-gray-500">10×15 Units</div>
                              <div className="font-medium">18</div>
                            </div>
                            <div className="bg-white border rounded p-2">
                              <div className="text-xs text-gray-500">10×20 Units</div>
                              <div className="font-medium">12</div>
                            </div>
                          </div>
                          <div className="flex justify-between items-center border-t pt-3">
                            <div className="text-sm font-medium">Total Units:</div>
                            <div className="text-lg font-bold text-primary">54</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm">Previous</Button>
                        <Button size="sm">Next: Materials <ArrowRight className="ml-1 h-3 w-3" /></Button>
                      </div>
                    </div>
                    
                    {/* Right Panel */}
                    <div className="w-64 border-l border-gray-200 p-3 bg-gray-50">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm font-medium">Texas</span>
                      </div>
                      <div className="text-sm font-medium text-gray-700 mb-2">Cost Summary</div>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Materials:</span>
                          <span>$124,350</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Labor:</span>
                          <span>$86,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Equipment:</span>
                          <span>$42,800</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subcontractors:</span>
                          <span>$68,500</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                          <span>Subtotal:</span>
                          <span>$321,850</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                          <span>Contingency (10%):</span>
                          <span>$32,185</span>
                        </div>
                        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                          <span>Total Estimate:</span>
                          <span className="text-primary">$354,035</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
          <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-secondary/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-4 -left-4 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
