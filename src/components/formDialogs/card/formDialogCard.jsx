// React imports
import React, { useState } from 'react'

// Formik imports
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Material UI imports
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

// Validator Schema imports
import { createCardValidationSchema } from '../../../utils/validationSchemas/card.js'

// Other imports
import axios from 'axios'
import HeaderConstructor from '../../../utils/constructors/headerConstructor'

// Css imports
import styles from './formDialogCard.module.css'

// React Router imports
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCard } from '../../../redux/slices/cardSlice.js'
import { changeSelectedProject } from '../../../redux/slices/projectSlice.js'

export default function FormDialogProject () {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Used to make changes to a global state
  const { projectId } = useParams()

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
    setStatusMessage('')
  }

  function handleClickOpen () {
    setOpen(true)
  }

  const handleSubmit = async (values, resetForm) => {
    try {
      const config = HeaderConstructor()
      const regexForReplace = /^¿(.*)\?$/
      const questionRegexForValidate = /^¿.*\?$/

      if (!questionRegexForValidate.test(values.question)) {
        setStatusMessage('No has escrito bien la pregunta')
        return null
      }

      const question = values.question.replace(regexForReplace, '$1')
      values.question = question
      const response = await axios.post('/create-card', { ...values, projectId }, config)

      dispatch(addCard(response.data.body))
      dispatch(changeSelectedProject(response.data.body))

      handleClose()
    } catch (error) {
      if (error.response.data.message) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Button
        variant='outlined' sx={{
          backgroundColor: '#64CCDA',
          color: '#FAFAFA',
          borderColor: '#52dedb',
          height: '3rem',
          fontWeight: 'bold',
          ':hover': {
            backgroundColor: '#fff',
            color: '#1c1c1c',
            borderColor: '#1c1c1c'
          }
        }} onClick={handleClickOpen}
      >
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
