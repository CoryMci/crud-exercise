export default function Checkbox({ id, label, value, onChange }) {
  return (
    <div className="flex flex-col justify-center gap-2">
      <label
        htmlFor={id}
        className="inline-flex items-center text-xs font-semibold"
      >
        {label}
      </label>
      <input
        className="flex grow"
        type="checkbox"
        name="assigned"
        checked={value}
        onChange={onChange}
      ></input>
    </div>
  );
}
