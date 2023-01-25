// React imports
import React from 'react'

// React Router imports
import { useNavigate } from 'react-router-dom'

// MUI imports
import { Card, Typography, CardContent, CardActions } from '@mui/material'

// Css imports
import styles from './projectCard.module.css'

export default function ProjectCard ({ id, name, tag }) {
  const navigate = useNavigate()

  const handleSubmit = (id) => {
    navigate(`/project/${id}`)
  }

  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent sx={{ heigth: 400 }}>
          <Typography gutterBottom variant='h4' align='center' component='div'>
            {name || 'Proyect Name'}
          </Typography>
          <div className={styles.tag_container}>
            <h3 className={styles.tag}>{tag.name || 'Untagged'}</h3>
          </div>
        </CardContent>
        <CardActions className={styles.button_container}>
          <button className={styles.button} onClick={() => handleSubmit(id)}>
            Ver
          </button>
        </CardActions>
      </Card>
    </>
  )
}
