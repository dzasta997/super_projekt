import React, { useState } from "react";
import PageContainer from "../components/containers/PageContainer";
import Tabs from "../components/Tabs";
import FindItemsByLocationContent from "../components/items/FindItemsByLocationContent";
import FindItemsByNameContent from "../components/items/FindItemsByNameContent";

function FindItemsScreenContent({
  searchType,
  warehouseId,
}) {
  if (searchType === "items") {
    return <FindItemsByNameContent warehouseId={warehouseId}/>
  } else {
    return <FindItemsByLocationContent warehouseId={warehouseId}/>
  };
};

export default function FindItem({warehouseId}) {
  /**
   * Type of serach, can be either "items" or "location".
   */
  const [searchType, setSearchType] = useState("items");

  return (
    <PageContainer title="Search items" location="Świdnicka 24">
      <div className="flex flex-col gap-10">
        <Tabs
          chosenButtonId={searchType}
          onButtonChosen={(e) => setSearchType(e.target.value)}
          firstButtonLabel="Search by items"
          firstButtonValue="items"
          secondButtonLabel="Search by location"
          secondButtonValue="location"
        />
        <FindItemsScreenContent searchType={searchType} warehouseId={warehouseId} />
      </div>
    </PageContainer>
  );
};
