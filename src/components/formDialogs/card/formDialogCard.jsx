// React imports
import React, { useState } from 'react'

// Formik imports
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Redux imports
import { useDispatch } from 'react-redux'
import { updateUser } from '../../../redux/slices/userSlice'

// Material UI imports
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

// Validator Schema imports
import { createCardValidationSchema } from '../../../utils/validationSchemas/card.js'

// Other imports
import axios from 'axios'
import HeaderConstructor from '../../../utils/constructors/headerConstructor'

// Css imports
import styles from './formDialogCard.module.css'

export default function FormDialogProject ({ projectId }) {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Used to make changes to a global state
  const dispatch = useDispatch()

  // PopUp Handler
  const [open, setOpen] = useState(false)

  // Formik form initial values
  const initialValues = {
    question: '',
    answer: ''
  }

  function handleClose () {
    setOpen(false)
  }

  function handleClickOpen () {
    setOpen(true)
  }

  const handleSubmit = async (values, resetForm) => {
    try {
      const config = HeaderConstructor()

      const response = await axios.post('/create-card', { ...values, projectId }, config)

      dispatch(updateUser(response.data.body.user))

      resetForm()

      handleClose()
    } catch (error) {
      if (error.response.data.message) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Create Card
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >

        <DialogTitle id='form-dialog-title'>Create a Question Card</DialogTitle>
        <DialogContent>
          <DialogContentText>Please write a question and answer</DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={() => createCardValidationSchema}
            onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
          >
            {({ errors, isSubmitting }) => (
              <Form className={styles.form}>

                <div>
                  <label htmlFor='question'>Card Question</label>
                  <Field type='text' id='question' name='question' />
                  <ErrorMessage name='question' component={() => (<p className={styles.error}>{errors.question}</p>)} />
                </div>
                <div>
                  <label htmlFor='answer'>Card Answer</label>
                  <Field type='text' id='answer' name='answer' />
                  <ErrorMessage name='answer' component={() => (<p className={styles.error}>{errors.answer}</p>)} />
                </div>

                {isSubmitting
                  ? <div className={styles.progress}><CircularProgress /> </div>
                  : <button type='submit'>Create</button>}
                {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}
