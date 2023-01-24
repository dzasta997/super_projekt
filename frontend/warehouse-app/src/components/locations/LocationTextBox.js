import TextBoxElement from "../TextBoxElement";

export default function LocationTextBox({
  warehouseId,
  rack,
  alley,
  availability,
  capacity,
  description,
}) {
  return (
    <div className="primary-bg">
      <div className="text-box-container w-100">
        <div className="text-box-column">
          <TextBoxElement label="Warehouse ID" data={warehouseId} />
          <TextBoxElement label="Rack" data={rack} />
          <TextBoxElement label="Alley" data={alley} />
        </div>
        <div className="text-box-column">
          <TextBoxElement label="Availability" data={availability} />
          <TextBoxElement label="Capacity" data={capacity} />
          <TextBoxElement label="Description" data={description} />
        </div>
      </div>
    </div>
  );
}
