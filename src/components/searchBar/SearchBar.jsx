// react imports
import { React, useState } from 'react'

// Redux imports
import { useDispatch } from 'react-redux'
import { updateCurrentProjects } from '../../redux/slices/projectSlice.js'

// @mui imports
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'

// Formik imports
import { Field, Form, Formik } from 'formik'

// Others import
import axios from 'axios'
import HeaderConstructor from '../../utils/constructors/headerConstructor'

// Css import
import styles from './searchBar.module.css'
import { updateCurrentCards } from '../../redux/slices/cardSlice.js'
import { useParams } from 'react-router-dom'

export default function SearchBar ({ type }) {
  const dispatch = useDispatch()
  const { projectId } = useParams()

  const [statusMessage, setStatusMessage] = useState('')

  const initialValue = {
    searchValue: ''
  }

  const handleSubmit = async ({ searchValue }, reset) => {
    try {
      const myHeader = HeaderConstructor()
      const URL = type === 0
        ? `/search-projects/${searchValue || 'null'}`
        : `/search-card?question=${searchValue || 'null'}&projectId=${projectId}`
      const response = await axios.get(URL, myHeader)

      if (type === 0) {
        dispatch(updateCurrentProjects(response.data.body))
      } else {
        dispatch(updateCurrentCards(response.data.body))
      }

      setStatusMessage('')

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
          <IconButton
            aria-label='search' type='submit' alt='searchBar logo' sx={{
              marginLeft: '.1em',
              ':hover': {
                bgcolor: 'white'
              }
            }}
          >
            <SearchIcon />
          </IconButton>
          <div>
            <Field
              type='text'
              id='searchValue'
              name='searchValue'
              label='SearchBar'
              placeholder='Search Here!'
            />
          </div>
          {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
        </Form>
      </Formik>
    </>
  )
}
