import React, { useState } from "react";
import AdminPageContainer from "../components/containers/AdminPageContainer";
import Tabs from "../components/Tabs";
import RecentLocations from "../components/locations/RecentLocations";
import RecentWarehouses from "../components/warehouses/RecentWarehouses";

function RecentItems({ searchType }) {
  if (searchType === "manageLocations") {
    return (
      <>
        <RecentLocations/>
      </>
    );
  } else {
    return (
      <>
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
