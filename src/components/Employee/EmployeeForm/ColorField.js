export default function ColorField({ id, label, value, onChange }) {
  return (
    <div className="flex flex-col items-center">
      <label htmlFor={id} className="mb-1 ml-1 text-xs font-semibold">
        {label}
      </label>
      <input
        className="border border-slate-300 rounded flex-grow"
        type="color"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
