import * as yup from 'yup'

// Validation scheme used by Formik

export const createTagValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(1000, 'Too long!')
    .required('name is requiered')
})
