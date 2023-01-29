import React, { useContext, useEffect, useState } from "react";
import PageContainer from "../components/containers/PageContainer";
import Tabs from "../components/Tabs";
import RecentActions from "../components/RecentActions";
import WarehouseDialog from "../components/WarehouseDialog";

function AddressChooser({ warehouses, setWarehouseStreet, setWarehouseId }) {
  const [selectedWarehouse, setSelectedWarehouse] = useState();
  const onOptionSelected = (e) => setSelectedWarehouse(e.target.value);
  const onConfirm = () => {
    if (selectedWarehouse != null) {
      const warehouseId = warehouses[selectedWarehouse].id;
      const warehouse = warehouses.find(warehouse => warehouse.id == warehouseId);
      setWarehouseId(warehouseId);
      setWarehouseStreet(`${warehouse.address.street} ${warehouse.address.number}`);
    }
  };

  return (
    <WarehouseDialog
      buttonLabel="Change address"
      buttonColor="gray"
      title="Change address"
      onConfirm={onConfirm}
    >
      <select
        onChange={onOptionSelected}
        className="w-full py-2 px-4 text-gray-500 bg-white border-r-8 border-y-2 border-white rounded-full shadow-sm outline-none focus:border-indigo-600"
      >
        {warehouses.map((warehouse, index) => {
          if (index === selectedWarehouse) {
            return (<option key={index} value={index} selected>
              {`${warehouse.address.street} ${warehouse.address.number}, ${warehouse.address.city}`}
            </option>)
          } else {
            return (<option key={index} value={index}>
                {`${warehouse.address.street} ${warehouse.address.number}, ${warehouse.address.city}`}
              </option>)
          }})}
      </select>
    </WarehouseDialog>
  );
}


export default function Dashboard({ user, warehouseStreet, warehouseId, setWarehouseStreet, setWarehouseId }) {
  const [warehouses, setWarehouses] = useState([]);

  const [recentDeliveries, setRecentDeliveries] = useState([]);
  const [recentShippings, setRecentShippings] = useState([]);

  const getRecentDeliveries = async () => {
    let res = await fetch(`http://localhost:8080/deliveries/warehouse/${warehouseId}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      referrerPolicy: "no-referrer",
      origin: "http://localhost:3000/",
    });

    if (res.status === 200) {
      const json = await res.json();
      console.log("Successfully loaded data.");
      setRecentDeliveries(json);
    } else {
      console.log("Could not load data.");
    }
  };

  const getRecentShippings = async () => {
    let res = await fetch(`http://localhost:8080/orders/warehouse/${warehouseId}`, {
      method: "GET",
      credentials: "include",
      mode: "cors",
      referrerPolicy: "no-referrer",
      origin: "http://localhost:3000/",
    });

    if (res.status === 200) {
      const json = await res.json();
      console.log("Successfully loaded data.");
      setRecentShippings(json);
    } else {
      console.log("Could not load data.");
    }
  };

  const getWarehouses = async () => {
    let res = await fetch("http://localhost:8080/warehouses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      referrerPolicy: "no-referrer",
      origin: "http://localhost:3000/",
    });

    if (res.status === 200) {
      console.log("Successfully gathered warehouses.");
      const json = await res.json();
      setWarehouses(json);
    } else {
      console.log("Could not load more data.");
    }
  };

  useEffect(() => {
    getWarehouses();
    getRecentDeliveries();
    getRecentShippings();
  }, []);

  return (
    <PageContainer title="Dashboard" location={warehouseStreet}>
      <div className="mb-4">
        <AddressChooser warehouses={warehouses} setWarehouseStreet={setWarehouseStreet} setWarehouseId={setWarehouseId}/>
      </div>
      <div className="flex gap-10">
        <RecentActions id="recentShippings" type="shipping" recent={recentShippings} />
        <RecentActions id="recentDeliveries" type="delivery" recent={recentDeliveries} />
      </div>
    </PageContainer>
  );
}
