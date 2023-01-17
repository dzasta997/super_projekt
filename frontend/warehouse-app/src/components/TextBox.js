function TextBoxElement({ label, data }) {
  return (
    <div key={label} className="text-box-element">
      <h1 className="text-[15px] -mb-2 font-extralight">{label}</h1>
      <p className="text-[20px]">{data}</p>
    </div>
  );
}

export default function TextBox({
  assignedTo,
  plannedDate,
  status,
  address,
  products,
}) {
  return (
    <div className="primary-bg">
      <div className="w-100 py-6 px-6 flex">
        <div className="delivery-text-field-column">
          <TextBoxElement label="Assigned to" data={assignedTo} />
          <TextBoxElement label="Planned date of delivery" data={plannedDate} />
          <TextBoxElement label="Status" data={status} />
        </div>
        <div className="delivery-text-field-column">
          <div className="text-box-element">
            <h1 className="text-[15px] -mb-2 font-extralight">Contact</h1>
            <p className="text-[20px]">{address.recipientName}</p>
            <p className="text-[20px]">{address.phoneNumber}</p>
          </div>
          <TextBoxElement label="Street" data={address.street} />
          <TextBoxElement label="Postal code" data={address.postalCode} />
          <TextBoxElement label="City" data={address.city} />
        </div>
        <div className="delivery-text-field-column">
          {products.map((product) => (
            <TextBoxElement
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
