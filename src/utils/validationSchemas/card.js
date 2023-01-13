import * as yup from 'yup'

// Validation scheme used by Formik

export const createCardValidationSchema = yup.object().shape({
  question: yup
    .string()
    .max(1500, 'Too long!')
    .required('Question is requiered'),
  answer: yup
    .string()
    .max(1500, 'Too long!')
    .required('Answer is requiered')
})
