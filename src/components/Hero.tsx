
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
            <AspectRatio ratio={16/9} className="rounded-lg overflow-hidden">
              <div className="w-full h-full bg-white">
                {/* Mocked Screenshot of Estimation Page */}
                <div className="h-full flex flex-col">
                  {/* Header */}
                  <div className="bg-primary h-12 flex items-center px-4 text-white">
                    <div className="font-medium">BuildVault Estimator</div>
                    <div className="ml-auto flex items-center gap-4">
                      <span className="text-sm">Project: Storage Complex #247</span>
                      <span className="bg-secondary text-white text-xs px-2 py-1 rounded">DRAFT</span>
                    </div>
                  </div>
                  
                  {/* Content Area */}
                  <div className="flex flex-1">
                    {/* Sidebar */}
                    <div className="w-48 bg-gray-100 p-3 border-r border-gray-200">
                      <div className="text-sm font-medium text-gray-700 mb-2">Project Sections</div>
                      <div className="space-y-1">
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm">Building Dimensions</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-sm">Materials</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-sm">Labor Costs</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-sm">Equipment</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-sm">Subcontractors</div>
                        <div className="text-gray-600 hover:bg-gray-200 px-2 py-1 rounded text-sm">Summary</div>
                      </div>
                    </div>
                    
                    {/* Main Content */}
                    <div className="flex-1 p-4">
                      <h3 className="text-lg font-semibold mb-4">Building Dimensions</h3>
                      
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border rounded p-3 bg-gray-50">
                          <div className="text-sm text-gray-500 mb-1">Building Width</div>
                          <div className="flex items-center">
                            <div className="text-xl font-medium">120</div>
                            <div className="ml-1 text-gray-500">ft</div>
                          </div>
                        </div>
                        <div className="border rounded p-3 bg-gray-50">
                          <div className="text-sm text-gray-500 mb-1">Building Length</div>
                          <div className="flex items-center">
                            <div className="text-xl font-medium">250</div>
                            <div className="ml-1 text-gray-500">ft</div>
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
