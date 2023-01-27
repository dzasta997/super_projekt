import WarehouseDialog from "../WarehouseDialog";
import AddEditDialogItem from "../AddEditDialogItem";
import TextInputField from "../TextInputField";
import { useState } from "react";
import AvailabilityChoice from "./AvailabilityChoice";

export default function AddLocationDialog({updateList}) {
  const [locationData, setLocationData] = useState({
    warehouse: {
      id: NaN,
    },
    rack: "",
    alley: "",
    availability: 1,
    capacity: 100,
    description: "",
  });

  const isAvailable =
    locationData.availability === 1 ? true : false;

  function onWarehouseIdChange(id) {
    let newData = { ...locationData };
    newData.warehouse = {
      id: parseInt(id.target.value, 10),
    }
    setLocationData(newData);
  }

  function onRackChange(rack) {
    let newData = { ...locationData };
    newData.rack = parseInt(rack.target.value, 10);
    setLocationData(newData);
  }

  function onAlleyChange(alley) {
    let newData = { ...locationData };
    newData.alley = parseInt(alley.target.value, 10);
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

  const addLocation = async () => {
    console.log(locationData);
    let requestBody = JSON.stringify(locationData);
    let res = await fetch('http://localhost:8080/locations', { 
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      mode: 'cors',
      referrerPolicy: 'no-referrer',
      origin: "http://localhost:3000/",
    });
  
    if (res.status === 200) {
      console.log("Successfully added new location.");
      setLocationData({
        warehouse: {
          id: NaN,
        },
        rack: "",
        alley: "",
        availability: 1,
        capacity: 100,
        description: "",
      });
      updateList();
    } else {
      console.log("Could not add new location.");
    }
  };

  return (
    <>
      <WarehouseDialog
        buttonLabel="Add location"
        title="Add location"
        onConfirm={addLocation}
      >
        <div className="dialog-container">
          <AddEditDialogItem title="Warehouse id">
            <TextInputField
              label="Warehouse id"
              type="number"
              min="0"
              value={locationData.warehouse.id}
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
