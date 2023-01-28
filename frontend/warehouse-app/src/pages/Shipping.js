import React, { useState, useEffect } from 'react';
import PageContainer from '../components/containers/PageContainer';
import ShippingDeliveryTextBox from '../components/ShippingDeliveryTextBox';
import AddEditShippingDialog from '../components/shippings/AddEditShippingDialog';
import RemoveShippingDialog from '../components/shippings/RemoveShippingDialog';
  
export default function Shipping({user, warehouseId, warehouseStreet}) {

  const [shippings, setShippings] = useState([]);

  const getApiData = async () => {
    let res = await fetch(`http://localhost:8080/orders`, { 
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      origin: "http://localhost:3000/",
    })

    if (res.status === 200) {
      const json = await res.json();
      console.log("Successfully loaded data.");
      setShippings(json);
    } else {
      console.log("Could not load data.");
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  if (user==="ROLE_EMPLOYEE") {
    return (
      <PageContainer title="Shippings from" location={warehouseStreet}>
        <div className='flex flex-col gap-4'>
          {shippings.map( shipping =>
            <div>
              <h1 className="text-2xl font-thin pb-2">{`Shipping no ${shipping.id}`}</h1>
              <ShippingDeliveryTextBox
              assignedTo={shipping.employee.id}
              plannedDate={shipping.orderDate}
              recipientName={shipping.client.name}
              phoneNumber={shipping.client.description}
              status={shipping.status}
              address={shipping.client.address}
              products={shipping.items} />
            </div>
          )}
        </div>
      </PageContainer>
    );
  } else if (user==="ROLE_MANAGER") {
    return (
      <PageContainer title="Shippings from" location={warehouseStreet}>
        <div className='flex flex-col gap-4'>
          <AddEditShippingDialog 
            warehouseId={warehouseId}
            isEdit={false}
            buttonLabel="Add new" 
            title="Add shipping"
            updateList={getApiData} />
          {shippings.map( shipping =>
            <div>
              <div className='flex flex-row gap-4 items-center pb-2'>
                <h1 className="text-2xl font-thin">{`Shipping no ${shipping.id}`}</h1>
                <AddEditShippingDialog 
                  warehouseId={warehouseId}
                  isEdit={true}
                  shippingId={shipping.id}
                  buttonLabel="Edit" 
                  buttonColor="white" 
                  title="Edit shipping"
                  updateList={getApiData} />
                <RemoveShippingDialog 
                  shippingId={shipping.id}
                  buttonLabel="Remove" 
                  buttonColor="gray" 
                  title="Remove shipping"
                  updateList={getApiData} />
              </div>
              <ShippingDeliveryTextBox
              assignedTo={shipping.employee.id}
              plannedDate={shipping.orderDate}
              recipientName={shipping.client.name}
              phoneNumber={shipping.client.description}
              status={shipping.status}
              address={shipping.client.address}
              products={shipping.items} />
            </div>
          )}
        </div>
      </PageContainer>
    );
  }
};