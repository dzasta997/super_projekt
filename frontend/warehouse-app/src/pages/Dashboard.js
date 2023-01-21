import React, { useState } from 'react';
import PageContainer from '../components/PageContainer';
import AddEditDialog from '../components/AddEditDialog';

const Dashboard = () => {

const [confirmed, setConfirmed] = useState(false);
const handleConfirmed = () => setConfirmed(!confirmed);

  return (
    <PageContainer title="Dashboard" location="Świdnicka 25">
      <div className='z-1 flex justify-center items-center bg-primaryBlue p-2'>
      <AddEditDialog title="Add shipping" onConfirm={handleConfirmed} />
      </div>
    </PageContainer>
  );
};
  
export default Dashboard;