/**
 * A button component. 
 * There are 3 color versions of the button.
 * The available colors are: blue, gray and white.
 * To use them, pass them to the 'color' param.
 * @param {string} label - the text in the button 
 * @param {string} color - the color of the button. Can be either: 'blue', 'trasnparent' or 'gray'. Default is 'blue'.
 * @param {function} onClick - the function which activates when button is clicked.
 * @param {string} type - the type of button, default is just 'button'.
 * @returns a Button component.
 */
const Button = ({
    label,
    color="blue",
    type="button",
    onClick
}) => {
    switch(color) {
        case "blue": 
            return (
                <button
                type={type}
                onClick={onClick}
                className={"bg-buttonPrimary active:bg-primaryBlue py-3 px-6 rounded-full text-white font-normal text-base transition duration-150 ease-in-out"}>
                    {label}
                </button>
            )
        case "gray": 
            return (
                <button
                type={type}
                onClick={onClick}
                className={"bg-primaryGrey active:bg-darkGray py-3 px-6 rounded-full font-normal text-base transition duration-150 ease-in-out"}>
                    {label}
                </button>
            )
        case "white": 
            return (
                <button
                type={type}
                onClick={onClick}
                className={"bg-white active:bg-primaryGrey border border-darkGray py-3 px-6 rounded-full font-normal text-base transition duration-150 ease-in-out"}>
                    {label}
                </button>
            )
        case "transparent": 
            return (
                <button
                type={type}
                onClick={onClick}
                className={"bg-transparent active:bg-primaryGrey border border-white py-3 px-6 rounded-full text-white text-base font-normal transition duration-150 ease-in-out"}>
                    {label}
                </button>
            )
    };
}

export default Button