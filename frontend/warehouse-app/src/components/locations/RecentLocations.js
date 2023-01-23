import { useState } from "react";
import LocationTextBox from "./LocationTextBox";

export default function RecentLocations() {
  const [locations, setLocations] = useState([
    {
      id: 1,
      warehouseId: 2,
      rack: 3,
      alley: 4,
      availability: true,
      capacity: 90,
      description: "This is example description",
    },
  ]);

  const availabilityToString = (availability) => availability ? "Available" : "Not available";

  return (
    <>
    <div className="flex flex-col gap-4">
      {
        (locations.map((location) => (
          <div>
            <h1 className="text-2xl font-thin pb-2">{`Location id ${location.id}`}</h1>
            <LocationTextBox
              warehouseId={location.warehouseId}
              rack={location.rack}
              alley={location.alley}
              availability={availabilityToString(location.availability)}
              capacity={location.capacity}
              description={location.description}
            />
          </div>
        )))
      }
    </div>
    </>
  );
}
