import React, { useState } from 'react';
import AddEditDialog from '../components/AddEditDialog';
import PageContainer from '../components/PageContainer';
import RemoveDialog from '../components/RemoveDialog';
import TextBox from "../components/TextBox";
  
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
    }
  ]);

  if (user==="employee") {
    return (
      <PageContainer title="Shippings from" location="Świdnicka 24">
        <div className='flex flex-col gap-4'>
          {shippings.map( shipping =>
            <div>
              <h1 className="text-2xl font-thin pb-2">{`Shipping no ${shipping.id}`}</h1>
              <TextBox
              assignedTo={shipping.assignedTo}
              plannedDate={shipping.plannedDate}
              status={shipping.status}
              address={shipping.address}
              products={shipping.products} />
            </div>
          )}
        </div>
      </PageContainer>
    );
  } else if (user==="manager") {
    return (
      <PageContainer title="Shippings from" location="Świdnicka 24">
        <div className='flex flex-col gap-4'>
          <AddEditDialog buttonLabel="Add new" title="Add shipping"/>
          {shippings.map( shipping =>
            <div>
              <div className='flex flex-row gap-4 items-center pb-2'>
                <h1 className="text-2xl font-thin">{`Shipping no ${shipping.id}`}</h1>
                <AddEditDialog buttonLabel="Edit" buttonColor="white" title="Edit shipping"/>
                <RemoveDialog buttonLabel="Remove" buttonColor="gray" title="Remove shipping"/>
              </div>
              <TextBox
              assignedTo={shipping.assignedTo}
              plannedDate={shipping.plannedDate}
              status={shipping.status}
              address={shipping.address}
              products={shipping.products} />
            </div>
          )}
        </div>
      </PageContainer>
    );
  }
};