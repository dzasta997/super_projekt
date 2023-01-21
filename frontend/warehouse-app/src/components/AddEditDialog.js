import React, { useState } from 'react';
import WarehouseDialog from './WarehouseDialog';
import TextInputField from '../components/TextInputField';
import StatusChoice from '../components/StatusChoice';
import AddEditDialogItem from './WarehouseDialogItem';
import EditableProductList from './EditableProductList';

export default function AddEditDialog({
    title, 
    onConfirm
}) {

    const [employeeId, setEmployeeId] = useState(NaN);
    const onEmployeeIdChange = id => setEmployeeId(id.target.value)

    const [date, setDate] = useState(NaN);
    const onDateChange = date => setDate(date.target.value)

    const [chosenButtonId, setChosenButtonId] = useState("not sent");
    const onButtonChosen = id => setChosenButtonId(id.target.value)

    const [address, setAddress] = useState("");
    const onAddressChange = address => setAddress(address.target.value)

    const [postalCode, setPostalCode] = useState("");
    const onPostalCodeChange = code => setPostalCode(code.target.value)

    const [city, setCity] = useState("");
    const onCityChange = city => setCity(city.target.value)

    const [name, setName] = useState("");
    const onNameChange = name => setName(name.target.value)

    const [phone, setPhone] = useState("");
    const onPhoneChange = phone => setPhone(phone.target.value)

    const [items, setItems] = useState([]);

    function onAddItem() {
        const updateItems = [
            ...items,
            {
                id: items.length + 1,
                productId: NaN,
                productName: "",
                quantity: 1
            }
        ];
        setItems(updateItems);
    }

    function onProductIdChange(id, e) {
        const currentItem = items.filter(item => item.id === id)[0]
        const newItem = {
            id: id,
            productId: e.target.value,
            productName: currentItem.productName,
            quantity: currentItem.quantity
        }

        const updatedObject = items.map((item) =>
          item.id === id ? newItem : item
        );

        setItems(updatedObject);
    }

    function onQuantityChange(id, e) {
        const currentItem = items.filter(item => item.id === id)[0]
        const newItem = {
            id: currentItem.id,
            productId: currentItem.productId,
            productName: currentItem.productName,
            quantity: parseInt(e.target.value, 10)
        }

        const updatedObject = items.map((item) =>
          item.id === id ? newItem : item
        );

        setItems(updatedObject);
    }

    function increaseQuantity(id) {
        const currentItem = items.filter(item => item.id === id)[0]
        const newItem = {
            id: id,
            productId: currentItem.productId,
            productName: currentItem.productName,
            quantity: currentItem.quantity+1
        }

        const updatedObject = items.map((item) =>
          item.id === id ? newItem : item
        );

        setItems(updatedObject);
    }

    function decreaseQuantity(id) {
        const currentItem = items.filter(item => item.id === id)[0]
        const newItem = {
            id: id,
            productId: currentItem.productId,
            productName: currentItem.productName,
            quantity: currentItem.quantity-1
        }

        const updatedObject = items.map((item) =>
          item.id === id ? newItem : item
        );

        setItems(updatedObject);
    }

    return(
        <WarehouseDialog title={title} onConfirm={onConfirm}>
        <div className='flex flex-col space-y-6'>
            <AddEditDialogItem title="Assigned to">
                <TextInputField label="Employee id" type="number" min="0" value={employeeId} onValueChange={onEmployeeIdChange}></TextInputField>
            </AddEditDialogItem>

            <AddEditDialogItem title="Planned date of delivery">
                <TextInputField label="Date" type="date" value={date} onValueChange={onDateChange}></TextInputField>
            </AddEditDialogItem>

          <div>
            <p className='font-thin text-sm'>Status</p>
            <StatusChoice chosenButtonId={chosenButtonId} onButtonChosen={onButtonChosen}/>
          </div>

            <AddEditDialogItem title="Address">
                <div className='grid auto-cols-min space-y-4' >
                    <TextInputField label="Address" value={address} onValueChange={onAddressChange}></TextInputField>
                    <TextInputField label="Postal code" value={postalCode} onValueChange={onPostalCodeChange}></TextInputField>
                    <TextInputField label="City and country" value={city} onValueChange={onCityChange}></TextInputField>
                </div>
            </AddEditDialogItem>

            <AddEditDialogItem title="Contact">
                <div className='grid auto-cols-min space-y-4' >
                <TextInputField label="Name" value={name} onValueChange={onNameChange}></TextInputField>
                <TextInputField label="Phone" value={phone} onValueChange={onPhoneChange}></TextInputField>
                </div>
            </AddEditDialogItem>

          <EditableProductList 
            items={items} 
            onAddItem={onAddItem}
            increaseQuantity={increaseQuantity} 
            decreaseQuantity={decreaseQuantity}
            onQuantityChange={onQuantityChange}
            onProductIdChange={onProductIdChange}
            />
        </div>
      </WarehouseDialog>
    );
};