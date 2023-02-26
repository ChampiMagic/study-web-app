// React imports
import React from 'react'

// React Router imports
import { useNavigate } from 'react-router-dom'

// MUI imports
import { Card, CardMedia, Typography, CardContent } from '@mui/material'

// Css imports
import styles from './projectCard.module.css'

export default function ProjectCard ({ id, name, tag, image }) {
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
          boxShadow: '0px 1px 3px #1C1C1C',
          transition: 'all 200ms ease',
          ':hover': {
            transform: 'scale(1.1)',
            transition: 'all 200ms ease',
            cursor: 'pointer'
          }
        }} onClick={() => handleSubmit(id)}
      >
        <CardMedia
          sx={{ height: 100 }}
          image={image}
          title={name}
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant='h2' align='center' sx={{ height: 'auto', fontSize: 'x-large' }}>
            {name || 'Proyect Name'}
          </Typography>
          <div className={styles.tag_container}>
            <p className={styles.tag}>{tag.name || 'Untagged'}</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
