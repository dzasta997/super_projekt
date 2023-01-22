export default function TextInputField({ id, label, value, width="w-[200px]", type="text", onValueChange }) {
  return (
    <div className={width}>
    <input
      type={type}
      id={id}
      value={value}
      onChange={onValueChange}
      placeholder={label}
      className="appearance-none border border-gray-700 rounded-full w-full object-contain py-2 px-4"
      required
    />
    </div>
  );
}