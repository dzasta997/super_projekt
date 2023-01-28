import TextBoxElement from "./TextBoxElement";

export default function ShippingDeliveryTextBox({
  title,
  id,
  assignedTo,
  plannedDate,
  status,
  recipientName,
  phoneNumber,
  address={
    street: "",
    number: 0,
    city: "",
    zipcode: ""
  },
  products=[
    {
      item: {
        code: 0,
        name: ""
      },
      quantity: 0,
    }
  ],
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
            <p className="text-[20px]">{recipientName}</p>
            <p className="text-[20px]">{phoneNumber}</p>
          </div>
          <TextBoxElement label="Street" data={`${address.street} ${address.number}`} />
          <TextBoxElement label="Postal code" data={address.zipcode} />
          <TextBoxElement label="City" data={address.city} />
        </div>
        <div className="text-box-column">
          {products.map((product, index) => (
            <TextBoxElement
              key={index}
              label={`ID:${product.item.code}`}
              data={`${product.quantity} ${product.item.name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
