import * as yup from 'yup'

// Validation scheme used by Formik

export const loginValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username is requiered'),
  password: yup
    .string()
    .min(5, 'Too short!')
    .max(1000, 'Too long!')
    .required('Password is requiered')
})
