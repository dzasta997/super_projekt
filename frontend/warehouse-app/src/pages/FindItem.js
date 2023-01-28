import React, { useState } from "react";
import PageContainer from "../components/containers/PageContainer";
import Tabs from "../components/Tabs";
import FindItemsByLocationContent from "../components/items/FindItemsByLocationContent";
import FindItemsByNameContent from "../components/items/FindItemsByNameContent";

function FindItemsScreenContent({
  searchType,
}) {
  if (searchType === "items") {
    return <FindItemsByNameContent />
  } else {
    return <FindItemsByLocationContent />
  };
};

const FindItem = () => {
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
        <FindItemsScreenContent searchType={searchType}/>
      </div>
    </PageContainer>
  );
};
export default FindItem;
