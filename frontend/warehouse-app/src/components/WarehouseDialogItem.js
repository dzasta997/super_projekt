export default function AddEditDialogItem({
    title,
    children
}) {
    return(
        <div className='grid auto-cols-min'>
            <p className='font-thin text-sm'>{title}</p>
            {children}
          </div>
    );
};