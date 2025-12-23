export default function FieldError({ error, touched }) {
  if (!touched || !error) return null;
  return <div style={{ color: '#d93025', fontSize: 13 }}>{error}</div>;
}