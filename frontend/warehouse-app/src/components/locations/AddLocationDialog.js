import WarehouseDialog from "../WarehouseDialog";
import AddEditDialogItem from "../AddEditDialogItem";
import TextInputField from "../TextInputField";
import { useState } from "react";
import AvailabilityChoice from "./AvailabilityChoice";

export default function AddLocationDialog({ onConfirm }) {
  const [locationData, setLocationData] = useState({
    warehouseId: NaN,
    rack: NaN,
    alley: NaN,
    availability: "locationAvailable",
    capacity: NaN,
    description: "",
  });

  const isAvailable =
    locationData.availability == "locationAvailable" ? true : false;

  function onWarehouseIdChange(id) {
    let newData = { ...locationData };
    newData.warehouseId = id.target.value;
    setLocationData(newData);
  }

  function onRackChange(rack) {
    let newData = { ...locationData };
    newData.rack = rack.target.value;
    setLocationData(newData);
  }

  function onAlleyChange(alley) {
    let newData = { ...locationData };
    newData.alley = alley.target.value;
    setLocationData(newData);
  }

  function onAvailabilityChange(availability) {
    let newData = { ...locationData };
    newData.availability = availability.target.value;
    setLocationData(newData);
  }

  function onCapacityChange(capacity) {
    let newData = { ...locationData };
    newData.capacity = capacity.target.value;
    setLocationData(newData);
  }

  function onDescriptionChange(description) {
    let newData = { ...locationData };
    newData.description = description.target.value;
    setLocationData(newData);
  }

  return (
    <>
      <WarehouseDialog
        buttonLabel="Add location"
        title="Add location"
        onConfirm={onConfirm}
      >
        <div className="dialog-container">
          <AddEditDialogItem title="Warehouse id">
            <TextInputField
              label="Warehouse id"
              type="number"
              min="0"
              value={locationData.warehouseId}
              onValueChange={onWarehouseIdChange}
            ></TextInputField>
          </AddEditDialogItem>

          <AddEditDialogItem title="Rack and alley">
            <TextInputField
              label="Rack"
              type="number"
              min="0"
              value={locationData.rack}
              onValueChange={onRackChange}
            ></TextInputField>
            <TextInputField
              label="Alley"
              type="number"
              min="0"
              value={locationData.alley}
              onValueChange={onAlleyChange}
            ></TextInputField>
          </AddEditDialogItem>

          <div>
            <p className="font-thin text-sm">Availability</p>
            <AvailabilityChoice
              chosenButtonId={locationData.availability}
              onButtonChosen={onAvailabilityChange}
            ></AvailabilityChoice>
          </div>

          <AddEditDialogItem title="Capacity">
            <TextInputField
              label="Capacity"
              type="number"
              min="0"
              value={locationData.capacity}
              onValueChange={onCapacityChange}
            ></TextInputField>
          </AddEditDialogItem>

          <AddEditDialogItem title="Description">
            <TextInputField
              label="Description"
              type="text"
              value={locationData.description}
              onValueChange={onDescriptionChange}
            ></TextInputField>
          </AddEditDialogItem>
        </div>
      </WarehouseDialog>
    </>
  );
}
