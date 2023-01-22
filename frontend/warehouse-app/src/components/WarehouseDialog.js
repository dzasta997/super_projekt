import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from './Button';

export default function WarehouseDialog({
    buttonLabel,
    buttonColor="blue",
    title,
    onConfirm,
    children
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        <Button label={buttonLabel} color={buttonColor} onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose} maxWidth='md'>
            <div className="py-6 px-8 flex flex-col">
                <h3 className='text-3xl pb-2'>{title}</h3>
                {children}
                <div className='w-full grid grid-flow-row place-items-end'>
                    <div className='flex flex-row gap-4 pt-5'>
                    <Button label="Cancel" color="white" onClick={handleClose} />
                    <Button label="Confirm" color="blue"onClick={() => {
                        handleClose()
                        onConfirm()
                    }} />
                    </div>
                </div>
            </div>
        </Dialog>
        </div>
    );
}