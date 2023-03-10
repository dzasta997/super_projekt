import React from 'react';
import Button from './buttons/Button';
import { buttonColor } from './buttons/utils';

export default function StatusChoice({
    chosenButtonId,
    onButtonChosen
}) {
    return (
        <div className='flex flex-row space-x-4'>
              <Button 
                id="not sent" 
                label="Not sent"
                color={buttonColor("not sent" , chosenButtonId)} 
                value="not sent" 
                onClick={onButtonChosen} />
              <Button 
                id="ongoing" 
                label="Ongoing"
                color={buttonColor("ongoing", chosenButtonId)} 
                value="ongoing" 
                onClick={onButtonChosen} />
              <Button 
                id="delivered" 
                label="Delivered"
                color={buttonColor("delivered", chosenButtonId)} 
                value="delivered" 
                onClick={onButtonChosen} />
        </div>
    );
};