export default function TextInputField({ id, label, setState }) {
  return (
      <input
        type="text"
        id={id}
        onChange={setState}
        placeholder={label}
        className="appearance-none border border-gray-700 rounded-full w-100 py-2 px-4"
        required
      />
  );
}
