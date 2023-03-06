// React imports
import React, { useState } from 'react'

// Redux imports
import { useNavigate } from 'react-router-dom'

// Formik imports
import { ErrorMessage, Field, Form, Formik } from 'formik'

// Material UI imports
import { Button, CircularProgress } from '@mui/material'

// ValidatorSchemas imports
import { registerValidationSchema } from '../../utils/validationSchemas/register.js'

// Css imports
import styles from './auth.module.css'

// Others
import axios from 'axios'

export default function Register () {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Used to redirect the user
  const navigate = useNavigate()

  // Formik form initial values
  const initialValues = {
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  }

  const handleSubmit = async (values, reset) => {
    setStatusMessage('')

    try {
      const response = await axios.post('/register', { username: values.username, password: values.password, email: values.email })

      reset()

      setStatusMessage(response.data.message)
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={() => registerValidationSchema}
        onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
      >
        {({ errors, isSubmitting }) => (
          <Form className={styles.form}>
            <div>
              <label htmlFor='username'>Username</label>
              <Field type='text' id='username' name='username' autoComplete='off' />
              <ErrorMessage name='username' component={() => (<p className={styles.error}>{errors.username}</p>)} />
            </div>
            <div>
              <label htmlFor='email'>E-mail</label>
              <Field type='text' id='email' name='email' autoComplete='off' />
              <ErrorMessage name='email' component={() => (<p className={styles.error}>{errors.email}</p>)} />
            </div>
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

            <Button onClick={() => navigate('/reset-password')}>
              Forgot Password
            </Button>

            {isSubmitting
              ? <div className={styles.progress}><CircularProgress /> </div>
              : <button type='submit'>Register</button>}
            {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
          </Form>
        )}
      </Formik>
    </>
  )
}
