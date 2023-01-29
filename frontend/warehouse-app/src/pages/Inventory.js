import React from "react";
import PageContainer from '../components/containers/PageContainer';
import { DocumentTextIcon } from '@heroicons/react/24/outline';
import IconButton from '../components/buttons/IconButton';
  
export default function Inventory({warehouseId=1, warehouseStreet}) {

  const documentIcon = () => <DocumentTextIcon className="h-6"/>

  return (
    <PageContainer title="Inventory" location={warehouseStreet}>
      <div className='grid grid-flow-row cols-1 space-y-4'>
        <p className="font-light text-md">Reports</p>
        <div>
          <a href={`http://localhost:8080/reports/inventory/${warehouseId}`}>
            <IconButton
              label="Generate report"
              Icon={documentIcon}  />
          </a>
        </div>
        <div>
          <a href={`http://localhost:8080/reports/transaction/${warehouseId}`}>
            <IconButton
              label="Generate transaction report"
              Icon={documentIcon} />
          </a>
        </div>
      </div>
    </PageContainer>
  );
};