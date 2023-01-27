import React, { useState } from 'react';
import PageContainer from '../components/containers/PageContainer';
import AddEditShippingDialog from '../components/shippings/AddEditDialog';

export default function Dashboard({user}) {

  const [confirmed, setConfirmed] = useState(false);
  const handleConfirmed = () => setConfirmed(!confirmed);
  console.log("user in dashboard: " + user);
  
  return (
    <PageContainer title="Dashboard" location="Świdnicka 25">
      <div className='z-1 flex justify-center items-center bg-primaryBlue p-2'>
      <AddEditShippingDialog title="Add shipping" onConfirm={handleConfirmed}/>
      </div>
    </PageContainer>
  );
};