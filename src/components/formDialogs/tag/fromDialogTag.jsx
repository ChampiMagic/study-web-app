// React imports
import React, { useState } from 'react'

// Formik imports
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Redux imports
import { useDispatch } from 'react-redux'
import { updateTags } from '../../../redux/slices/tagSlice.js'

// Material UI imports
import { CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'

// Validator Schema imports
import { createTagValidationSchema } from '../../../utils/validationSchemas/tag.js'

// Other imports
import axios from 'axios'
import HeaderConstructor from '../../../utils/constructors/headerConstructor'

// Css imports
import styles from './formDialogTag.module.css'
import { BookmarkAdd } from '@mui/icons-material'

export default function FormDialogTag () {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  // Used to make changes to a global state
  const dispatch = useDispatch()

  // PopUp Handler
  const [open, setOpen] = useState(false)

  // Formik form initial values
  const initialValues = {
    name: ''
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

      const response = await axios.post('/create-tag', values, config)

      dispatch(updateTags({ tags: [response.data.body.tag] }))

      resetForm()

      handleClose()
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label='create-tag' alt='create tag button'>
        <BookmarkAdd />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >

        <DialogTitle id='form-dialog-title'>Create a Tag</DialogTitle>
        <DialogContent>
          <DialogContentText>Please insert a name</DialogContentText>
          <Formik
            initialValues={initialValues}
            validationSchema={() => createTagValidationSchema}
            onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
          >
            {({ errors, isSubmitting }) => (
              <Form className={styles.form}>

                <div>
                  <label htmlFor='name'>Project Name</label>
                  <Field type='text' id='name' name='name' />
                  <ErrorMessage name='name' component={() => (<p className={styles.error}>{errors.name}</p>)} />
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
