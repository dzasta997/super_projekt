import WarehouseDialog from "../WarehouseDialog";
import AddEditDialogItem from "../AddEditDialogItem";
import TextInputField from "../TextInputField";
import { useState } from "react";

export default function AddWarehouseDialog({updateList}) {
  const [warehouseData, setWarehouseData] = useState({
    warehouseName: "",
    address: {
      street: "",
      number: 0,
      zipcode: "",
      city: "",
    },
    description: "",
  });

  function onWarehouseNameChange(warehouseName) {
    let newData = { ...warehouseData };
    newData.warehouseName = warehouseName.target.value;
    setWarehouseData(newData);
  }

  function onStreetChange(street) {
    let newData = { ...warehouseData };
    newData.address.street = street.target.value;
    setWarehouseData(newData);
  }

  function onStreetNumberChange(number) {
    let newData = { ...warehouseData };
    newData.address.number = number.target.value;
    setWarehouseData(newData);
  }

  function onZipCodeChange(zipCode) {
    let newData = { ...warehouseData };
    newData.address.zipcode = zipCode.target.value;
    setWarehouseData(newData);
  }

  function onCityChange(city) {
    let newData = { ...warehouseData };
    newData.address.city = city.target.value;
    setWarehouseData(newData);
  }

  function onDescriptionChange(description) {
    let newData = { ...warehouseData };
    newData.description = description.target.value;
    setWarehouseData(newData);
  }

  const addWarehouse = async () => {
    let requestBody = JSON.stringify(warehouseData);
    let res = await fetch('http://localhost:8080/warehouses', { 
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      origin: "http://localhost:3000/",
    })
  
    if (res.status === 200) {
      console.log("Successfully added new warehouse.");
      setWarehouseData({
        warehouseName: "",
        address: {
          street: "",
          number: 0,
          zipcode: "",
          city: "",
        },
        description: "",
      });
      updateList();
    } else {
      console.log("Could not add new warehouse.");
    }
  };

  return (
    <>
      <WarehouseDialog
        buttonLabel="Add warehouse"
        title="Add warehouse"
        onConfirm={addWarehouse}
      >
        <div className="dialog-container">
          <AddEditDialogItem title="Name">
            <TextInputField
              label="Warehouse name"
              type="text"
              value={warehouseData.warehouseName}
              onValueChange={onWarehouseNameChange}
            ></TextInputField>
          </AddEditDialogItem>

          <AddEditDialogItem title="Address">
            <div className="grid auto-cols-min space-y-4">
              <TextInputField
                label="Street"
                value={warehouseData.street}
                onValueChange={onStreetChange}
              ></TextInputField>
              <TextInputField
                label="Number"
                value={warehouseData.number}
                onValueChange={onStreetNumberChange}
              ></TextInputField>
              <TextInputField
                label="Postal code"
                value={warehouseData.zipcode}
                onValueChange={onZipCodeChange}
              ></TextInputField>
              <TextInputField
                label="City and country"
                value={warehouseData.city}
                onValueChange={onCityChange}
              ></TextInputField>
            </div>
          </AddEditDialogItem>

          <AddEditDialogItem title="Description">
            <TextInputField
              label="Description"
              type="text"
              value={warehouseData.description}
              onValueChange={onDescriptionChange}
            ></TextInputField>
          </AddEditDialogItem>
        </div>
      </WarehouseDialog>
    </>
  );
}
