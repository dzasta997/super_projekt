import WarehouseDialog from '../WarehouseDialog';

export default function RemoveShippingDialog({
    shippingId,
    buttonLabel,
    buttonColor,
    title,
    updateList
}) {

    const onConfirm = async () => {
        let res = await fetch(`http://localhost:8080/deliveries/${shippingId}`, { 
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json'
            },
            credentials: 'include',
            mode: 'cors',
            referrerPolicy: 'no-referrer',
            origin: "http://localhost:3000/",
        })
        
        if (res.status === 200) {
            console.log("Successfully deleted delivery.");
            updateList();
        } else {
            console.log("Could not delete delivery.");
        }
    };

    return (
        <WarehouseDialog buttonLabel={buttonLabel} buttonColor={buttonColor} title={title} onConfirm={onConfirm}>
            <div className='py-10'>
            <span>Are you sure you want to remove this shipping?</span>
            </div>
        </WarehouseDialog>
    );
};