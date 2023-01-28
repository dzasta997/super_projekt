import React, { useState, useEffect } from 'react';
import WarehouseDialog from '../WarehouseDialog';
import TextInputField from '../TextInputField';
import StatusChoice from '../StatusChoice';
import AddEditDialogItem from '../AddEditDialogItem';
import EditableProductList from '../EditableProductList';

export default function AddEditShippingDialog({
    warehouseId,
    isEdit,
    shippingId,
    buttonLabel,
    buttonColor,
    title,
    updateList
}) {

    const onConfirm = async () => {
        console.log(data);
        let newItems = [];
        data.items.forEach(shippingItem => {
            if (shippingItem.quantity > 0) {
                let newShippingItem = {...shippingItem};
                newShippingItem.item = {
                    code: shippingItem.item.code,
                };
                newItems.push(newShippingItem);
            }
        });
        data.items = newItems;

        let requestBody = JSON.stringify(data);
        let res = await fetch('http://localhost:8080/shippings', { 
          method: 'POST',
          body: requestBody,
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          mode: 'cors',
          referrerPolicy: 'no-referrer',
          origin: "http://localhost:3000/",
        })
      
        if (res.status === 200) {
          console.log("Successfully added new warehouse.");
          setData({});
          updateList();
        } else {
          console.log("Could not add new warehouse.");
        }
      };

    const [data, setData] = useState(
        {
            employeeId: NaN,
            date: NaN,
            status: "not sent",
            address: {
                street: "",
                number: 0,
                zipCode: "",
                city: ""
            },
            name: "",
            phone: "",
            items: []
        }
    );
    
    function onEmployeeIdChange(id) {
        let newData = {...data};
        newData.employeeId = id.target.value;
        setData(newData);
    };

    function onDateChange(date) {
        let newData = {...data};
        newData.date = date.target.value;
        setData(newData);
    };

    function onStatusChange(status) {
        let newData = {...data};
        newData.status = status.target.value;
        setData(newData);
    };

    function onStreetChange(street) {
        let newData = {...data};
        newData.address.street = street.target.value;
        setData(newData);
    };

    function onStreetNumberChange(number) {
        let newData = {...data};
        newData.address.number = number.target.value;
        setData(newData);
    };

    function onZipCodeChange(zipCode) {
        let newData = {...data};
        newData.address.zipCode = zipCode.target.value;
        setData(newData);
    };
    
    function onCityChange(city) {
        let newData = {...data};
        newData.address.city = city.target.value;
        setData(newData);
    };
    
    function onNameChange(name) {
        let newData = {...data};
        newData.name = name.target.value;
        setData(newData);
    };
    
    function onPhoneChange(phone) {
        let newData = {...data};
        newData.phone = phone.target.value;
        setData(newData);
    };

    function onAddItem() {
        const updateItems = [
            ...data.items,
            {
                id: data.items.length + 1,
                productId: NaN,
                productName: "",
                quantity: 1
            }
        ];

        let newData = {...data};
        newData.items = updateItems;
        setData(newData);
    }

    function onProductIdChange(id, e) {
        const currentItem = data.items.filter(item => item.id === id)[0]
        const newItem = {
            id: id,
            productId: e.target.value,
            productName: currentItem.productName,
            quantity: currentItem.quantity
        }

        const updatedObject = data.items.map((item) =>
          item.id === id ? newItem : item
        );

        let newData = {...data};
        newData.items = updatedObject;
        setData(newData);
    }

    function onQuantityChange(id, e) {
        const currentItem = data.items.filter(item => item.id === id)[0]
        const newItem = {
            id: currentItem.id,
            productId: currentItem.productId,
            productName: currentItem.productName,
            quantity: parseInt(e.target.value, 10)
        }

        const updatedObject = data.items.map((item) =>
          item.id === id ? newItem : item
        );

        let newData = {...data};
        newData.items = updatedObject;
        setData(newData);
    }

    function increaseQuantity(id) {
        const currentItem = data.items.filter(item => item.id === id)[0]
        const newItem = {
            id: id,
            productId: currentItem.productId,
            productName: currentItem.productName,
            quantity: currentItem.quantity+1
        }

        const updatedObject = data.items.map((item) =>
          item.id === id ? newItem : item
        );

        let newData = {...data};
        newData.items = updatedObject;
        setData(newData);
    }

    function decreaseQuantity(id) {
        const currentItem = data.items.filter(item => item.id === id)[0]
        const newItem = {
            id: id,
            productId: currentItem.productId,
            productName: currentItem.productName,
            quantity: currentItem.quantity-1
        }

        const updatedObject = data.items.map((item) =>
          item.id === id ? newItem : item
        );

        let newData = {...data};
        newData.items = updatedObject;
        setData(newData);
    }

    return(
        <WarehouseDialog buttonLabel={buttonLabel} buttonColor={buttonColor} title={title} onConfirm={onConfirm}>
        <div className='dialog-container'>
            <AddEditDialogItem title="Assigned to">
                <TextInputField label="Employee id" type="number" min="0" value={data.employeeId} onValueChange={onEmployeeIdChange}></TextInputField>
            </AddEditDialogItem>

            <AddEditDialogItem title="Planned date of delivery">
                <TextInputField label="Date" type="date" value={data.date} onValueChange={onDateChange}></TextInputField>
            </AddEditDialogItem>

          <div>
            <p className='font-thin text-sm'>Status</p>
            <StatusChoice chosenButtonId={data.status} onButtonChosen={onStatusChange}/>
          </div>

            <AddEditDialogItem title="Address">
                <div className='grid auto-cols-min space-y-4' >
                    <TextInputField label="Street" value={data.street} onValueChange={onStreetChange}></TextInputField>
                    <TextInputField label="Number" value={data.number} onValueChange={onStreetNumberChange}></TextInputField>
                    <TextInputField label="Postal code" value={data.zipCode} onValueChange={onZipCodeChange}></TextInputField>
                    <TextInputField label="City and country" value={data.city} onValueChange={onCityChange}></TextInputField>
                </div>
            </AddEditDialogItem>

            <AddEditDialogItem title="Contact">
                <div className='grid auto-cols-min space-y-4' >
                <TextInputField label="Name" value={data.name} onValueChange={onNameChange}></TextInputField>
                <TextInputField label="Phone" value={data.phone} onValueChange={onPhoneChange}></TextInputField>
                </div>
            </AddEditDialogItem>

          <EditableProductList 
            items={data.items} 
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