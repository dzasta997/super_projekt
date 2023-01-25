import React, { useState } from 'react';
import AddEditDialog from '../components/shippings/AddEditDialog';
import PageContainer from '../components/containers/PageContainer';
import RemoveDialog from '../components/shippings/RemoveDialog';
import ShippingDeliveryTextBox from '../components/ShippingDeliveryTextBox';
   
export default function Delivery({user}) {
  const [deliveries, setDeliveries] = useState([
  {
    id: 1,
    assignedTo: 2,
    plannedDate: "02/12/2023",
    status: "ongoing",
    address: {
      street: "Ścinawska",
      number: 2,
      postalCode: "42-900",
      city: "Wrocław"
    },
    products: [
      {
        id: 1,
        quantity: 2,
        name: "mydło"
      },
      {
        id: 2,
        quantity: 10,
        name: "food"
      },
    ]
  },
  {
    id: 2,
    assignedTo: 5,
    plannedDate: "02/03/2023",
    status: "ongoing",
    address: {
      street: "Ścinawska",
      number: 2,
      postalCode: "42-900",
      city: "Wrocław"
    },
    products: [
      {
        id: 1,
        quantity: 2,
        name: "mydło"
      },
      {
        id: 2,
        quantity: 10,
        name: "food"
      },
    ]
  },
  {
    id: 3,
    assignedTo: 1,
    plannedDate: "01/05/2023",
    status: "ongoing",
    address: {
      street: "Ścinawska",
      number: 2,
      postalCode: "42-900",
      city: "Wrocław"
    },
    products: [
      {
        id: 1,
        quantity: 2,
        name: "mydło"
      },
      {
        id: 2,
        quantity: 10,
        name: "food"
      },
    ]
  }
]);

if (user==="employee") {
  return (
    <PageContainer title="Deliveries from" location="Świdnicka 24">
      <div className='flex flex-col gap-4'>
        {deliveries.map( delivery =>
          <div>
            <h1 className="text-2xl font-thin pb-2">{`Delivery no ${delivery.id}`}</h1>
            <ShippingDeliveryTextBox
            assignedTo={delivery.assignedTo}
            plannedDate={delivery.plannedDate}
            status={delivery.status}
            address={delivery.address}
            products={delivery.products} />
          </div>
        )}
      </div>
    </PageContainer>
  );
} else if (user==="manager") {
  return (
    <PageContainer title="Deliveries from" location="Świdnicka 24">
      <div className='flex flex-col gap-4'>
        <AddEditDialog 
          isDeliveryOrShipping="delivery" 
          isAddOrEdit="add"
          buttonLabel="Add new" 
          title="Add delivery"/>
        {deliveries.map( delivery =>
          <div>
            <div className='flex flex-row gap-4 items-center pb-2'>
              <h1 className="text-2xl font-thin">{`Delivery no ${delivery.id}`}</h1>
              <AddEditDialog
                isDeliveryOrShipping="delivery" 
                isAddOrEdit="edit"
                buttonLabel="Edit" 
                buttonColor="white" 
                title="Edit delivery"/>
              <RemoveDialog buttonLabel="Remove" buttonColor="gray" title="Remove delivery"/>
            </div>
            <ShippingDeliveryTextBox
            assignedTo={delivery.assignedTo}
            plannedDate={delivery.plannedDate}
            status={delivery.status}
            address={delivery.address}
            products={delivery.products} />
          </div>
        )}
      </div>
    </PageContainer>
  );
}
};