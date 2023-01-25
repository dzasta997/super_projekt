import React, { useState } from "react";
import TextInputField from './TextInputField';
import WarehouseDialog from './WarehouseDialog';

export default function AddItemToLocationDialog({
    productId,
    onIdChange,
    buttonLabel,
    buttonColor,
    title,
    onConfirm
}) {
    return (
        <WarehouseDialog buttonLabel={buttonLabel} buttonColor={buttonColor} title={title} onConfirm={onConfirm} >
            <div className='py-10 flex flex-col items-center gap-4'>
            <span>Please enter the item's id:</span>
            <TextInputField 
                label="id" 
                type="number" 
                value={productId} 
                width="w-[100px]" 
                onValueChange={onIdChange} />
            </div>
        </WarehouseDialog>
    );
};