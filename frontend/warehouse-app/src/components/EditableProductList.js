import React from 'react';
import Button from './buttons/Button';
import QuantitySetter from './QuantitySetter';
import TextInputField from './TextInputField';

function Product({
    index,
    product,
    increaseQuantity,
    decreaseQuantity,
    onQuantityChange,
    onProductIdChange
}) {
    return (
      <div key={index} className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-4">
            <h3 className="text-1xl font-normal whitespace-nowrap">Product id:</h3>
            <TextInputField label="Product id" type="number" min="0" value={product.item.code} onValueChange={ (e) => onProductIdChange(product.item.code, e)}/>
            <p className="text-lg font-thin">{product.item.name}</p>
        </div>
        <QuantitySetter 
            itemId={product.item.code}
            quantity={product.quantity} 
            increaseQuantity={() => increaseQuantity(product.item.code)}
            decreaseQuantity={() => decreaseQuantity(product.item.code)}
            onQuantityChange={(e) => onQuantityChange(product.item.code, e)} />
      </div>
    );
}

export default function EditableProductList({
    items,
    onAddItem,
    increaseQuantity,
    decreaseQuantity,
    onQuantityChange,
    onProductIdChange
}) {
    return(
    <div>
        <p className='font-thin text-sm'>Products</p>
        <div className='grid auto-cols-min gap-10 pb-10'>
            {items.map( (item, index) =>
                <Product
                    index={index}
                    product={item}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    onQuantityChange={onQuantityChange}
                    onProductIdChange={onProductIdChange}
                />
            )}
        </div>
        <div>
            <Button label="+ Add product" onClick={onAddItem} />
        </div>
    </div>
    );
};