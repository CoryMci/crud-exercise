export default function TextInputField({ id, label, value, error, onChange }) {
  return (
    <div className="flex flex-col">
      <div className="flex mb-1 ml-1 text-xs font-semibold">
        <label htmlFor={id}>{label}</label>
        <div className="text-red-600 ml-8">{error}</div>
      </div>
      <input
        className="border border-slate-300 rounded w-full p-2"
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
