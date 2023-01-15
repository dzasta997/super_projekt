import React, { useState } from 'react';
import Button from '../components/Button';
import IconButton from '../components/IconButton';
import TextInputField from '../components/TextInputField';
import { CalculatorIcon } from '@heroicons/react/24/solid'
import PageContainer from '../components/PageContainer';

const Dashboard = () => {

const [input, setInput] = useState("employee");
const calculatorIcon = () => <CalculatorIcon className="h-6"/>

  return (
    <PageContainer title="Dashboard" location="Świdnicka 25">
      <div className='flex justify-center items-center bg-primaryBlue'>
      <Button label="button1" color="gray" onClick={setInput}/>
      <Button label="button2"></Button>
      <IconButton label="Calculate " Icon={calculatorIcon} />
      <TextInputField id="id" label="but" setState={setInput} />
      <Button label="+ tr" color="transparent" />
      </div>
    </PageContainer>
  );
};
  
export default Dashboard;