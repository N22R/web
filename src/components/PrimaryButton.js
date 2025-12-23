export default function PrimaryButton({ children, ...props }) {
  return (
    <button {...props} style={{ padding: '10px 16px', backgroundColor: '#1a73e8', color: '#fff', border: 'none', borderRadius: 6 }}>
      {children}
    </button>
  );
}