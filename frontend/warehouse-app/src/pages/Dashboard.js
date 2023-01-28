import React, { useContext, useState } from "react";
import PageContainer from "../components/containers/PageContainer";
import Tabs from "../components/Tabs";
import RecentActions from "../components/RecentActions";
import { LocationContext } from "../context/LocationContext";
import Button from "../components/buttons/Button";
import WarehouseDialog from "../components/WarehouseDialog";

function LocationChooser() {
  const [locations, setLocations] = useState(["Świdnicka 1", "Rynek 2"]);
  const { location, setLocation } = useContext(LocationContext);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const onOptionSelected = (e) => setSelectedLocation(e.target.value);
  const onConfirm = () => setLocation(selectedLocation);

  return (
    <WarehouseDialog
      buttonLabel="Change location"
      buttonColor="gray"
      title="Change location"
      onConfirm={onConfirm}
    >
      <select
        onChange={onOptionSelected}
        className="w-full py-2 px-4 text-gray-500 bg-white border-r-8 border-y-2 border-white rounded-full shadow-sm outline-none focus:border-indigo-600"
      >
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </WarehouseDialog>
  );
}

function RecentItems({ searchType }) {
  if (searchType === "recentShippings") {
    return <RecentActions type="shipping" />;
  } else {
    return <RecentActions type="delivery" />;
  }
}

export default function Dashboard({ user }) {
  const [searchType, setSearchType] = useState("recentShippings");
  const { location, setLocation } = useContext(LocationContext);

  return (
    <PageContainer title="Dashboard" location={location}>
      <div className="mb-4">
        <LocationChooser />
      </div>
      <div className="flex flex-col gap-10">
        <Tabs
          chosenButtonId={searchType}
          onButtonChosen={(e) => setSearchType(e.target.value)}
          firstButtonLabel="Shippings"
          firstButtonValue="recentShippings"
          secondButtonLabel="Deliveries"
          secondButtonValue="recentDeliveries"
        />
        <RecentItems searchType={searchType} />
      </div>
    </PageContainer>
  );
}
