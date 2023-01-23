import WarehouseDialog from "../shippings/WarehouseDialog";
import AddEditDialogItem from "../AddEditDialogItem";
import TextInputField from "../TextInputField";
import { useState } from "react";

export default function AddWarehouseDialog({ onConfirm }) {
  const [warehouseData, setWarehouseData] = useState({
    name: "",
    address: {
      street: "",
      number: 0,
      zipCode: "",
      city: "",
    },
    description: "",
  });

  function onWarehouseNameChange(name) {
    let newData = { ...warehouseData };
    newData.name = name.target.value;
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
    newData.address.zipCode = zipCode.target.value;
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

  return (
    <>
      <WarehouseDialog
        buttonLabel="Add warehouse"
        title="Add warehouse"
        onConfirm={onConfirm}
      >
        <div className="dialog-container">
          <AddEditDialogItem title="Name">
            <TextInputField
              label="Warehouse name"
              type="text"
              value={warehouseData.name}
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
                value={warehouseData.zipCode}
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
