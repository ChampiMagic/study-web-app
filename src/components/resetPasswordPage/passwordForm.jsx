// React imports
import React, { useState } from 'react'

// Formik imports
import { ErrorMessage, Field, Form, Formik } from 'formik'

// Material UI imports
import { CircularProgress } from '@mui/material'

// ValidatorSchemas imports
import { passwordValidationSchema } from '../../utils/validationSchemas/resetPassword'

// Css imports
import styles from './forms.module.css'

// Others
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PasswordForm ({ token }) {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')
  const navigate = useNavigate()

  // Formik form initial values
  const initialValues = {
    password: '',
    passwordConfirmation: ''
  }

  const handleSubmit = async (values, reset) => {
    setStatusMessage('')

    try {
      const response = await axios.put('/reset-password', { ...values, resetToken: token })

      reset()

      navigate('/')

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
        validationSchema={() => passwordValidationSchema}
        onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
      >
        {({ errors, isSubmitting }) => (
          <Form className={styles.form}>

            <div>
              <label htmlFor='password'>Password</label>
              <Field type='password' id='password' name='password' />
              <ErrorMessage name='password' component={() => (<p className={styles.error}>{errors.password}</p>)} />
            </div>
            <div>
              <label htmlFor='passwordConfirmation'>Password Confirmation</label>
              <Field type='password' id='passwordConfirmation' name='passwordConfirmation' />
              <ErrorMessage name='passwordConfirmation' component={() => (<p className={styles.error}>{errors.passwordConfirmation}</p>)} />
            </div>

            {isSubmitting
              ? <div className={styles.progress}><CircularProgress /> </div>
              : <button type='submit'>Reset</button>}
            {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
          </Form>
        )}
      </Formik>
    </>
  )
}
