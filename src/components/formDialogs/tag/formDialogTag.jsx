// React imports
import React, { useState } from 'react'

// Formik imports
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Redux imports
import { useDispatch } from 'react-redux'
import { addTag, updateTag } from '../../../redux/slices/tagSlice.js'

// Material UI imports
import { CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from '@mui/material'
import { BookmarkAdd, Edit } from '@mui/icons-material'

// Validator Schema imports
import { createTagValidationSchema } from '../../../utils/validationSchemas/tag.js'

// Other imports
import axios from 'axios'
import HeaderConstructor from '../../../utils/constructors/headerConstructor'

// Css imports
import styles from './formDialogTag.module.css'

export default function FormDialogTag ({ type, tagId }) {
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
      const URL = type ? '/create-tag' : '/update-tag'

      const config = HeaderConstructor()

      const response = type ? await axios.post(URL, values, config) : await axios.put(URL, { tagId, name: values.name }, config)

      type ? dispatch(addTag(response.data.body)) : dispatch(updateTag(response.data.body))

      handleClose()
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <IconButton onClick={handleClickOpen} aria-label='tag' alt='submit tag button'>
        {type ? <BookmarkAdd /> : <Edit />}
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >

        <DialogTitle id='form-dialog-title'>{type ? 'Create' : 'Update'} Tag</DialogTitle>
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
                  <label htmlFor='name'>Tag Name</label>
                  <Field type='text' id='name' name='name' />
                  <ErrorMessage name='name' component={() => (<p className={styles.error}>{errors.name}</p>)} />
                </div>

                {isSubmitting
                  ? <div className={styles.progress}><CircularProgress /> </div>
                  : <button type='submit'>{type ? 'Create' : 'Update'}</button>}
                {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  )
}