import './ErrorsSummary.css';

export default function ErrorsSummary({ errors }) {
  const keys = Object.keys(errors || {});
  if (keys.length === 0) return null;

  return (
    <div className="errors-summary">
      <strong>Виправ помилки:</strong>
      <ul>
        {keys.map((k) => (
          <li key={k}>{errors[k]}</li>
        ))}
      </ul>
    </div>
  );
}