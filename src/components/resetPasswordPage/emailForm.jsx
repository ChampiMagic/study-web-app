// React imports
import React, { useState } from 'react'

// Formik imports
import { ErrorMessage, Field, Form, Formik } from 'formik'

// Material UI imports
import { CircularProgress } from '@mui/material'

// ValidatorSchemas imports
import { emailValidationSchema } from '../../utils/validationSchemas/resetPassword'

// Css imports
import styles from './forms.module.css'

// Others
import axios from 'axios'

export default function EmailForm () {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Formik form initial values
  const initialValues = {
    email: ''
  }

  const handleSubmit = async (values, reset) => {
    setStatusMessage('')

    try {
      const response = await axios.put('/forgot-password', values)

      setStatusMessage(response.data.body.message)
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={() => emailValidationSchema}
        onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
      >
        {({ errors, isSubmitting }) => (
          <Form className={styles.form}>

            <div>
              <label htmlFor='email'>E-mail</label>
              <Field type='text' id='email' name='email' autoComplete='off' />
              <ErrorMessage name='email' component={() => (<p className={styles.error}>{errors.email}</p>)} />
            </div>

            {isSubmitting
              ? <div className={styles.progress}><CircularProgress /> </div>
              : <button type='submit'>Send</button>}
            {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
          </Form>
        )}
      </Formik>
    </>
  )
}
