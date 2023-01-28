import React, { useState, useEffect } from 'react';
import WarehouseDialog from '../WarehouseDialog';
import TextInputField from '../TextInputField';
import StatusChoice from '../StatusChoice';
import AddEditDialogItem from '../AddEditDialogItem';
import EditableProductList from '../EditableProductList';

export default function AddEditDeliveryDialog({
    warehouseId,
    isEdit,
    deliveryId,
    buttonLabel,
    buttonColor,
    title, 
    updateList
}) {

    const onConfirm = async () => {
        console.log(data);
        let newItems = [];
        data.items.forEach(deliveryItem => {
            if (deliveryItem.quantity > 0) {
                let newLocationItem = {...deliveryItem};
                newLocationItem.item.code = deliveryItem.item.code;
                newItems.push(newLocationItem);
            }
        });
        data.items = newItems;

        let requestPath = 'http://localhost:8080/deliveries/edit';
        let requestBody = JSON.stringify(data);

        if (!isEdit) {
            requestPath = 'http://localhost:8080/deliveries';
            let newData = {...data,
                warehouse: {
                    id: warehouseId,
                },
            };
            requestBody = JSON.stringify(newData);
        }

        console.log("data");
        console.log(data);
        
        console.log("requestBody");
        console.log(requestBody);

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
            console.log("Successfully added/edited new delivery.");
            updateList();
        } else {
            console.log("Could not add/edit new delivery.");
        }
    };

    const getApiData = async () => {
        console.log("inside get api data dialog");
        console.log(deliveryId);
        if (!isEdit) {
            setData({
                employee: {
                    id: 0,
                },
                deliveryDate: "",
                supplier: {
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
        
        console.log("fetching datag");
        let res = await fetch(`http://localhost:8080/deliveries/${deliveryId}`, { 
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
          console.log("awaiting json");
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

    const [data, setData] = useState({
        employee: {
            id: 0,
        },
        deliveryDate: "",
        supplier: {
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
    
    function onEmployeeIdChange(id) {
        let updatedObject = {...data};
        updatedObject.employee.id = parseInt(id.target.value, 10);
        setData(updatedObject);
    };

    function onDateChange(date) {
        let updatedObject = {...data};
        updatedObject.deliveryDate = date.target.value;
        setData(updatedObject);
    };

    function onStatusChange(status) {
        let updatedObject = {...data};
        updatedObject.status = status.target.value;
        setData(updatedObject);
    };

    function onStreetChange(street) {
        let updatedObject = {...data};
        updatedObject.supplier.address.street = street.target.value;
        setData(updatedObject);
    };

    function onStreetNumberChange(number) {
        let updatedObject = {...data};
        updatedObject.supplier.address.number = parseInt(number.target.value, 10);
        setData(updatedObject);
    };

    function onZipCodeChange(zipcode) {
        let updatedObject = {...data};
        updatedObject.supplier.address.zipcode = zipcode.target.value;
        setData(updatedObject);
    };
    
    function onCityChange(city) {
        let updatedObject = {...data};
        updatedObject.supplier.address.city = city.target.value;
        setData(updatedObject);
    };
    
    function onNameChange(name) {
        let updatedObject = {...data};
        updatedObject.supplier.name = name.target.value;
        setData(updatedObject);
    };
    
    function onPhoneChange(phone) {
        let updatedObject = {...data};
        updatedObject.supplier.description = phone.target.value;
        setData(updatedObject);
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
        const currentItem = data.items.filter((deliveryItem) => deliveryItem.item.code === code)[0];
        let newDeliveryItem = {...currentItem};
        newDeliveryItem.item.code = parseInt(e.target.value, 10);
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((deliveryItem) =>
            deliveryItem.item.code === code ? newDeliveryItem : deliveryItem
        );
    
        setData(updatedObject);
    }

    function onQuantityChange(code, e) {
        const currentItem = data.items.filter((deliveryItem) => deliveryItem.item.code === code)[0];
        let newDeliveryItem = {...currentItem};
        newDeliveryItem.quantity = parseInt(e.target.value, 10);
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((deliveryItem) =>
            deliveryItem.item.code === code ? newDeliveryItem : deliveryItem
        );
    
        setData(updatedObject);
      }

    function increaseQuantity(code) {
        const currentItem = data.items.filter((deliveryItem) => deliveryItem.item.code === code)[0];
        let newDeliveryItem = {...currentItem};
        newDeliveryItem.quantity = currentItem.quantity + 1;
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((deliveryItem) =>
            deliveryItem.item.code === code ? newDeliveryItem : deliveryItem
        );
    
        setData(updatedObject);
    }

    function decreaseQuantity(code) {
        const currentItem = data.items.filter((deliveryItem) => deliveryItem.item.code === code)[0];
        let newDeliveryItem = {...currentItem};
        newDeliveryItem.quantity = currentItem.quantity - 1;
    
        let updatedObject = {...data};
        updatedObject.items = data.items.map((deliveryItem) =>
            deliveryItem.item.code === code ? newDeliveryItem : deliveryItem
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
                <TextInputField label="Date" type="date" value={data.deliveryDate} onValueChange={onDateChange}></TextInputField>
            </AddEditDialogItem>

          <div>
            <p className='font-thin text-sm'>Status</p>
            <StatusChoice chosenButtonId={data.status} onButtonChosen={onStatusChange}/>
          </div>

            <AddEditDialogItem title="Address">
                <div className='grid auto-cols-min space-y-4' >
                    <TextInputField label="Street" value={data.supplier.address.street} onValueChange={onStreetChange}></TextInputField>
                    <TextInputField label="Number" value={data.supplier.address.number} onValueChange={onStreetNumberChange}></TextInputField>
                    <TextInputField label="Postal code" value={data.supplier.address.zipcode} onValueChange={onZipCodeChange}></TextInputField>
                    <TextInputField label="City and country" value={data.supplier.address.city} onValueChange={onCityChange}></TextInputField>
                </div>
            </AddEditDialogItem>

            <AddEditDialogItem title="Contact">
                <div className='grid auto-cols-min space-y-4' >
                <TextInputField label="Name" value={data.supplier.name} onValueChange={onNameChange}></TextInputField>
                <TextInputField label="Phone" value={data.supplier.description} onValueChange={onPhoneChange}></TextInputField>
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