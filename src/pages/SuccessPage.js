import PrimaryButton from '../components/PrimaryButton';
import { useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 720, margin: '40px auto', textAlign: 'center' }}>
      <h1 style={{ color: '#1a73e8' }}>Замовлення оформлено!</h1>
      <p>Дякуємо за замовлення. Підтвердження надіслано на email.</p>
      <PrimaryButton onClick={() => navigate('/catalog')}>Назад до каталогу</PrimaryButton>
    </div>
  );
}