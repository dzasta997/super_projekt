export default function TextInputField({ id, label, value, type="text", onValueChange }) {
  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onValueChange}
      placeholder={label}
      className="appearance-none border border-gray-700 rounded-full w-100 py-2 px-4"
      required
    />
  );
}
