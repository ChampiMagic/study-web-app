// react imports
import React, { useState, useEffect } from 'react'

// Material UI imports
import { Box, Pagination } from '@mui/material'
import { Stack } from '@mui/system'

// Components imports
import ProjectCard from '../ProyectCard/projectCard.jsx'

// Others imports
import HeaderConstructor from '../../utils/constructors/headerConstructor.js'
import axios from 'axios'

// Css imports
import styles from './projectsContainer.module.css'

export default function ProjectsContainer () {
  const [projects, setProjects] = useState([])
  const [totalPages, setTotalPages] = useState(0)

  const getProjects = async (page) => {
    try {
      const config = HeaderConstructor()

      const response = await axios.get(`/projects?page=${page}&limit=6`, config)

      setProjects(response.data.body.projects)
      setTotalPages(response.data.body.totalPages)
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
        {projects.map(p => (
          <ProjectCard key={p._id} id={p._id} name={p.name} tag={p.tag} />
        ))}
      </Box>
      <Stack spacing={2} className={styles.pagination_container}>
        <Pagination count={totalPages} onChange={(e, p) => getProjects(p)} variant='outlined' />
      </Stack>
    </Box>
  )
}
