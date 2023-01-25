import React, { useState } from "react";
import ActionsHistoryElement from "../components/ActionsHistoryElement";
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

  const [historyList, setHistoryList] = useState([
    {
      id: 1,
      type: "Shampoo",
      date: "13/12/2023"
    },
    {
      id: 2,
      type: "Coal",
      date: "24/12/2023"
    }
  ]);

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

  // TODO send request
  function onAddClick() {}

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

        <div className="flex flex-col gap-4 pt-4">
          <p className="font-light text-md">Actions history</p>
          {historyList.map( item =>
            <div>
              <ActionsHistoryElement
                id={item.id}
                type={item.type}
                date={item.date} />
            </div>
          )}
        </div>
        </div>
    </PageContainer>
  );
};
  
export default EditInventory;