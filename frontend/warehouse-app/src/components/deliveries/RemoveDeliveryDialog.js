import WarehouseDialog from '../WarehouseDialog';

export default function RemoveDeliveryDialog({
    buttonLabel,
    buttonColor,
    title, 
    onConfirm
}) {
    return (
        <WarehouseDialog buttonLabel={buttonLabel} buttonColor={buttonColor} title={title} onConfirm={onConfirm}>
            <div className='py-10'>
            <span>Are you sure you want to remove this item?</span>
            </div>
        </WarehouseDialog>
    );
};