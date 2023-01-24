import React from "react";
import Button from "../buttons/Button";
import { buttonColor } from "../buttons/utils";

export default function AvailabilityChoice({ chosenButtonId, onButtonChosen }) {
  return (
    <div className="flex flex-row space-x-4">
      <Button
        id="locationAvailable"
        label="Available"
        color={buttonColor("locationAvailable", chosenButtonId)}
        value="locationAvailable"
        onClick={onButtonChosen}
      />
      <Button
        id="locationNotAvailable"
        label="Not available"
        color={buttonColor("locationNotAvailable", chosenButtonId)}
        value="locationNotAvailable"
        onClick={onButtonChosen}
      />
    </div>
  );
}
