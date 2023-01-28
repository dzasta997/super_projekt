import React from "react";

export default function ItemsDropdown({items, onValueChange}) {
    return (
        <select className="w-full py-2 px-4 text-gray-500 bg-white border-r-8 border-y-2 border-white rounded-full shadow-sm outline-none focus:border-indigo-600">
            {items.map(item => {
                return <option value={item.id} onChange={onValueChange}>{item.name}</option>
            })};
        </select>
    );
};