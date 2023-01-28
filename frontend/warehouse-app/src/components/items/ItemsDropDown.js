import React from "react";

export default function ItemsDropdown({items, chosenValueIndex, onValueChange}) {
    return (
        <select 
        onChange={onValueChange}
        className="w-full py-2 px-4 text-gray-500 bg-white border-r-8 border-y-2 border-white rounded-full shadow-sm outline-none focus:border-indigo-600">
            {items.map((item, index) => {
                if (index === chosenValueIndex) {
                    return <option key={index} value={index} selected>{item.name}</option>
                } else {
                    return <option key={index} value={index}>{item.name}</option>
                }
            })};
        </select>
    );
};