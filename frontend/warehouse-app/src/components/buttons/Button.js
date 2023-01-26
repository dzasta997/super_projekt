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

function buttonStyle(color) {
    switch(color) {
        case "blue": 
            return "bg-buttonPrimary active:bg-buttonSecondary py-2 px-8 rounded-full text-white font-normal text-base transition duration-150 ease-in-out";
        case "gray": 
            return "bg-primaryGrey active:bg-darkGray py-2 px-8 rounded-full font-normal text-base transition duration-150 ease-in-out";
        case "white": 
            return "bg-white active:bg-primaryGrey border border-darkGray py-2 px-8 rounded-full font-normal text-base transition duration-150 ease-in-out";
        case "transparent": 
            return "bg-transparent active:bg-primaryGrey border border-white py-2 px-8 rounded-full text-white text-base font-normal transition duration-150 ease-in-out";
    };
}

const Button = ({
    id,
    label,
    color="blue",
    type="button",
    value,
    onClick
}) => {
    return (
        <button
        id={id}
        value={value}
        type={type}
        onClick={onClick}
        className={buttonStyle(color)}>
            {label}
        </button>
    );
}

export default Button