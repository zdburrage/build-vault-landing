import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { generateEstimate, type EstimateResponse } from "@/services/estimateService";
import { toast } from "sonner";
import { Send, Loader2, Home } from "lucide-react";
import LocationSelector from "@/components/LocationSelector";
import { Link } from "react-router-dom";

type Message = {
  type: "bot" | "user";
  content: string;
  options?: string[];
};

type ProjectData = {
  projectName?: string;
  location?: {
    city: string;
    state: string;
    stateName: string;
  };
  buildingWidth?: number;
  buildingLength?: number;
  stories?: number;
  constructionType?: "metal" | "concrete" | "wood";
  includeClimateControl?: boolean;
  optionalAddOns?: {
    solarPanels: boolean;
    elevator: boolean;
    officeBuildout: boolean;
  };
  units?: {
    size: string;
    count: number;
  }[];
};

const ChatEstimator = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "Hi! I'm your storage facility estimator. Let's start by giving your project a name. What would you like to call it?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [projectData, setProjectData] = useState<ProjectData>({});
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFeatureSelection = (feature: string) => {
    if (feature === "All") {
      setSelectedFeatures(["Solar Panels", "Elevator", "Office Buildout"]);
    } else if (feature === "None") {
      setSelectedFeatures([]);
    } else {
      setSelectedFeatures(prev => {
        if (prev.includes(feature)) {
          return prev.filter(f => f !== feature);
        } else {
          return [...prev, feature];
        }
      });
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { type: "user", content: userMessage }]);
    setIsProcessing(true);

    try {
      switch (currentStep) {
        case 0: // Project Name
          setProjectData((prev) => ({ ...prev, projectName: userMessage }));
          setMessages((prev) => [
            ...prev,
            {
              type: "bot",
              content: "Great! Now, let's select the location for your project.",
              options: ["Select Location"],
            },
          ]);
          setCurrentStep(1);
          break;

        case 1: // Location
          if (userMessage === "Select Location") {
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "Please select your project location:",
              },
            ]);
            return;
          }
          break;

        case 2: // Building Dimensions
          const dimensions = userMessage.split("x").map((d) => parseInt(d.trim()));
          if (dimensions.length === 2 && !isNaN(dimensions[0]) && !isNaN(dimensions[1])) {
            setProjectData((prev) => ({
              ...prev,
              buildingWidth: dimensions[0],
              buildingLength: dimensions[1],
            }));
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "How many stories will your facility have?",
                options: ["1", "2", "3", "4"],
              },
            ]);
            setCurrentStep(3);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "Please enter the dimensions in the format: width x length (e.g., 120 x 250)",
              },
            ]);
          }
          break;

        case 3: // Stories
          const stories = parseInt(userMessage);
          if ([1, 2, 3, 4].includes(stories)) {
            setProjectData((prev) => ({ ...prev, stories }));
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "What type of construction would you prefer?",
                options: ["Metal", "Concrete", "Wood"],
              },
            ]);
            setCurrentStep(4);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "Please choose a valid number of stories.",
                options: ["1", "2", "3", "4"],
              },
            ]);
          }
          break;

        case 4: // Construction Type
          const validConstructionTypes = ["metal", "concrete", "wood"] as const;
          const inputType = userMessage.toLowerCase();
          if (validConstructionTypes.includes(inputType as typeof validConstructionTypes[number])) {
            setProjectData((prev) => ({ ...prev, constructionType: inputType as typeof validConstructionTypes[number] }));
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "Would you like to include climate control?",
                options: ["Yes", "No"],
              },
            ]);
            setCurrentStep(5);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "Please select a valid construction type.",
                options: ["Metal", "Concrete", "Wood"],
              },
            ]);
          }
          break;

        case 5: // Climate Control
          const includeClimateControl = userMessage === "Yes";
          setProjectData((prev) => ({ ...prev, includeClimateControl }));
          setMessages((prev) => [
            ...prev,
            {
              type: "bot",
              content: "Would you like to add any optional features? You can select multiple features.",
              options: ["Solar Panels", "Elevator", "Office Buildout", "None", "All", "Done"],
            },
          ]);
          setCurrentStep(6);
          break;

        case 6: // Optional Add-ons
          if (userMessage === "Done") {
            const addOns = {
              solarPanels: selectedFeatures.includes("Solar Panels"),
              elevator: selectedFeatures.includes("Elevator"),
              officeBuildout: selectedFeatures.includes("Office Buildout"),
            };
            setProjectData((prev) => ({ ...prev, optionalAddOns: addOns }));
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "Let me calculate your estimate based on the information provided...",
              },
            ]);
            setCurrentStep(7);
            await generateEstimateRequest();
          } else {
            handleFeatureSelection(userMessage);
            const selectedText = selectedFeatures.length > 0 
              ? `Selected features: ${selectedFeatures.join(", ")}`
              : "No features selected";
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: `${selectedText}\n\nSelect more features or click "Done" when finished.`,
                options: ["Solar Panels", "Elevator", "Office Buildout", "None", "All", "Done"],
              },
            ]);
          }
          break;

        case 7: // Estimate Complete
          if (userMessage === "Yes") {
            setMessages([
              {
                type: "bot",
                content: "Hi! I'm your storage facility estimator. Let's start by giving your project a name. What would you like to call it?",
              },
            ]);
            setProjectData({});
            setCurrentStep(0);
          } else {
            setMessages((prev) => [
              ...prev,
              {
                type: "bot",
                content: "Thank you for using our estimator! Feel free to start a new estimate whenever you're ready.",
              },
            ]);
          }
          break;
      }
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "I'm sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLocationSelect = (location: { city: string; state: string; stateName: string }) => {
    setProjectData((prev) => ({ ...prev, location }));
    setMessages((prev) => [
      ...prev,
      {
        type: "bot",
        content: `Great! Now, let's set the dimensions for your facility. What are the width and length in feet?`,
        options: ["Enter Dimensions"],
      },
    ]);
    setCurrentStep(2);
  };

  const generateEstimateRequest = async () => {
    try {
      // Ensure all required fields are present
      if (!projectData.location || !projectData.buildingWidth || !projectData.buildingLength || 
          !projectData.stories || !projectData.constructionType) {
        throw new Error("Missing required project data");
      }

      const request = {
        location: projectData.location,
        buildingWidth: projectData.buildingWidth,
        buildingLength: projectData.buildingLength,
        stories: projectData.stories,
        constructionType: projectData.constructionType,
        includeClimateControl: projectData.includeClimateControl || false,
        optionalAddOns: projectData.optionalAddOns || {
          solarPanels: false,
          elevator: false,
          officeBuildout: false,
        },
        units: projectData.units || [
          { size: "10×10", count: 24 },
          { size: "10×15", count: 18 },
          { size: "10×20", count: 12 },
        ],
      };

      const response = await generateEstimate(request);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Based on your requirements, here's your estimate:\n\nTotal Cost: $${response.cost_estimate.total_estimate.min.toLocaleString()} - $${response.cost_estimate.total_estimate.max.toLocaleString()}\n\nWould you like to start a new estimate?`,
          options: ["Yes", "No"],
        },
      ]);
    } catch (error) {
      console.error("Error generating estimate:", error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: "I'm sorry, I encountered an error while generating your estimate. Please try again.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 container max-w-4xl mx-auto px-4 py-8">
        <div className="mb-4">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <Home className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-4 ${
                    message.type === "user"
                      ? "bg-primary text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  {message.options && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option) => (
                        <Button
                          key={option}
                          variant={message.type === "bot" ? "outline" : "secondary"}
                          size="sm"
                          onClick={() => {
                            setInput(option);
                            handleSend();
                          }}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {currentStep === 1 && (
              <div className="mt-4">
                <LocationSelector
                  selectedLocation={projectData.location}
                  onLocationSelect={handleLocationSelect}
                />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message..."
                disabled={isProcessing}
              />
              <Button
                onClick={handleSend}
                disabled={isProcessing || !input.trim()}
                size="icon"
              >
                {isProcessing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatEstimator; 