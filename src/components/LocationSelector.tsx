import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Location = {
  state: string;
  stateName: string;
};

const US_STATES = [
  { state: "AL", stateName: "Alabama" },
  { state: "AK", stateName: "Alaska" },
  { state: "AZ", stateName: "Arizona" },
  { state: "AR", stateName: "Arkansas" },
  { state: "CA", stateName: "California" },
  { state: "CO", stateName: "Colorado" },
  { state: "CT", stateName: "Connecticut" },
  { state: "DE", stateName: "Delaware" },
  { state: "FL", stateName: "Florida" },
  { state: "GA", stateName: "Georgia" },
  { state: "HI", stateName: "Hawaii" },
  { state: "ID", stateName: "Idaho" },
  { state: "IL", stateName: "Illinois" },
  { state: "IN", stateName: "Indiana" },
  { state: "IA", stateName: "Iowa" },
  { state: "KS", stateName: "Kansas" },
  { state: "KY", stateName: "Kentucky" },
  { state: "LA", stateName: "Louisiana" },
  { state: "ME", stateName: "Maine" },
  { state: "MD", stateName: "Maryland" },
  { state: "MA", stateName: "Massachusetts" },
  { state: "MI", stateName: "Michigan" },
  { state: "MN", stateName: "Minnesota" },
  { state: "MS", stateName: "Mississippi" },
  { state: "MO", stateName: "Missouri" },
  { state: "MT", stateName: "Montana" },
  { state: "NE", stateName: "Nebraska" },
  { state: "NV", stateName: "Nevada" },
  { state: "NH", stateName: "New Hampshire" },
  { state: "NJ", stateName: "New Jersey" },
  { state: "NM", stateName: "New Mexico" },
  { state: "NY", stateName: "New York" },
  { state: "NC", stateName: "North Carolina" },
  { state: "ND", stateName: "North Dakota" },
  { state: "OH", stateName: "Ohio" },
  { state: "OK", stateName: "Oklahoma" },
  { state: "OR", stateName: "Oregon" },
  { state: "PA", stateName: "Pennsylvania" },
  { state: "RI", stateName: "Rhode Island" },
  { state: "SC", stateName: "South Carolina" },
  { state: "SD", stateName: "South Dakota" },
  { state: "TN", stateName: "Tennessee" },
  { state: "TX", stateName: "Texas" },
  { state: "UT", stateName: "Utah" },
  { state: "VT", stateName: "Vermont" },
  { state: "VA", stateName: "Virginia" },
  { state: "WA", stateName: "Washington" },
  { state: "WV", stateName: "West Virginia" },
  { state: "WI", stateName: "Wisconsin" },
  { state: "WY", stateName: "Wyoming" },
];

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void;
  selectedLocation?: Location;
}

const LocationSelector = ({ onLocationSelect, selectedLocation }: LocationSelectorProps) => {
  return (
    <div className="w-[300px]">
      <Select
        value={selectedLocation?.state}
        onValueChange={(value) => {
          const state = US_STATES.find((s) => s.state === value);
          if (state) {
            onLocationSelect(state);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <MapPin className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Select a state..." />
        </SelectTrigger>
        <SelectContent>
          {US_STATES.map((state) => (
            <SelectItem key={state.state} value={state.state}>
              <div className="flex flex-col">
                <span>{state.stateName}</span>
                <span className="text-xs text-muted-foreground">
                  {state.state}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationSelector; 