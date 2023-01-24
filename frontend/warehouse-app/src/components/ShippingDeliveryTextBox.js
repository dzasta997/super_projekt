import TextBoxElement from "./TextBoxElement";

export default function ShippingDeliveryTextBox({
  title,
  id,
  assignedTo,
  plannedDate,
  status,
  address,
  products,
}) {
  return (
    <div className="primary-bg">
      <div className="text-box-container w-100">
        <div className="text-box-column">
          <TextBoxElement label="Assigned to" data={assignedTo} />
          <TextBoxElement label="Planned date of delivery" data={plannedDate} />
          <TextBoxElement label="Status" data={status} />
        </div>
        <div className="text-box-column">
          <div className="text-box-element">
            <h1 className="text-[15px] -mb-2 font-extralight">Contact</h1>
            <p className="text-[20px]">{address.recipientName}</p>
            <p className="text-[20px]">{address.phoneNumber}</p>
          </div>
          <TextBoxElement label="Street" data={`${address.street} ${address.number}`} />
          <TextBoxElement label="Postal code" data={address.postalCode} />
          <TextBoxElement label="City" data={address.city} />
        </div>
        <div className="text-box-column">
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
