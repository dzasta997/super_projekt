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
        <h2 className="text-2xl font-normal">{`${data.item.name} id: ${data.item.code}, found in alley ${data.location.alley}, rack ${data.location.rack}`}</h2>
        <div>
          <p className="font-thin text-sm">Change quantity</p>
          <div className="flex flex-row gap-4">
            <QuantitySetter
              itemId={data.item.code}
              quantity={data.quantity}
              increaseQuantity={() => increaseQuantity(data.item.code, data.location.alley, data.location.rack)}
              decreaseQuantity={() => decreaseQuantity(data.item.code, data.location.alley, data.location.rack)}
              onQuantityChange={(e) => onQuantityChange(data.item.code, data.location.alley, data.location.rack, e)}
            />
            <Button label="Update" onClick={() => onButtonClick(data.item.code, data.location.alley, data.location.rack)} />
          </div>
        </div>
      </div>
    );
}

export default function FindItemsByNameContent({warehouseId=1}) {
    const [searchedItem, setSearchedItem] = useState(0);
    const onSearchItemChange = (e) => setSearchedItem(parseInt(e.target.value, 0));

    // Location items
    const [data, setData] = useState([]);

    function onQuantityChange(code, alley, rack, e) {
        const currentItem = data.filter((locationItem) => 
            locationItem.item.code === code
            && locationItem.location.alley === alley
            && locationItem.location.rack === rack
        )[0];
        let newLocationItem = {...currentItem};
        newLocationItem.quantity = parseInt(e.target.value, 10);
    
        const updatedObject = data.map((locationItem) =>
          locationItem.item.code === code ? newLocationItem : locationItem
        );
    
        setData(updatedObject);
    }
    
    function increaseQuantity(code, alley, rack) {
        const currentItem = data.filter((locationItem) => 
            locationItem.item.code === code
            && locationItem.location.alley === alley
            && locationItem.location.rack === rack
        )[0];
        let newLocationItem = {...currentItem};
        newLocationItem.quantity = currentItem.quantity + 1;
    
        const updatedObject = data.map((locationItem) =>
          locationItem.item.code === code ? newLocationItem : locationItem
        );
    
        setData(updatedObject);
    }
    
    function decreaseQuantity(code, alley, rack) {
        const currentItem = data.filter((locationItem) => 
            locationItem.item.code === code
            && locationItem.location.alley === alley
            && locationItem.location.rack === rack
        )[0];
        let newLocationItem = {...currentItem};
        newLocationItem.quantity = currentItem.quantity - 1;
    
        const updatedObject = data.map((locationItem) =>
          locationItem.item.code === code ? newLocationItem : locationItem
        );
    
        setData(updatedObject);
    };

    const onUpdateItem = async function(code, alley, rack) {
        const currentLocItem = data.filter((locationItem) => 
            locationItem.item.code === code
            && locationItem.location.alley === alley
            && locationItem.location.rack === rack
        )[0];

        if (currentLocItem.quantity > 0) {
            let requestBody = JSON.stringify(currentLocItem);
            let res = await fetch('http://localhost:8080/items/location/edit', { 
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
                console.log("Successfully updated item, code: " + currentLocItem.item.code);
                onGetItemsClick();
            } else {
                console.log("Could not update item, code: " + currentLocItem.item.code);
            }
        } else {
            let res = await fetch('http://localhost:8080/items/delete', { 
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include',
              mode: 'cors',
              referrerPolicy: 'no-referrer',
              origin: "http://localhost:3000/",
            });   
            
            if (res.status === 204) {
                console.log("Successfully deleted item.");
                onGetItemsClick();
            } else {
                console.log("Could not delete item.");
            }
        }
    };

    const onGetItemsClick = async() => {
        if (Number.isNaN(warehouseId) 
            || Number.isNaN(searchedItem)) {
            return;
        }

        let res = await fetch(`http://localhost:8080/items/location/itemcode/${searchedItem}/${warehouseId}`, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            origin: "http://localhost:3000/",
        });
        
        if (res.status === 200) {
            console.log("Successfully gathered items.");
            const json = await res.json();
            console.log(json);
            setData(json);
        } else {
            console.log("Could not gather items.");
            console.log("Status: " + res.status);
        }
    };

    useEffect(() => {
        onGetItemsClick();
    }, [searchedItem]);
  
    return (
        <div className="flex flex-col gap-10">
          <div>
            <p className="font-thin text-sm">Search for</p>
            <TextInputField
              label="Item code"
              value={searchedItem}
              type="number"
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
};