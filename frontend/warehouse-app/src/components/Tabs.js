import React from 'react';
import Button from './buttons/Button';
import { buttonColor } from './buttons/utils';

export default function Tabs({
    chosenButtonId,
    onButtonChosen,
    firstButtonLabel,
    firstButtonValue,
    secondButtonLabel,
    secondButtonValue
}) {
    return (
        <div className='flex flex-row space-x-4'>
              <Button 
                id={firstButtonValue}
                label={firstButtonLabel}
                color={buttonColor(firstButtonValue , chosenButtonId)} 
                value={firstButtonValue}
                onClick={onButtonChosen} />
              <Button 
                id={secondButtonValue}
                label={secondButtonLabel}
                color={buttonColor(secondButtonValue, chosenButtonId)} 
                value={secondButtonValue}
                onClick={onButtonChosen} />
        </div>
    );
};