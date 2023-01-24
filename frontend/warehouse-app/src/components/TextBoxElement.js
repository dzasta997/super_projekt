export default function TextBoxElement({ label, data }) {
    return (
      <div key={label} className="text-box-element">
        <h1 className="text-[15px] -mb-2 font-extralight">{label}</h1>
        <p className="text-[20px]">{data}</p>
      </div>
    );
  }
  