// react imports
import React, { useEffect } from 'react'

// Redux imports
import { useDispatch, useSelector } from 'react-redux'
import { newProjects } from '../../redux/slices/projectSlice.js'

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
  const dispatch = useDispatch()
  const globalStateProject = useSelector((state) => state.projectController)
  const getProjects = async (page) => {
    try {
      const config = HeaderConstructor()
      const response = await axios.get(`/projects?page=${page}&limit=8`, config)

      dispatch(newProjects(response.data.body))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProjects(1)
  }, [])

  return (
    <Box className={styles.high_container}>
      <Box className={styles.mid_container}>
        {globalStateProject.projects.map(p => (
          <ProjectCard key={p._id} id={p._id} name={p.name} tag={p.tag} />
        ))}
      </Box>
      <Stack spacing={2} className={styles.pagination_container}>
        <Pagination count={globalStateProject.totalPages} onChange={(e, p) => getProjects(p)} variant='outlined' />
      </Stack>
    </Box>
  )
}
