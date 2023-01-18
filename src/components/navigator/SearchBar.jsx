// react imports
import { React, useState } from 'react'

// Assets import
import searchIcon from '../../assets/bx-search.svg'

// Css import
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
      const URL = isProjectSearchBar ? 'proyectsByName route here' : 'cardsByName route here' // TODO!!
      const response = await axios.get(URL, {
        params: {
          name: searchValue
        }
      })
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
          <button type='submit' className={styles.searchBarButton}>
            <img src={searchIcon} alt='searchBar logo' />
          </button>
          {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
        </Form>
      </Formik>
    </>
  )
}
