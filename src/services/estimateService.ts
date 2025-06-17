import { z } from "zod";

// Define the schema for the estimate response
const EstimateResponseSchema = z.object({
  project_summary: z.object({
    location: z.string(),
    total_units: z.number(),
    square_footage: z.number(),
    unit_mix: z.object({
      climate_controlled: z.number(),
      standard: z.number(),
    }),
    stories: z.number(),
    construction_type: z.string(),
  }),
  cost_estimate: z.object({
    site_prep: z.object({
      description: z.string(),
      estimated_cost: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
    construction: z.object({
      materials_and_labor: z.object({
        min: z.number(),
        max: z.number(),
      }),
      soft_costs: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
    MEP: z.object({
      HVAC: z.object({
        min: z.number(),
        max: z.number(),
      }),
      electrical: z.object({
        min: z.number(),
        max: z.number(),
      }),
      plumbing: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
    security_and_access: z.object({
      gates_and_fencing: z.object({
        min: z.number(),
        max: z.number(),
      }),
      surveillance: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
    optional_add_ons: z.object({
      solar_panels: z.object({
        min: z.number(),
        max: z.number(),
      }),
      elevator: z.object({
        min: z.number(),
        max: z.number(),
      }),
      office_buildout: z.object({
        min: z.number(),
        max: z.number(),
      }),
    }),
    total_estimate: z.object({
      min: z.number(),
      max: z.number(),
    }),
  }),
  assumptions: z.array(z.string()),
  notes: z.string(),
});

export type EstimateResponse = z.infer<typeof EstimateResponseSchema>;

export type EstimateRequest = {
  location: {
    city: string;
    state: string;
    stateName: string;
  };
  buildingWidth: number;
  buildingLength: number;
  units: {
    size: string;
    count: number;
  }[];
  stories: number;
  constructionType: "metal" | "concrete" | "wood";
  includeClimateControl: boolean;
  optionalAddOns: {
    solarPanels: boolean;
    elevator: boolean;
    officeBuildout: boolean;
  };
};

export async function generateEstimate(request: EstimateRequest): Promise<EstimateResponse> {
  try {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const response = await fetch(`${apiUrl}/api/openai/assistant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        assistant_id: import.meta.env.VITE_OPENAI_ASSISTANT_ID,
        thread_id: null, // Will be created automatically
        message: `Please generate a detailed cost estimate for a self-storage facility with the following specifications:
        Location: ${request.location.city}, ${request.location.state} (${request.location.stateName})
        Building Dimensions: ${request.buildingWidth}ft × ${request.buildingLength}ft
        Number of Stories: ${request.stories}
        Construction Type: ${request.constructionType}
        Climate Control: ${request.includeClimateControl ? "Yes" : "No"}
        Unit Mix: ${request.units.map(u => `${u.count} × ${u.size}`).join(", ")}
        Optional Add-ons:
        - Solar Panels: ${request.optionalAddOns.solarPanels ? "Yes" : "No"}
        - Elevator: ${request.optionalAddOns.elevator ? "Yes" : "No"}
        - Office Buildout: ${request.optionalAddOns.officeBuildout ? "Yes" : "No"}
        
        Please provide the estimate in the following JSON format:
        {
          "project_summary": {
            "location": "string",
            "total_units": number,
            "square_footage": number,
            "unit_mix": {
              "climate_controlled": number,
              "standard": number
            },
            "stories": number,
            "construction_type": "string"
          },
          "cost_estimate": {
            "site_prep": {
              "description": "string",
              "estimated_cost": { "min": number, "max": number }
            },
            "construction": {
              "materials_and_labor": { "min": number, "max": number },
              "soft_costs": { "min": number, "max": number }
            },
            "MEP": {
              "HVAC": { "min": number, "max": number },
              "electrical": { "min": number, "max": number },
              "plumbing": { "min": number, "max": number }
            },
            "security_and_access": {
              "gates_and_fencing": { "min": number, "max": number },
              "surveillance": { "min": number, "max": number }
            },
            "optional_add_ons": {
              "solar_panels": { "min": number, "max": number },
              "elevator": { "min": number, "max": number },
              "office_buildout": { "min": number, "max": number }
            },
            "total_estimate": {
              "min": number,
              "max": number
            }
          },
          "assumptions": [
            "string", "string"
          ],
          "notes": "string"
        }

        IMPORTANT: Respond ONLY with the JSON object, no additional text or formatting.`
      })
    });

    if (!response.ok) {
      throw new Error("Failed to generate estimate");
    }

    const data = await response.json();
    
    // Extract JSON from the response content
    const jsonMatch = data.content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Invalid response format: No JSON object found");
    }

    // Parse the extracted JSON
    const estimateData = JSON.parse(jsonMatch[0]);
    return EstimateResponseSchema.parse(estimateData);
  } catch (error) {
    console.error("Error generating estimate:", error);
    throw error;
  }
} 