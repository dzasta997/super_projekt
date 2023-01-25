import React, { useState } from 'react';
import PageContainer from '../components/containers/PageContainer';
import AddEditShippingDialog from '../components/shippings/AddEditDialog';

const Dashboard = () => {

const [confirmed, setConfirmed] = useState(false);
const handleConfirmed = () => setConfirmed(!confirmed);

  return (
    <PageContainer title="Dashboard" location="Świdnicka 25">
      <div className='z-1 flex justify-center items-center bg-primaryBlue p-2'>
      <AddEditShippingDialog title="Add shipping" onConfirm={handleConfirmed}/>
      </div>
    </PageContainer>
  );
};
  
export default Dashboard;