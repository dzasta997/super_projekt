import React, { useState, useEffect } from "react";
import QuantitySetter from "../QuantitySetter";
import AddItemToLocationDialog from "./AddItemToLocationDialog";
import Button from "../buttons/Button";
import TextInputField from "../TextInputField";

function ResultItemsInLocation({
    index,
    data,
    onQuantityChange,
    increaseQuantity,
    decreaseQuantity,
}) {
    return (
      <div
        key={index}
        className="grid grid-flow-row-dense grid-rows-1 grid-cols-2"
      >
        <h2 className="text-2xl font-normal">{`${data.item.name} id: ${data.item.code}`}</h2>
        <div>
        <QuantitySetter
          itemId={data.item.code}
          quantity={data.quantity}
            increaseQuantity={() => increaseQuantity(data.item.code)}
            decreaseQuantity={() => decreaseQuantity(data.item.code)}
            onQuantityChange={(e) => onQuantityChange(data.item.code, e)}
        />
        </div>
      </div>
    );
}

export default function FindItemsByLocationContent({warehouseId=1}) {
    const [searchedLocation, setSearchedLocation] = useState({
        alley: 0,
        rack: 0,
    });

    function onSearchAlleyChange(e) {
        let currentLocation = { ...searchedLocation };
        currentLocation.alley = parseInt(e.target.value, 10);
        console.log(currentLocation);
        setSearchedLocation(currentLocation);
    }

    function onSearchRackChange(e) {
        let currentLocation = { ...searchedLocation };
        currentLocation.rack = parseInt(e.target.value, 10);
        console.log(currentLocation);
        setSearchedLocation(currentLocation);
    }

    // Location with location items
    const [data, setData] = useState({
        items: [],
    });

    function onQuantityChange(code, e) {
      const currentItem = data.items.filter((locationItem) => locationItem.item.code === code)[0];
      let newLocationItem = {...currentItem};
      newLocationItem.quantity = parseInt(e.target.value, 10);
  
      const updatedObject = data.items.map((locationItem) =>
        locationItem.item.code === code ? newLocationItem : locationItem
      );
  
      setData(updatedObject);
    }
  
    function increaseQuantity(code) {
        console.log(data);
        console.log(data.items);
      const currentItem = data.items.filter((locationItem) => locationItem.item.code === code)[0];
      let newLocationItem = {...currentItem};
      newLocationItem.quantity = currentItem.quantity + 1;
  
      const updatedObject = data.items.map((locationItem) =>
        locationItem.item.code === code ? newLocationItem : locationItem
      );
  
      setData(updatedObject);
    }
  
    function decreaseQuantity(code) {
      const currentItem = data.items.filter((locationItem) => locationItem.item.code === code)[0];
      let newLocationItem = {...currentItem};
      newLocationItem.quantity = currentItem.quantity - 1;
  
      const updatedObject = data.items.map((locationItem) =>
        locationItem.item.code === code ? newLocationItem : locationItem
      );
  
      setData(updatedObject);
    }
  
    function addItemToLocation() {
        console.log(chosenValueIndex);
        const itemObj = items[chosenValueIndex];
        
        console.log(data);
        console.log(itemObj);

        let newObj = {...data};
        newObj.items.push({
            item: {
                code: itemObj.code,
                name: itemObj.name,
            },
            quantity: 1,
        });
        
        console.log("new object");
        console.log(newObj);
        setData(newObj);
    }
  
    const onUpdateAllClick = async() => {
        
      console.log(data);
      let newItems = [];
      data.items.forEach(locationItem => {
        if (locationItem.quantity > 0) {
            let newLocationItem = {...locationItem};
            newLocationItem.item = {
                code: locationItem.item.code,
            };
            newItems.push(newLocationItem);
        }
      });
      data.items = newItems;
      
      console.log("right before request");
      console.log(data);
  
      let requestBody = JSON.stringify(data);
      let res = await fetch('http://localhost:8080/locations/edit', { 
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
        console.log("Successfully updated items.");
        onGetItemsByLocationClick();
      } else {
        console.log("Could not update items.");
      }
    };

    // todo search on click or on item change?
    const onGetItemsByLocationClick = async() => {
        if (Number.isNaN(warehouseId) 
            || Number.isNaN(searchedLocation.rack) 
            || Number.isNaN(searchedLocation.alley)) {
            return;
        }
        console.log(searchedLocation);
        let res = await fetch(`http://localhost:8080/locations/warehouse/${warehouseId}/rack/${searchedLocation.rack}/alley/${searchedLocation.alley}`, { 
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

    const [items, setItems] = useState([]);
    const [chosenValueIndex, setChosenValueIndex] = useState(0);
    function onChosenItemChange(e) {
        console.log(items);
        console.log(parseInt(e.target.value, 10));
        setChosenValueIndex(parseInt(e.target.value, 10));
    }

    const getItemsData = async () => {
        let res = await fetch('http://localhost:8080/items', { 
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            origin: "http://localhost:3000/",
        })
        
        if (res.status === 200) {
            console.log("Successfully gathered items.");
            const json = await res.json();
            if (json.length > 0) {
                console.log(json);
                setItems(json);
            }
        } else {
            console.log("Could not load more items.");
        }
    };

    useEffect(() => {
        onGetItemsByLocationClick();
    }, [searchedLocation]);

    useEffect(() => {
        getItemsData();
    }, []);

    return (
    <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
            <p className="font-thin text-sm">Search for item in</p>

            <div className="flex flex-row gap-4 items-center">
                <p className="text-sm font-normal">Alley</p>
                <TextInputField
                label="Alley"
                type="number"
                value={searchedLocation.alley}
                width="w-[70px]"
                onValueChange={onSearchAlleyChange}
                />
            </div>

            <div className="flex flex-row gap-4 items-center">
                <p className="text-sm font-normal">Rack</p>
                <TextInputField
                label="Rack"
                type="number"
                value={searchedLocation.rack}
                width="w-[70px]"
                onValueChange={onSearchRackChange}
                />
            </div>
        </div>

        <div>
            <p className="font-thin text-sm">Results</p>

            <div className="flex flex-col gap-5">
                {data.items.map((locationItem, index) => (
                    <ResultItemsInLocation
                        index={index}
                        data={locationItem}
                        onQuantityChange={onQuantityChange}
                        increaseQuantity={increaseQuantity}
                        decreaseQuantity={decreaseQuantity}
                    />
                ))}

                <div className="">
                    <AddItemToLocationDialog
                        items={items}
                        buttonLabel="+ Add new item"
                        buttonColor="white"
                        title="Add item to location"
                        onConfirm={addItemToLocation}
                        onChosenItemChange={onChosenItemChange}
                    />
                </div>

                <div>
                    <Button label="Update all" onClick={onUpdateAllClick} />
                </div>
            </div>
        </div>
    </div>
    );
};