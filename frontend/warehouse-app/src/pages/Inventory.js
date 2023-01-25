import React from "react";
import PageContainer from '../components/containers/PageContainer';
import { CalculatorIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import IconButton from '../components/buttons/IconButton';
  
export default function Inventory() {

  const calculatorIcon = () => <CalculatorIcon className="h-6"/>
  const documentIcon = () => <DocumentTextIcon className="h-6"/>

  // TODO requests
  function onCountItemClick() {}

  function onGenerateReportClick() {}

  function onGenerateTransactionReportClick() {}

  return (
    <PageContainer title="Inventory" location="Świdnicka 24">
      <div className='grid grid-flow-row cols-1 space-y-4'>
        <p className="font-light text-md">Reports</p>
        <div>
        <IconButton
          label="Count items"
          Icon={calculatorIcon} 
          onClick={onCountItemClick} />
        </div>
        <div>
        <IconButton
          label="Generate report"
          Icon={documentIcon} 
          onClick={onGenerateReportClick} />
        </div>
        <div>
        <IconButton
          label="Generate transaction report"
          Icon={documentIcon}
          onClick={onGenerateTransactionReportClick} />
        </div>
      </div>
    </PageContainer>
  );
};