import React, { useState, useEffect } from 'react';
import PageContainer from '../components/containers/PageContainer';
import ShippingDeliveryTextBox from '../components/ShippingDeliveryTextBox';
import AddEditDeliveryDialog from '../components/deliveries/AddEditDeliveryDialog';
import RemoveDeliveryDialog from '../components/deliveries/RemoveDeliveryDialog';
   
export default function Delivery({user, warehouseId}) {
  console.log("opened delivery screen");
  const [deliveries, setDeliveries] = useState([]);

  const getApiData = async () => {
    console.log("getApiData");
    let res = await fetch(`http://localhost:8080/deliveries`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      origin: "http://localhost:3000/",
    })

    console.log("awaiting res");

    if (res.status === 200) {
      const json = await res.json();

      console.log("awaiting json");  
      console.log("Successfully loaded data.");
      setDeliveries(json);
    } else {
      console.log("Could not load data.");
    }
  };

  useEffect(() => {
    console.log("in useEffect");
    getApiData();
  }, []);

if (user==="ROLE_EMPLOYEE") {
  return (
    <PageContainer title="Deliveries from" location="Świdnicka 24">
      <div className='flex flex-col gap-4'>
        {deliveries.map( delivery =>
          <div>
            <h1 className="text-2xl font-thin pb-2">{`Delivery no ${delivery.id}`}</h1>
            <ShippingDeliveryTextBox
            assignedTo={delivery.employee.id}
            plannedDate={delivery.deliveryDate}
            recipientName={delivery.supplier.name}
            phoneNumber={delivery.supplier.description}
            status={delivery.status}
            address={delivery.supplier.address}
            products={delivery.items} />
          </div>
        )}
      </div>
    </PageContainer>
  );
} else if (user==="ROLE_MANAGER") {
  return (
    <PageContainer title="Deliveries from" location="Świdnicka 24">
      <div className='flex flex-col gap-4'>
        <AddEditDeliveryDialog 
          warehouseId={warehouseId}
          isEdit={false} 
          buttonLabel="Add new" 
          title="Add delivery"
          updateList={getApiData} />
        {deliveries.map( delivery =>
          <div>
            <div className='flex flex-row gap-4 items-center pb-2'>
              <h1 className="text-2xl font-thin">{`Delivery no ${delivery.id}`}</h1>
              <AddEditDeliveryDialog
                warehouseId={warehouseId}
                deliveryId={delivery.id}
                isEdit={true} 
                buttonLabel="Edit" 
                buttonColor="white" 
                title="Edit delivery"
                updateList={getApiData} />
              <RemoveDeliveryDialog 
                deliveryId={delivery.id} 
                buttonLabel="Remove" 
                buttonColor="gray" 
                title="Remove delivery"
                updateList={getApiData} />
            </div>
            <ShippingDeliveryTextBox
            assignedTo={delivery.employee.id}
            plannedDate={delivery.deliveryDate}
            recipientName={delivery.supplier.name}
            phoneNumber={delivery.supplier.description}
            status={delivery.status}
            address={delivery.supplier.address}
            products={delivery.items} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
};