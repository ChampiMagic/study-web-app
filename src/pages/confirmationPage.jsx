// React imports
import React, { useState } from 'react'

// Css imports
import styles from './styles/confirmationPage.module.css'

// Others
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { CircularProgress } from '@mui/material'
import { emailValidationSchema } from '../utils/validationSchemas/resetPassword'

export default function ConfirmationPage () {
  const { error } = useParams()

  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Formik form initial values
  const initialValues = {
    email: ''
  }

  const handleSubmit = async (values, reset) => {
    setStatusMessage('')

    try {
      const response = await axios.put('/confirmationSender', values)

      setStatusMessage(response.data.message)
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <div className={styles.high_container}>
      <div className={styles.form_container}>

        {error === 'true' && <h4>Something Went Wrong. Please try again</h4>}

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

      </div>
    </div>
  )
}
