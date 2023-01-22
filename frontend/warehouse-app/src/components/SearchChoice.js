import React from 'react';
import Button from '../components/Button';

function buttonColor(currentButtonId, chosenButtonId) {
    if (currentButtonId === chosenButtonId)
        return "gray"
    else return "white"
};

export default function SearchChoice({
    chosenButtonId,
    onButtonChosen
}) {
    return (
        <div className='flex flex-row space-x-4'>
              <Button 
                id="items" 
                label="Search by items"
                color={buttonColor("items" , chosenButtonId)} 
                value="items" 
                onClick={onButtonChosen} />
              <Button 
                id="location" 
                label="Search by location"
                color={buttonColor("location", chosenButtonId)} 
                value="location" 
                onClick={onButtonChosen} />
        </div>
    );
};