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
      <div className='flex justify-center items-center bg-primaryBlue p-2'>
      <Button label="button1" color="white" onClick={setInput}/>
      <Button label="button2" color="gray" onClick={setInput}/>
      <Button label="button3"></Button>
      <IconButton label="Calculate " Icon={calculatorIcon} />
      <Button label="button4" color="transparent" />
      <Button label="hello +" color="transparent" />
      </div>
    </PageContainer>
  );
};
  
export default Dashboard;