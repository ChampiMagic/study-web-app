// react imports
import React, { useEffect, useState } from 'react'

// Redux imports
import { useDispatch, useSelector } from 'react-redux'
import { newProjects } from '../../redux/slices/projectSlice.js'
import { newTags } from '../../redux/slices/tagSlice.js'

// Material UI imports
import { Box, Pagination } from '@mui/material'
import { Stack } from '@mui/system'

// Components imports
import ProjectCard from '../projectCard/projectCard.jsx'

// Others imports
import HeaderConstructor from '../../utils/constructors/headerConstructor.js'
import axios from 'axios'

// Css imports
import styles from './projectsContainer.module.css'

export default function ProjectsContainer () {
  const [actualPage, setActualPage] = useState(1)

  const dispatch = useDispatch()
  const globalStateProject = useSelector((state) => state.projectController)

  const getProjects = async () => {
    try {
      const config = HeaderConstructor()

      const response = await axios.get('/projects', config)

      dispatch(newProjects(response.data.body))
    } catch (error) {
      console.error(error)
      // add snackbar
    }
  }

  const getTags = async () => {
    try {
      const config = HeaderConstructor()

      const response = await axios.get('/tags', config)

      dispatch(newTags(response.data.body))
    } catch (error) {
      console.error(error)
      // add snackbar
    }
  }

  useEffect(() => {
    getProjects()
    getTags()
  }, [])

  return (
    <Box className={styles.high_container}>
      <Box className={styles.mid_container}>

        {globalStateProject.currentProjects.length
          ? globalStateProject.currentProjects.map((p, i) => {
            if ((i + 1) > ((actualPage - 1) * 8) && (i + 1) < (8 * actualPage)) {
              return <ProjectCard key={p._id} id={p._id} name={p.name} tag={p.tag} />
            }

            return null
          })
          : null}
      </Box>
      {!globalStateProject.currentProjects.length ? <h1 className={styles.notFound}>Not Found</h1> : null}
      <Stack spacing={2} className={styles.pagination_container}>
        <Pagination count={globalStateProject.totalPages} onChange={(e, p) => setActualPage(p)} variant='outlined' />
      </Stack>
    </Box>
  )
}
