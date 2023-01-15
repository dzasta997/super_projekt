/**
 * A button with an icon and the beginning.
 * @param {string} label - text in the button.
 * @param {Component} Icon - icon as a React Component.
 * @param {string} type - the type of button, default is just 'button'.
 * @param {function} OnClick - the function called when button is clicked.
 * @returns an IconButton component.
 */
export default function IconButton({
    label,
    Icon,
    type="button",
    onClick
}) {
    return (
        <button
        type={type}
        onClick={onClick}
        className={"bg-primaryGrey active:bg-darkGray py-3 px-5 rounded-full font-normal text-base transition duration-150 ease-in-out"}>
            <div className="flex flex-row justify-center">
                <div className="pr-2"><Icon/></div>
            {label}
            </div>
        </button>
    );
}