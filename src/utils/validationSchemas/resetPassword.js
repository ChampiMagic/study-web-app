import * as yup from 'yup'

// Validation scheme used by Formik

export const emailValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please insert a valid email')
    .required('E-mail is requiered')
})

export const passwordValidationSchema = yup.object().shape({
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
