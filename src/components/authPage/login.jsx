// React imports
import React, { useState } from 'react'

// Redux imports
import { useDispatch } from 'react-redux'
import { saveUser } from '../../redux/slices/userSlice.js'

// Formik imports
import { ErrorMessage, Field, Form, Formik } from 'formik'

// Material UI imports
import { CircularProgress } from '@mui/material'

// ValidatorSchemas imports
import { loginValidationSchema } from '../../utils/validationSchemas/login.js'

// Css imports
import styles from './auth.module.css'

// Others
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login () {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Used to redirect the user
  const navigate = useNavigate()

  // Used to make changes to a global state
  const dispatch = useDispatch()

  // Formik form initial values
  const initialValues = {
    username: '',
    password: ''
  }

  const handleSubmit = async (values, reset) => {
    setStatusMessage('')

    try {
      const response = await axios.post('/login', values)

      // eslint-disable-next-line no-undef
      localStorage.setItem('token', response.data.body.token)

      dispatch(saveUser(response.data.body.user))

      reset()

      navigate('/home')
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={() => loginValidationSchema}
        onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
      >
        {({ errors, isSubmitting }) => (
          <Form className={styles.form}>

            <div>
              <label htmlFor='username'>Username</label>
              <Field type='text' id='username' name='username' />
              <ErrorMessage name='username' component={() => (<p className={styles.error}>{errors.username}</p>)} />
            </div>
            <div>
              <label htmlFor='password'>Password</label>
              <Field type='password' id='password' name='password' />
              <ErrorMessage name='password' component={() => (<p className={styles.error}>{errors.password}</p>)} />
            </div>

            {isSubmitting
              ? <div className={styles.progress}><CircularProgress /> </div>
              : <button type='submit'>Login</button>}
            {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
          </Form>
        )}
      </Formik>
    </>
  )
}
