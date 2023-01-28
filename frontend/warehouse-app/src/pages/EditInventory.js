import React, { useState } from "react";
import PageContainer from '../components/containers/PageContainer';
import TextInputField from "../components/TextInputField";
import Button from "../components/buttons/Button";

function TextInputWithTitle({
  title,
  label,
  value, 
  width, 
  type, 
  onValueChange
}) {
  return (
    <div className="flex flex-col">
      <p className="font-thin text-xs">{title}</p>
      <TextInputField
        label={label}
        value={value}
        width={width}
        type={type}
        onValueChange={onValueChange} />
    </div>
  );
};
  
const EditInventory = () => {

  const [data, setData] = useState({
    code: NaN,
    name: "",
    description: "",
    size: 1
  });

  function onCodeChange(e) {
    let newData = {...data};
    newData.code = parseInt(e.target.value, 10);
    setData(newData);
  };

  function onNameChange(e) {
    let newData = {...data};
    newData.name = e.target.value;
    setData(newData);
  };

  function onDescriptionChange(e) {
    let newData = {...data};
    newData.description = e.target.value;
    setData(newData);
  };

  function onSizeChange(e) {
    let newData = {...data};
    newData.size = parseInt(e.target.value, 10);
    setData(newData);
  };

  const onAddClick = async() => {
    let requestBody = JSON.stringify(data);
    let res = await fetch('http://localhost:8080/items', { 
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
      console.log("Successfully added new item.");
      setData({
        code: NaN,
        name: "",
        description: "",
        size: 1
      });
    } else {
      console.log("Could not add new item.");
    }
  };

  // TODO alert
  return (
    <PageContainer title="Edit inventory" location="Świdnicka 24">
      <div className='flex flex-col gap-4'>
        <p className="font-light text-md">Add new items</p>
        <TextInputWithTitle 
          title="Id" 
          label="id"
          width="w-[100px]"
          type="number"
          value={data.code}
          onValueChange={onCodeChange} />
        
        <TextInputWithTitle 
          title="Name" 
          label="name"
          value={data.name}
          onValueChange={onNameChange} />

        <TextInputWithTitle 
          title="Description" 
          label="description"
          width="w-[400px]"
          value={data.description}
          onValueChange={onDescriptionChange} />

        <TextInputWithTitle 
          title="Size" 
          label="size"
          width="w-[75px]"
          type="number"
          value={data.size}
          onValueChange={onSizeChange} />

        <div>
          <Button 
            label="Add new"
            onClick={onAddClick} />
        </div>
      </div>
    </PageContainer>
  );
};
  
export default EditInventory;