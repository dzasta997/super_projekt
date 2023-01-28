import React, { useState } from 'react';
import PageContainer from '../components/containers/PageContainer';
import ShippingDeliveryTextBox from '../components/ShippingDeliveryTextBox';
import AddEditShippingDialog from '../components/shippings/AddEditShippingDialog';
import RemoveShippingDialog from '../components/shippings/RemoveShippingDialog';
  
export default function Shipping({user}) {

  const [shippings, setShippings] = useState([
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
    },
    {
      id: 4,
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

  if (user==="ROLE_EMPLOYEE") {
    return (
      <PageContainer title="Shippings from" location="Świdnicka 24">
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
      <PageContainer title="Shippings from" location="Świdnicka 24">
        <div className='flex flex-col gap-4'>
          <AddEditShippingDialog 
            isDeliveryOrShipping="shipping" 
            isAddOrEdit="add"
            buttonLabel="Add new" 
            title="Add shipping"/>
          {shippings.map( shipping =>
            <div>
              <div className='flex flex-row gap-4 items-center pb-2'>
                <h1 className="text-2xl font-thin">{`Shipping no ${shipping.id}`}</h1>
                <AddEditShippingDialog 
                  isDeliveryOrShipping="shipping" 
                  isAddOrEdit="edit"
                  buttonLabel="Edit" 
                  buttonColor="white" 
                  title="Edit shipping"/>
                <RemoveShippingDialog 
                  shippingId={shipping.id}
                  buttonLabel="Remove" 
                  buttonColor="gray" 
                  title="Remove shipping"/>
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