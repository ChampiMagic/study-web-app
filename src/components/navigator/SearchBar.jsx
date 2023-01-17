// react imports
import { React, useState } from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles'

// Assets imports
import searchIcon from '../../assets/bx-search.svg'

// Css imports
import styles from './navigator.module.css'

// Formik imports
import { Field, Form, Formik } from 'formik'

// axios import
import axios from 'axios'

export default function SearchBar ({ isProjectSearchBar }) {
  const [statusMessage, setStatusMessage] = useState('')

  const initialValue = {
    searchValue: ''
  }

  const handleSubmit = async ({ searchValue }, reset) => {
    try {
      const response = isProjectSearchBar
        ? await axios.get('/projectsByName', {
          params: {
            name: searchValue
          }
        })
        : await axios.get('/cardsByName', {
          params: {
            name: searchValue
          }
        })
      reset()
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  const theme = createTheme({
    components: {
      TextField: {
        stylesOverrides: {
          root: {
            color: 'white'
          }
        }
      }
    }
  })

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
          <button type='submit' className={styles.searchBarButton}>
            <img src={searchIcon} alt='searchBar logo' />
          </button>
        </Form>
      </Formik>
    </>
  )
}
