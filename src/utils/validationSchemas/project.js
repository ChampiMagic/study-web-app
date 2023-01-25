import * as yup from 'yup'

// Validation scheme used by Formik

export const createProjectValidationSchema = yup.object().shape({
  name: yup
    .string()
    .max(1000, 'Too long!')
    .required('name is requiered'),
  tag: yup
    .string()
    .required('Tag is requiered')
})
