// React imports
import React from 'react'

// React Router imports
import { useNavigate } from 'react-router-dom'

// MUI imports
import { Card, Typography, CardContent } from '@mui/material'

// Css imports
import styles from './projectCard.module.css'

export default function ProjectCard ({ id, name, tag }) {
  const navigate = useNavigate()

  const handleSubmit = (id) => {
    navigate(`/project/${id}`)
  }

  return (
    <>
      <Card
        sx={{
          maxWidth: 250,
          height: 'auto',
          boxShadow: '5px 5px 10px 2px #1C1C1C',
          transition: 'all 200ms ease',
          ':hover': {
            transform: 'scale(1.1)',
            transition: 'all 200ms ease',
            cursor: 'pointer'
          }
        }} onClick={() => handleSubmit(id)}
      >
        <CardContent>
          <Typography gutterBottom variant='h4' align='center' component='div' sx={{ height: 'auto', fontSize: 'xx-large' }}>
            {name || 'Proyect Name'}
          </Typography>
          <div className={styles.tag_container}>
            <h3 className={styles.tag}>{tag.name || 'Untagged'}</h3>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
