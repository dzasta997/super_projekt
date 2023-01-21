import Button from "./Button";
import TextInputField from "./TextInputField";

export default function QuantitySetter({
    itemId,
    quantity,
    increaseQuantity,
    decreaseQuantity,
    onQuantityChange
}) {
    // TODO resize input field
    return (
        <div className='flex flex-row space-x-4'>
            <TextInputField type="number" min="0" value={quantity} onValueChange={ e => onQuantityChange(itemId, e)}></TextInputField>
            <Button label="+" color="gray" onClick={() => increaseQuantity(itemId)} />
            <Button label="-" color="gray" onClick={() => decreaseQuantity(itemId)} />
        </div>
    );
};