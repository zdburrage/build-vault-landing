import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Location = {
  city: string;
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
  const [city, setCity] = useState(selectedLocation?.city || "");

  const handleStateChange = (value: string) => {
    const state = US_STATES.find((s) => s.state === value);
    if (state) {
      onLocationSelect({
        city,
        state: state.state,
        stateName: state.stateName,
      });
    }
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    if (selectedLocation?.state) {
      onLocationSelect({
        city: value,
        state: selectedLocation.state,
        stateName: selectedLocation.stateName,
      });
    }
  };

  return (
    <div className="flex gap-3 w-full max-w-[400px]">
      <div className="relative flex-1">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="pl-9"
        />
      </div>
      <Select
        value={selectedLocation?.state}
        onValueChange={handleStateChange}
      >
        <SelectTrigger className="w-[160px]">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          {US_STATES.map((state) => (
            <SelectItem key={state.state} value={state.state}>
              {state.stateName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LocationSelector; 