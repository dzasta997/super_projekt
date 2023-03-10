import React, { useState } from "react";
import PageContainer from '../components/containers/PageContainer';
import TextInputField from "../components/TextInputField";
import Button from "../components/buttons/Button";
import ErrorAlert from "../components/ErrorAlert";
import SuccessAlert from "../components/SuccessAlert";

function TextInputWithTitle({
  title,
  label,
  value, 
  width, 
  type, 
  onValueChange,
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
  
const EditInventory = ({warehouseStreet}) => {

  const [isSuccess, setIsSuccess] = useState({
    value: false,
    title: "",
    message: "",
  });

  const onSuccessChange = (obj) => setIsSuccess(obj);
  const onSuccessReset = () => { setIsSuccess({
    value: false,
    title: "",
    message: "",
  }) }

  const [isError, setIsError] = useState({
    value: false,
    title: "",
    message: "",
  });

  const onErrorChange = (obj) => setIsError(obj);
  const onErrorReset = () => { setIsError({
    value: false,
    title: "",
    message: "",
  }) }


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
      onSuccessChange({
        value: true,
        title: "Success!",
        message: "Successfully created new item.",
      });
      setData({
        code: NaN,
        name: "",
        description: "",
        size: 1
      });
    } else {
      console.log("Could not add new item.");
      onErrorChange({
        value: true,
        title: "Add item error!",
        message: "Could not add new item.",
      });
    }
  };

  return (
    <PageContainer title="Edit inventory" location={warehouseStreet}>
      { isError.value ? <ErrorAlert title={isError.title} text={isError.message} onClose={onErrorReset} /> : null }
      { isSuccess.value ? <SuccessAlert title={isSuccess.title} text={isSuccess.message} onClose={onSuccessReset} /> : null}
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