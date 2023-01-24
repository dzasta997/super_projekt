import React, { useState } from "react";
import AdminPageContainer from "../components/containers/AdminPageContainer";
import Tabs from "../components/Tabs";
import AddLocationDialog from "../components/locations/AddLocationDialog";
import AddWarehouseDialog from "../components/warehouses/AddWarehouseDialog";
import RecentLocations from "../components/locations/RecentLocations";
import RecentWarehouses from "../components/warehouses/RecentWarehouses";

function RecentItems({ searchType }) {
  const [addLocationsConfirmed, setAddLocationsConfirmed] = useState(false);
  const handleAddLocationsConfirmed = () =>
    setAddLocationsConfirmed(!addLocationsConfirmed);

  const [addWarehouseConfirmed, setAddWarehouseConfirmed] = useState(false);
  const handleAddWarehouseConfirmed = () =>
    setAddWarehouseConfirmed(!addWarehouseConfirmed);

  if (searchType === "manageLocations") {
    return (
      <>
        <AddLocationDialog onConfirm={handleAddLocationsConfirmed} />
        <RecentLocations/>
      </>
    );
  } else {
    return (
      <>
        <AddWarehouseDialog onConfirm={handleAddWarehouseConfirmed} />
        <RecentWarehouses />
      </>
    );
  }
}

const AdminDashboard = () => {
  const [searchType, setSearchType] = useState("manageLocations");

  return (
    <AdminPageContainer>
      <div className="flex flex-col gap-10">
        <Tabs
          chosenButtonId={searchType}
          onButtonChosen={(e) => setSearchType(e.target.value)}
          firstButtonLabel="Locations"
          firstButtonValue="manageLocations"
          secondButtonLabel="Warehouses"
          secondButtonValue="manageWarehouses"
        />
        <RecentItems searchType={searchType} />
      </div>
    </AdminPageContainer>
  );
};
export default AdminDashboard;
