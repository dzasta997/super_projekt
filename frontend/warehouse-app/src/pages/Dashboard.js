import React, { useState } from 'react';
import PageContainer from '../components/containers/PageContainer';
import Tabs from '../components/Tabs';
import RecentActions from '../components/RecentActions';

function RecentItems({ searchType }) {
  if (searchType === "recentShippings") {
    return (
      <RecentActions type="shipping"/>
    );
  } else {
    return (
      <RecentActions type="delivery"/>
    );
  }
}

export default function Dashboard({user}) {
  const [searchType, setSearchType] = useState("recentShippings");
  
  return (
    <PageContainer title="Dashboard" location="Świdnicka 25">
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
};