import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import QuantitySetter from "../QuantitySetter";
import TextInputField from "../TextInputField";

function ResultItem({
    index,
    data,
    onQuantityChange,
    increaseQuantity,
    decreaseQuantity,
    onButtonClick,
}) {
    return (
      <div key={index} className="flex flex-col gap-2">
        <h2 className="text-2xl font-normal">{`${data.name} id: ${data.id}, found in alley ${data.alley}, rack ${data.rack}`}</h2>
        <div>
          <p className="font-thin text-sm">Change quantity</p>
          <div className="flex flex-row gap-4">
            <QuantitySetter
              itemId={data.id}
              quantity={data.quantity}
              increaseQuantity={() => increaseQuantity(data.id)}
              decreaseQuantity={() => decreaseQuantity(data.id)}
              onQuantityChange={(e) => onQuantityChange(data.id, e)}
            />
            <Button label="Update" onClick={onButtonClick(data.id)} />
          </div>
        </div>
      </div>
    );
}

export default function FindItemsByNameContent({warehouseId=1}) {
    const [searchedItem, setSearchedItem] = useState("");
    const onSearchItemChange = (e) => setSearchedItem(e.target.value);

    // Location items
    const [data, setData] = useState([]);

    function onQuantityChange(id, e) {
        const currentItem = data.filter((locationItem) => locationItem.item.id === id)[0];
        let newLocationItem = {...currentItem};
        newLocationItem.quantity = parseInt(e.target.value, 10);
    
        const updatedObject = data.map((locationItem) =>
          locationItem.item.id === id ? newLocationItem : locationItem
        );
    
        setData(updatedObject);
    }
    
    function increaseQuantity(id) {
        const currentItem = data.filter((locationItem) => locationItem.item.id === id)[0];
        let newLocationItem = {...currentItem};
        newLocationItem.quantity = currentItem.quantity + 1;
    
        const updatedObject = data.map((locationItem) =>
          locationItem.item.id === id ? newLocationItem : locationItem
        );
    
        setData(updatedObject);
    }
    
    function decreaseQuantity(id) {
        const currentItem = data.filter((locationItem) => locationItem.item.id === id)[0];
        let newLocationItem = {...currentItem};
        newLocationItem.quantity = currentItem.quantity - 1;
    
        const updatedObject = data.map((locationItem) =>
          locationItem.item.id === id ? newLocationItem : locationItem
        );
    
        setData(updatedObject);
    }

    const onUpdateItem = async(id) => {
        // todo if item quantity < 0 -> remove
        // else update
    }
  
    return (
        <div className="flex flex-col gap-10">
          <div>
            <p className="font-thin text-sm">Search for</p>
            <TextInputField
              label="Item name"
              value={searchedItem}
              width="w-[300px]"
              onValueChange={onSearchItemChange}
            />
          </div>
  
          <div>
            <p className="font-thin text-sm">Results</p>
  
            <div className="flex flex-col gap-10">
              {data.map((item, index) => (
                <ResultItem
                  index={index}
                  data={item}
                  onQuantityChange={onQuantityChange}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                  onButtonClick={onUpdateItem}
                />
              ))}
            </div>
          </div>
        </div>
      );
}