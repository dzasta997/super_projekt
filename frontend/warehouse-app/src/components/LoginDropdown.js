import React from "react";

export default function LoginDropdown({onRoleChange}) {
    return (
        <select className="w-full py-2 px-4 text-gray-500 bg-white border-r-8 border-y-2 border-white rounded-full shadow-sm outline-none focus:border-indigo-600">
            <option value="EMPLOYEE" onChange={onRoleChange}>Employee </option>
            <option value="MANAGER" onChange={onRoleChange}>Manager</option>
            <option value="ADMIN" onChange={onRoleChange}>Admin</option>
        </select>
    );
}