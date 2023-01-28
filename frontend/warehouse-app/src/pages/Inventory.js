import React from "react";
import PageContainer from '../components/containers/PageContainer';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import IconButton from '../components/buttons/IconButton';
  
export default function Inventory({warehouseId=1}) {

  const documentIcon = () => <DocumentTextIcon className="h-6"/>

  // TODO requests

  const onGenerateReportClick = async() => {
    if (Number.isNaN(warehouseId)) {
      return;
    }

    let res = await fetch(`http://localhost:8080/reports/inventory/${warehouseId}`, { 
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
    });
    
    if (res.status === 200) {
        console.log("Successfully gathered items.");
    } else {
        console.log("Could not gather items.");
        console.log("Status: " + res.status);
    }
  }

  function onGenerateTransactionReportClick() {}

  return (
    <PageContainer title="Inventory" location="Świdnicka 24">
      <div className='grid grid-flow-row cols-1 space-y-4'>
        <p className="font-light text-md">Reports</p>
        <div>
          <a href={`http://localhost:8080/reports/inventory/${warehouseId}`}>
            <IconButton
              label="Generate report"
              Icon={documentIcon} 
              onClick={onGenerateReportClick} />
          </a>
        </div>
        <div>
          <a href={`http://localhost:8080/reports/transaction/${warehouseId}`}>
            <IconButton
              label="Generate transaction report"
              Icon={documentIcon}
              onClick={onGenerateTransactionReportClick} />
          </a>
        </div>
      </div>
    </PageContainer>
  );
};