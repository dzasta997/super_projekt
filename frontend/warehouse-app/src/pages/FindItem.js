import React, { useState } from "react";
import Button from "../components/Button";
import PageContainer from '../components/PageContainer';
import QuantitySetter from "../components/QuantitySetter";
import SearchChoice from "../components/SearchChoice";
import TextInputField from "../components/TextInputField";

function ResultItem({
  index,
  data, 
  onQuantityChange,
  increaseQuantity,
  decreaseQuantity,
  onButtonClick
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
            onQuantityChange={(e) => onQuantityChange(data.id, e)} />
          <Button label="Update" onClick={onButtonClick} />
        </div>
      </div>
    </div>
  );
};

function ResultItemsInLocation({
  index,
  data, 
  onQuantityChange,
  increaseQuantity,
  decreaseQuantity
}) {
  return (
    <div key={index} className="grid grid-flow-row-dense grid-rows-1 grid-cols-2">
      <h2 className="text-2xl font-normal">{`${data.name} id: ${data.id}`}</h2>
      <QuantitySetter
          itemId={data.id}
          quantity={data.quantity}
          increaseQuantity={() => increaseQuantity(data.id)}
          decreaseQuantity={() => decreaseQuantity(data.id)}
          onQuantityChange={(e) => onQuantityChange(data.id, e)} />
    </div>
  );
};

function FindItemsScreenContent({
  searchType,
  searchedItem,
  searchedLocation,
  onSearchItemChange,
  onSearchAlleyChange,
  onSearchRackChange,
  items,
  onQuantityChange,
  increaseQuantity,
  decreaseQuantity,
  onUpdateAllClick
}) {
  if (searchType === "items") {
    return (
      <div className='flex flex-col gap-10'>
        <div>
          <p className="font-thin text-sm">Search for</p>
          <TextInputField 
            label="Item name" 
            value={searchedItem} 
            width="w-[300px]" 
            onValueChange={onSearchItemChange} />
        </div>

        <div>
          <p className="font-thin text-sm">Results</p>

          <div className="flex flex-col gap-10">
          {items.map( (item, index) => 
            <ResultItem
              index={index}
              data={item}
              onQuantityChange={onQuantityChange}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity} />
          )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-2'>

          <p className="font-thin text-sm">Search for item in</p>

          <div className='flex flex-row gap-4 items-center'>
            <p className="text-sm font-normal">Alley</p>
            <TextInputField 
              label="Alley" 
              type="number"
              value={searchedLocation.alley} 
              width="w-[70px]" 
              onValueChange={onSearchAlleyChange} />
            </div>

            <div className='flex flex-row gap-4 items-center'>
            <p className="text-sm font-normal">Rack</p>
              <TextInputField 
                label="Rack" 
                type="number"
                value={searchedLocation.rack} 
                width="w-[70px]" 
                onValueChange={onSearchRackChange} />
            </div>
        </div>

        <div>
          <p className="font-thin text-sm">Results</p>

          <div className="flex flex-col gap-5">
          {items.map( (item, index) => 
            <ResultItemsInLocation
              index={index}
              data={item}
              onQuantityChange={onQuantityChange}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity} />
          )}
          <div><Button label="Update all" onClick={onUpdateAllClick} /></div>
          </div>
        </div>
      </div>
    );
  }
}
  
const FindItem = () => {

  /**
   * Type of serach, can be either "items" or "location".
   */
  const [searchType, setSearchType] = useState("items");

  const [searchedItem, setSearchedItem] = useState("");
  const onSearchItemChange = e => setSearchedItem(e.target.value)

  const [searchedLocation, setSearchedLocation] = useState({alley:0, rack: 0});

  function onSearchAlleyChange(e) {
    let currentLocation = {...searchedLocation};
    currentLocation.alley = parseInt(e.target.value, 10);
    setSearchedLocation(currentLocation);
  }

  function onSearchRackChange(e) {
    let currentLocation = {...searchedLocation};
    currentLocation.rack = parseInt(e.target.value, 10);
    setSearchedLocation(currentLocation);
  }

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Shampoo",
      quantity: 4,
      alley: 5,
      rack: 2
    },
    {
      id: 2,
      name: "Soap",
      quantity: 7,
      alley: 1,
      rack: 3
    }
  ]);

  function onQuantityChange(id, e) {
    const currentItem = items.filter(item => item.id === id)[0]
    const newItem = {
      id: currentItem.id,
      name: currentItem.name,
      quantity: parseInt(e.target.value, 10),
      alley: currentItem.alley,
      rack: currentItem.rack
    }

    const updatedObject = items.map((item) =>
      item.id === id ? newItem : item
    );

    setItems(updatedObject);
  }

  function increaseQuantity(id) {
      const currentItem = items.filter(item => item.id === id)[0]
      const newItem = {
        id: currentItem.id,
        name: currentItem.name,
        quantity: currentItem.quantity+1,
        alley: currentItem.alley,
        rack: currentItem.rack
      }

      const updatedObject = items.map((item) =>
        item.id === id ? newItem : item
      );

      setItems(updatedObject);
  }

  function decreaseQuantity(id) {
    const currentItem = items.filter(item => item.id === id)[0]
    const newItem = {
      id: currentItem.id,
      name: currentItem.name,
      quantity: currentItem.quantity-1,
      alley: currentItem.alley,
      rack: currentItem.rack
    }

    const updatedObject = items.map((item) =>
      item.id === id ? newItem : item
    );

    setItems(updatedObject);
  }

  // todo quantity changes for search by location

  return (
    <PageContainer title="Search items" location="Świdnicka 24">
      <div className='flex flex-col gap-10'>
        <SearchChoice chosenButtonId={searchType} onButtonChosen={(e) => setSearchType(e.target.value)} />
        <FindItemsScreenContent 
          searchType={searchType}
          searchedItem={searchedItem}
          searchedLocation={searchedLocation}
          onSearchItemChange={onSearchItemChange}
          onSearchAlleyChange={onSearchAlleyChange}
          onSearchRackChange={onSearchRackChange}
          items={items}
          onQuantityChange={onQuantityChange}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
         />
      </div>
    </PageContainer>
  );
}
export default FindItem;