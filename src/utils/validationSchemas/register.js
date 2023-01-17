import * as yup from 'yup'

// Validation scheme used by Formik

export const registerValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is requiered'),
  email: yup
    .string()
    .email('Must be a valid email')
    .required('E-mail is requiered'),
  password: yup
    .string()
    .min(5, 'Too short!')
    .max(1000, 'Too long!')
    .required('Password is requiered'),
  passwordConfirmation: yup
    .string()
    .required('Please retype your password.')
    .oneOf([yup.ref('password')], 'Your passwords don\'t match.')
})
