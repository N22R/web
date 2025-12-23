export default function NumberInput({ label, name, value, onChange, onBlur }) {
  return (
    <label style={{ display: 'block', marginBottom: 12 }}>
      <span>{label}</span>
      <input type="number" name={name} value={value} onChange={onChange} onBlur={onBlur} style={{ width: '100%', padding: 10 }} />
    </label>
  );
}