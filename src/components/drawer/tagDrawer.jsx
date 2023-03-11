// React imports
import React, { useState } from 'react'

// MUI imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { IconButton, ListItemSecondaryAction } from '@mui/material'
import { ArrowBack, DeleteOutline, LabelImportant, Search } from '@mui/icons-material'

// redux imports
import { useDispatch, useSelector } from 'react-redux'
import { deleteOneTag, newTags } from '../../redux/slices/tagSlice'
import { updateProjectsTags } from '../../redux/slices/projectSlice'

// Formik imports
import { Field, Form, Formik } from 'formik'

// Components imports
import FormDialogTag from '../formDialogs/tag/formDialogTag'

// Others imports
import { useMediaQuery } from 'react-responsive'
import HeaderConstructor from '../../utils/constructors/headerConstructor.js'
import axios from 'axios'

// CSS imports
import styles from './drawer.module.css'

export default function TagDrawer ({ handleTags }) {
  // Query creation
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })

  const dispatch = useDispatch()

  const tags = useSelector(state => state.tagController.tags)

  const [statusMessage, setStatusMessage] = useState('')

  const initialValue = {
    searchValue: ''
  }

  const handleSearch = async ({ searchValue }, reset) => {
    try {
      const config = HeaderConstructor()

      const response = await axios.get(`/search-tags/${searchValue || 'null'}`, config)

      dispatch(newTags(response.data.body))

      setStatusMessage('')

      reset()
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  const handleDelete = async (tagId) => {
    try {
      const config = HeaderConstructor()

      await axios.delete(`/delete-tag/${tagId}`, config)

      dispatch(deleteOneTag({ tagId }))

      const projectResponse = await axios.get('/projects', config)

      dispatch(updateProjectsTags(projectResponse.data.body))
    } catch (error) {
      if (error.response) setStatusMessage(error.response.data.message)
      else setStatusMessage(error.message)
    }
  }

  return (
    <Box
      sx={{
        width: isMobile ? 230 : 330,
        height: '100vh',
        overflowX: 'hidden'
      }}
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
        >
          <ArrowBack sx={{ fontSize: isMobile ? '1em' : '2em' }} />
        </IconButton>
        <p>Go Back</p>
      </Box>
      <Box className={styles.searchBar_container}>
        <Formik
          initialValues={initialValue}
          onSubmit={async (values, { resetForm }) => await handleSearch(values, resetForm)}
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

        <FormDialogTag type={1} />

      </Box>
      <List className={styles.list_container}>
        {tags.map((tag) => (
          <ListItem key={tag._id} disablePadding>

            <ListItemButton>

              <ListItemIcon>
                <LabelImportant />
              </ListItemIcon>

              <ListItemText primary={tag.name} />
            </ListItemButton>

            <ListItemSecondaryAction>
              <FormDialogTag type={0} tag={tag} />
              <IconButton edge='end' aria-label='delete' onClick={() => handleDelete(tag._id)}>
                <DeleteOutline />
              </IconButton>
            </ListItemSecondaryAction>

          </ListItem>
        ))}
      </List>

    </Box>
  )
}
