import TextBoxElement from "../TextBoxElement";

export default function WarehouseTextBox({
    name,
    street,
    streetNumber,
    zipCode,
    city,
    description
}) {
  return (
    <div className="primary-bg">
      <div className="text-box-container w-100">
        <div className="text-box-column">
          <TextBoxElement label="Name" data={name} />
          <TextBoxElement label="Description" data={description} />
        </div>
        <div className="text-box-column">
          <TextBoxElement label="Street" data={street} />
          <TextBoxElement label="Street number" data={streetNumber}/>
          <TextBoxElement label="Zip code" data={zipCode}/>
          <TextBoxElement label="City" data={city}/>
          
        </div>
      </div>
    </div>
  );
}
