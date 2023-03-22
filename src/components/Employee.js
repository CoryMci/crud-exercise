export default function Employee({ employee }) {
  return (
    <div>
      {Object.keys(employee).map((key) => (
        <span key={key}>
          {key}:{employee[key]}
        </span>
      ))}
    </div>
  );
}
