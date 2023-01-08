export default function TextInputField({ id, label, setState }) {
  // to define width wrap component in div and use "flex w-x" to style
  return (
      <input
        type="text"
        id={id}
        onChange={setState}
        placeholder={label}
        className="appearance-none border border-gray-700 rounded-full w-full py-2 px-4"
        required
      />
  );
}
