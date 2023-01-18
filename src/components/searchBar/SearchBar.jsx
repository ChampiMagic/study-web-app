// react imports
import { React, useState } from 'react'

// @mui imports
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'

// Css import
import styles from './searchBar.module.css'

// Formik imports
import { Field, Form, Formik } from 'formik'

// axios import
import axios from 'axios'
import HeaderConstructor from '../../utils/constructors/headerConstructor'

export default function SearchBar ({ isProjectSearchBar }) {
  const [statusMessage, setStatusMessage] = useState('')

  const initialValue = {
    searchValue: ''
  }

  const handleSubmit = async ({ searchValue }, reset) => {
    try {
      const myHeader = HeaderConstructor()
      const URL = isProjectSearchBar
        ? 'proyectsByName with params route here'
        : 'cardsByName with params route here' // TODO!!
      const response = await axios.get(URL, myHeader)
      console.log(response)
      // TODO Send response to searchBar globalState here!
      reset()
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValue}
        onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
      >
        <Form className={styles.searchBar}>
          <div>
            <Field
              type='text'
              id='searchValue'
              name='searchValue'
              label='SearchBar'
              placeholder='Search Here!'
            />
          </div>
          <IconButton aria-label='search' type='submit' alt='searchBar logo'>
            <SearchIcon />
          </IconButton>
          {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
        </Form>
      </Formik>
    </>
  )
}
