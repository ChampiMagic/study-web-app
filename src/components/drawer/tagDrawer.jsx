import * as React from 'react'
import Box from '@mui/material/Box'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { IconButton } from '@mui/material'

// redux imports
import { useDispatch, useSelector } from 'react-redux'
import { newTags } from '../../redux/slices/tagSlice'

import { useMediaQuery } from 'react-responsive'
import HeaderConstructor from '../../utils/constructors/headerConstructor.js'

import styles from './drawer.module.css'

import { ArrowBack, BookmarkAdd, LabelImportant, Search } from '@mui/icons-material'

import { Field, Form, Formik } from 'formik'
import axios from 'axios'

export default function TagDrawer ({ handleTags }) {
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

  const dispatch = useDispatch()

  const tags = useSelector(state => state.tagController.tags)

  const [statusMessage, setStatusMessage] = React.useState('')

  const initialValue = {
    searchValue: ''
  }

  const handleSubmit = async ({ searchValue }, reset) => {
    try {
      const config = HeaderConstructor()

      const response = await axios.get(`/tags/${searchValue}`, config)

      dispatch(newTags(response.data.body.tags))

      reset()
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <Box
      sx={{ width: isMobile ? 200 : 300, height: '100vh' }}
      role='presentation'
    >
      <Box className={styles.back_btn}>
        <IconButton
          size='small'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={() => handleTags(false)}
          color='inherit'
          sx={{ fontSize: isMobile ? '1em' : '2em', margin: '.2em .1em' }}
        >
          <ArrowBack fontSize={isMobile ? '1em' : '2em'} />
        </IconButton>
        <p>Go Back</p>
      </Box>
      <Box className={styles.searchBar_container}>
        <Formik
          initialValues={initialValue}
          onSubmit={async (values, { resetForm }) => await handleSubmit(values, resetForm)}
        >
          <Form>
            <div className={styles.searchBar}>
              <IconButton aria-label='search' type='submit' alt='searchBar logo'>
                <Search />
              </IconButton>
              <Field
                type='text'
                id='searchValue'
                name='searchValue'
                label='SearchBar'
                placeholder='Search tags'
              />
            </div>
            {statusMessage ? <p className={styles.statusError}>{statusMessage}</p> : null}
          </Form>

        </Formik>

        {/* TODO: Remplace with formDialog component for creating a tag */}
        <IconButton aria-label='create-tag' alt='create tag button'>
          <BookmarkAdd />
        </IconButton>

      </Box>
      <List className={styles.list_scrollBar} style={{ height: '84%', overflow: 'hidden', overflowY: 'scroll', margin: '1em 0' }}>
        {tags.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LabelImportant />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

    </Box>
  )
}
