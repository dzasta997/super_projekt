import { useState, useEffect } from "react";
import ActionsHistoryElement from "./ActionsHistoryElement";

export default function RecentActions({ recent, type }) {
  return (
    <div className="flex flex-col gap-4">
      {recent.map((action) => (
        <div key={action.id}>
          <ActionsHistoryElement
            type={type}
            id={action.id}
            date={type == "shipping" ? action.orderDate : action.deliveryDate}
          />
        </div>
      ))}
    </div>
  );
}
