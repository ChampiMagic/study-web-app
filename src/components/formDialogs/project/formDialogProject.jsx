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
import { createProjectValidationSchema } from '../../../utils/validationSchemas/project.js'

// Other imports
import axios from 'axios'
import HeaderConstructor from '../../../utils/constructors/headerConstructor'

// Css imports
import styles from './formDialogProject.module.css'

export default function FormDialogProject () {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Used to make changes to a global state
  const dispatch = useDispatch()

  // PopUp Handler
  const [open, setOpen] = useState(false)

  // Formik form initial values
  const initialValues = {
    name: '',
    tag: ''
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

      const response = await axios.post('/create-project', values, config)

      dispatch(updateUser(response.data.body.user))

      resetForm()

      handleClose()
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Button variant='outlined' color='primary' onClick={handleClickOpen}>
        Create Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >

        <DialogTitle id='form-dialog-title'>Create a Project</DialogTitle>
        <DialogContent>
          <DialogContentText>Please insert a name and tag</DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={() => createProjectValidationSchema}
            onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
          >
            {({ errors, isSubmitting }) => (
              <Form className={styles.form}>

                <div>
                  <label htmlFor='name'>Project Name</label>
                  <Field type='text' id='name' name='name' />
                  <ErrorMessage name='name' component={() => (<p className={styles.error}>{errors.name}</p>)} />
                </div>
                <div>
                  <label htmlFor='tag'>Tag</label>
                  <Field type='text' id='tag' name='tag' />
                  <ErrorMessage name='tag' component={() => (<p className={styles.error}>{errors.tag}</p>)} />
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
