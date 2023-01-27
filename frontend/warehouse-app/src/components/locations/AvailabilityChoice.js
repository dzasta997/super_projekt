import React from "react";
import Button from "../buttons/Button";
import { buttonColor } from "../buttons/utils";

export default function AvailabilityChoice({ chosenButtonId, onButtonChosen }) {
  return (
    <div className="flex flex-row space-x-4">
      <Button
        id={1}
        label="Available"
        color={buttonColor(1, chosenButtonId)}
        value={1}
        onClick={onButtonChosen}
      />
      <Button
        id={0}
        label="Not available"
        color={buttonColor(0, chosenButtonId)}
        value={0}
        onClick={onButtonChosen}
      />
    </div>
  );
}
