import WarehouseTextBox from "./WarehouseTextBox";
import { useState } from "react";

export default function RecentWarehouses() {
  const [warehouses, setWarehouses] = useState([
    {
      id: 1,
      name: "Cool name",
      address: {
        street: "Świdnicka",
        number: 5,
        zipCode: "50-843",
        city: "Wroclaw, Poland",
      },
      description: "This is some description, very long",
    },
  ]);

  return (
    <>
      <div className="flex flex-col gap-4">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id}>
            <h1 className="text-2xl font-thin pb-2">{`Warehouse id ${warehouse.id}`}</h1>
            <WarehouseTextBox
              name={warehouse.name}
              street={warehouse.address.street}
              streetNumber={warehouse.address.number}
              zipCode={warehouse.address.zipCode}
              city={warehouse.address.city}
              description={warehouse.description}
            />
          </div>
        ))}
      </div>
    </>
  );
}
