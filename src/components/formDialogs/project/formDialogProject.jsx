// React imports
import React, { useState } from 'react'

// Formik imports
import { Formik, Form, Field, ErrorMessage } from 'formik'

// Redux imports
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../../../redux/slices/projectSlice'

// MUI imports
import { Button, CircularProgress, Dialog, DialogContent, DialogContentText, DialogTitle, MenuItem, TextField } from '@mui/material'

// Validator Schema imports
import { createProjectValidationSchema } from '../../../utils/validationSchemas/project.js'

// Components imports
import FormDialogTag from '../tag/formDialogTag'

// Other imports
import axios from 'axios'
import HeaderConstructor from '../../../utils/constructors/headerConstructor'

// Css imports
import styles from './formDialogProject.module.css'

export default function FormDialogProject () {
  // State used to render error messages from the backend
  const [statusMessage, setStatusMessage] = useState('')

  const tags = useSelector(state => state.tagController.tags)

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

      dispatch(addProject(response.data.body))

      handleClose()
    } catch (error) {
      console.log('ERROR')
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Button
        variant='outlined' onClick={handleClickOpen} sx={{
          backgroundColor: '#64CCDA',
          color: '#FAFAFA',
          borderColor: '#52dedb',
          ':hover': {
            backgroundColor: '#fff',
            color: '#1c1c1c',
            borderColor: '#1c1c1c',
            boxShadow: '2px 1px 19px 2px rgba(255,255,255,1)'
          }
        }}
      >
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
            {({ errors, isSubmitting, handleChange }) => (
              <Form className={styles.form}>

                <div>
                  <label htmlFor='name'>Project Name</label>
                  <Field type='text' id='name' name='name' />
                  <ErrorMessage name='name' component={() => (<p className={styles.error}>{errors.name}</p>)} />
                </div>
                <div>
                  <TextField
                    id='tag'
                    name='tag'
                    select
                    label='Select'
                    defaultValue=''
                    helperText='Please select one tag'
                    onChange={handleChange}
                  >

                    {tags.map((tag) => (
                      <MenuItem key={tag._id} value={tag._id}>
                        {tag.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  <FormDialogTag type={1} />
                </div>
                <ErrorMessage name='tag' component={() => (<p className={styles.error}>{errors.tag}</p>)} />

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
