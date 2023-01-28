import React, { useState } from "react";
import WarehouseDialog from '../WarehouseDialog';
import ItemsDropdown from "./ItemsDropDown";

export default function AddItemToLocationDialog({
    buttonLabel,
    buttonColor,
    title,
    onConfirm
}) {
    [items, setItems] = useState([]);
    [chosenValue, setChosenValue] = useState(NaN);

    const getApiData = async () => {
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
            const json = await res.json();
            if (json.length > 0) {
                setItems(json);
            }
        } else {
            console.log("Could not load more data.");
        }
    };
        
    useEffect(() => {
        getApiData();
    }, []);

    return (
        <WarehouseDialog buttonLabel={buttonLabel} buttonColor={buttonColor} title={title} onConfirm={onConfirm(chosenValue)} >
            <div className='py-10 flex flex-col items-center gap-4'>
            <span>Choose item:</span>
            <ItemsDropdown items={items} onValueChange={(e) => setChosenValue(e)} />
            </div>
        </WarehouseDialog>
    );
};