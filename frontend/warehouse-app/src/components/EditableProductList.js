import React from 'react';
import Button from './Button';
import QuantitySetter from './QuantitySetter';
import TextInputField from '../components/TextInputField';

function Product({
    product,
    increaseQuantity,
    decreaseQuantity,
    onQuantityChange,
    onProductIdChange
}) {
    console.log(product)
    console.log(product.productId)
    return (
      <div key={product.id} className="flex flex-col space-y-4">
        <div className="flex flex-row items-center space-x-4">
            <h3 className="text-1xl font-normal">Product id:</h3>
            <TextInputField label="Product id" type="number" min="0" value={product.productId} onValueChange={ e => onProductIdChange(product.id, e)}/>
            <p className="text-lg font-thin">{product.id}</p>
        </div>
        <QuantitySetter 
            itemId={product.id}
            quantity={product.quantity} 
            increaseQuantity={increaseQuantity} 
            decreaseQuantity={decreaseQuantity}
            onQuantityChange={onQuantityChange} />
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
            {items.map( item =>
                <Product
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