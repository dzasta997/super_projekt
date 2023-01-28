import WarehouseTextBox from "./WarehouseTextBox";
import AddWarehouseDialog from "./AddWarehouseDialog";
import { useState, useEffect } from "react";

export default function RecentWarehouses() {
  const [warehouses, setWarehouses] = useState([]);

  const getApiData = async () => {
    let res = await fetch('http://localhost:8080/warehouses', { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      origin: "http://localhost:3000/",
    })
  
    if (res.status === 200) {
      const json = await res.json();
      if (json.length > 0) {
        setWarehouses(json);
      }
    } else {
      console.log("Could not load more data.");
    }
  };
  
  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      <AddWarehouseDialog updateList={getApiData} />
      <div className="flex flex-col gap-4">
        {warehouses.map((warehouse) => (
          <div key={warehouse.id}>
            <h1 className="text-2xl font-thin pb-2">{`Warehouse id ${warehouse.id}`}</h1>
            <WarehouseTextBox
              name={warehouse.warehouseName}
              street={warehouse.address.street}
              streetNumber={warehouse.address.number}
              zipCode={warehouse.address.zipcode}
              city={warehouse.address.city}
              description={warehouse.description}
            />
          </div>
        ))}
      </div>
    </>
  );
}
