import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import { clearCart } from '../redux/cartActions';

import TextInput from '../components/TextInput';
import NumberInput from '../components/NumberInput';
import PrimaryButton from '../components/PrimaryButton';
import FieldError from '../components/FieldError';
import ErrorsSummary from '../components/ErrorsSummary';

const validationSchema = Yup.object({
  firstName: Yup.string()
    .matches(/^[A-Za-zА-Яа-яІіЇїЄє'-]{2,}$/, 'Імʼя: лише літери, мінімум 2 символи.')
    .required('Імʼя є обовʼязковим.'),
  lastName: Yup.string()
    .matches(/^[A-Za-zА-Яа-яІіЇїЄє'-]{2,}$/, 'Прізвище: лише літери, мінімум 2 символи.')
    .required('Прізвище є обовʼязковим.'),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'Email має містити мінімум 2 символи після крапки.')
    .required('Email є обовʼязковим.'),
  phone: Yup.string()
    .matches(/^\+380\d{9}$/, 'Телефон має бути у форматі +380XXXXXXXXX (9 цифр після +380).')
    .required('Телефон є обовʼязковим.'),
  address: Yup.string()
    .min(5, 'Адреса: мінімум 5 символів.')
    .required('Адреса є обовʼязковою.'),
  city: Yup.string()
    .matches(/^[A-Za-zА-Яа-яІіЇїЄє\s-]{2,}$/, 'Місто: лише літери, мінімум 2 символи.')
    .required('Місто є обовʼязковим.'),
  postalCode: Yup.string()
    .matches(/^\d{5}$/, 'Індекс: рівно 5 цифр.')
    .required('Поштовий індекс є обовʼязковим.'),
  apartment: Yup.number()
    .typeError('Квартира: має бути числом.')
    .integer('Квартира: лише ціле число.')
    .min(1)
    .max(9999)
    .notRequired()
});

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const initialValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+380',
    address: '',
    city: '',
    postalCode: '',
    apartment: ''
  };

  return (
    <div style={{ maxWidth: 720, margin: '30px auto', padding: '0 16px' }}>
      <h1>Оформлення замовлення</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
          dispatch(clearCart());  
          navigate('/success');    
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <ErrorsSummary errors={errors} />

            <TextInput
              label="Імʼя"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.firstName} touched={touched.firstName} />

            <TextInput
              label="Прізвище"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.lastName} touched={touched.lastName} />

            <TextInput
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.email} touched={touched.email} />

            <TextInput
              label="Номер телефону"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+380XXXXXXXXX"
            />
            <FieldError error={errors.phone} touched={touched.phone} />

            <TextInput
              label="Адреса"
              name="address"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.address} touched={touched.address} />

            <TextInput
              label="Місто"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.city} touched={touched.city} />

            <TextInput
              label="Індекс"
              name="postalCode"
              value={values.postalCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.postalCode} touched={touched.postalCode} />

            <NumberInput
              label="Квартира (необовʼязково)"
              name="apartment"
              value={values.apartment}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FieldError error={errors.apartment} touched={touched.apartment} />

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
              <PrimaryButton type="submit">
                Підтвердити замовлення
              </PrimaryButton>

              <PrimaryButton type="button" onClick={() => navigate('/cart')}>
                Назад до кошика
              </PrimaryButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
