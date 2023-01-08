function DeliveryTextBoxElement({ label, data }) {
  return (
    <div key={label} className="-mb-1">
      <h1 className="text-[15px] -mb-2 font-extralight">{label}</h1>
      <p className="text-[20px]">{data}</p>
    </div>
  );
}

export default function DeliveryTextBox({
  assignedTo,
  plannedDate,
  status,
  address,
  products,
}) {
  return (
    <div className="rounded-[24px] bg-primaryGrey">
      <div className="w-100 py-6 px-6 flex">
        <div className="delivery-text-field-column">
          <DeliveryTextBoxElement label="Assigned to" data={assignedTo} />
          <DeliveryTextBoxElement
            label="Planned date of delivery"
            data={plannedDate}
          />
          <DeliveryTextBoxElement label="Status" data={status} />
        </div>
        <div className="delivery-text-field-column">
          <DeliveryTextBoxElement label="Street" data={address.street} />
          <DeliveryTextBoxElement
            label="Postal code"
            data={address.postalCode}
          />
          <DeliveryTextBoxElement label="City" data={address.city} />
          <DeliveryTextBoxElement label="Phone number" data={address.phoneNumber} />
        </div>
        <div className="delivery-text-field-column">
          {products.map((product) => (
            <DeliveryTextBoxElement
              key={product.id}
              label={`ID:${product.id}`}
              data={`${product.quantity} ${product.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
