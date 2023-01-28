import React from "react";
import WarehouseDialog from '../WarehouseDialog';
import ItemsDropdown from "./ItemsDropDown";

export default function AddItemToLocationDialog({
    items,
    chosenValueIndex,
    buttonLabel,
    buttonColor,
    title,
    onConfirm,
    onChosenItemChange,
}) {
    return (
        <WarehouseDialog buttonLabel={buttonLabel} buttonColor={buttonColor} title={title} onConfirm={onConfirm} >
            <div className='py-10 flex flex-col items-center gap-4'>
            <span>Choose item:</span>
            <div className="flex border-2 border-primaryBlue">
            <ItemsDropdown items={items} chosenValueIndex={chosenValueIndex} onValueChange={onChosenItemChange} />
            </div>
            </div>
        </WarehouseDialog>
    );
};