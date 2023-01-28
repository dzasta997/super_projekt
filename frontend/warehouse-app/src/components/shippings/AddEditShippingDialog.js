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

        let requestPath = 'http://localhost:8080/orders/edit';
        let requestBody = JSON.stringify(data);

        if (!isEdit) {
            requestPath = 'http://localhost:8080/orders';
            let newData = {...data,
                warehouse: {
                    id: warehouseId,
                },
            };
            requestBody = JSON.stringify(newData);
        }

        let res = await fetch(requestPath, { 
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
          console.log("Successfully added new shipping.");
          updateList();
        } else {
          console.log("Could not add new shipping.");
        }
    };

    const getApiData = async () => {
    if (!isEdit) {
        setData({
            employee: {
                id: 0,
            },
            orderDate: "",
            client: {
                name: "",
                address: {
                    street: "",
                    number: 0,
                    zipcode: "",
                    city: "",
                },
                description: "",
            },
            items: [
                {
                    item: {
                        code: 0,
                        name: "",
                    },
                    quantity: 0,
                },
            ],
            warehouse: {
                id: 0,
            },
            status: "",
        });
        return;
    }
    
    let res = await fetch(`http://localhost:8080/orders/${shippingId}`, { 
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
        credentials: 'include',
        mode: 'cors',
        referrerPolicy: 'no-referrer',
        origin: "http://localhost:3000/",
    })
    
    if (res.status === 200) {
        const json = await res.json();
        console.log(json);
        console.log("Successfully loaded data.");
        setData(json);
    } else {
        console.log("Could not load data.");
    }
    };
    
    useEffect(() => {
        getApiData();
    }, []);

    const [data, setData] = useState(
        {
            employee: {
                id: 0,
            },
            orderDate: "",
            client: {
                name: "",
                address: {
                    street: "",
                    number: 0,
                    zipcode: "",
                    city: "",
                },
                description: "",
            },
            items: [
                {
                    item: {
                        code: 0,
                        name: "",
                    },
                    quantity: 0,
                },
            ],
            warehouse: {
                id: 0,
            },
            status: "",
        }
    );
    
    function onEmployeeIdChange(id) {
        let newData = {...data};
        newData.employee.id = parseInt(id.target.value, 10);
        setData(newData);
    };

    function onDateChange(date) {
        let newData = {...data};
        newData.orderDate = date.target.value;
        setData(newData);
    };

    function onStatusChange(status) {
        let newData = {...data};
        newData.status = status.target.value;
        setData(newData);
    };

    function onStreetChange(street) {
        let newData = {...data};
        newData.client.address.street = street.target.value;
        setData(newData);
    };

    function onStreetNumberChange(number) {
        let newData = {...data};
        newData.client.address.number = parseInt(number.target.value, 10);
        setData(newData);
    };

    function onZipCodeChange(zipCode) {
        let newData = {...data};
        newData.client.address.zipcode = zipCode.target.value;
        setData(newData);
    };
    
    function onCityChange(city) {
        let newData = {...data};
        newData.client.address.city = city.target.value;
        setData(newData);
    };
    
    function onNameChange(name) {
        let newData = {...data};
        newData.client.name = name.target.value;
        setData(newData);
    };
    
    function onPhoneChange(phone) {
        let newData = {...data};
        newData.client.description = phone.target.value;
        setData(newData);
    };

    function onAddItem() {
        let newObj = {...data};
        newObj.items.push({
            item: {
                code: 0,
            },
            quantity: 1
        });
        setData(newObj);
    }

    function onProductIdChange(code, e) {
        const currentItem = data.items.filter((shippingItem) => shippingItem.item.code === code)[0];
        let newShippingItem = {...currentItem};
        newShippingItem.item.code = parseInt(e.target.value, 10);
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((shippingItem) =>
            shippingItem.item.code === code ? newShippingItem : shippingItem
        );
    
        setData(updatedObject);
    }

    function onQuantityChange(code, e) {
        const currentItem = data.items.filter((shippingItem) => shippingItem.item.code === code)[0];
        let newShippingItem = {...currentItem};
        newShippingItem.quantity = parseInt(e.target.value, 10);
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((shippingItem) =>
            shippingItem.item.code === code ? newShippingItem : shippingItem
        );
    
        setData(updatedObject);
    }

    function increaseQuantity(code) {
        const currentItem = data.items.filter((shippingItem) => shippingItem.item.code === code)[0];
        let newShippingItem = {...currentItem};
        newShippingItem.quantity = currentItem.quantity + 1;
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((shippingItem) =>
            shippingItem.item.code === code ? newShippingItem : shippingItem
        );
    
        setData(updatedObject);
    }

    function decreaseQuantity(code) {
        const currentItem = data.items.filter((shippingItem) => shippingItem.item.code === code)[0];
        let newShippingItem = {...currentItem};
        newShippingItem.quantity = currentItem.quantity - 1;
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((shippingItem) =>
            shippingItem.item.code === code ? newShippingItem : shippingItem
        );
    
        setData(updatedObject);
    }

    return(
        <WarehouseDialog buttonLabel={buttonLabel} buttonColor={buttonColor} title={title} onConfirm={onConfirm}>
        <div className='dialog-container'>
            <AddEditDialogItem title="Assigned to">
                <TextInputField label="Employee id" type="number" min="0" value={data.employee.id} onValueChange={onEmployeeIdChange}></TextInputField>
            </AddEditDialogItem>

            <AddEditDialogItem title="Planned date of delivery">
                <TextInputField label="Date" type="date" value={data.orderDate} onValueChange={onDateChange}></TextInputField>
            </AddEditDialogItem>

          <div>
            <p className='font-thin text-sm'>Status</p>
            <StatusChoice chosenButtonId={data.status} onButtonChosen={onStatusChange}/>
          </div>

            <AddEditDialogItem title="Address">
                <div className='grid auto-cols-min space-y-4' >
                    <TextInputField label="Street" value={data.client.address.street} onValueChange={onStreetChange}></TextInputField>
                    <TextInputField label="Number" value={data.client.address.number} onValueChange={onStreetNumberChange}></TextInputField>
                    <TextInputField label="Postal code" value={data.client.address.zipCode} onValueChange={onZipCodeChange}></TextInputField>
                    <TextInputField label="City and country" value={data.client.address.city} onValueChange={onCityChange}></TextInputField>
                </div>
            </AddEditDialogItem>

            <AddEditDialogItem title="Contact">
                <div className='grid auto-cols-min space-y-4' >
                <TextInputField label="Name" value={data.client.name} onValueChange={onNameChange}></TextInputField>
                <TextInputField label="Phone" value={data.client.description} onValueChange={onPhoneChange}></TextInputField>
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