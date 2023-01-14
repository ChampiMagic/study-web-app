import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './proyectCard.module.css'
import { Card, Typography, CardContent, CardActions } from '@mui/material'

export default function ProyectCard ({ _id, name, tag }) {
  const navigate = useNavigate()

  const handleSubmit = (id) => {
    navigate(`project/${id}`)
  }
  return (
    <>
      <Card sx={{ maxWidth: 300 }}>
        <CardContent sx={{ heigth: 400 }}>
          <Typography gutterBottom variant='h4' align='center' component='div'>
            {name || 'Proyect Name'}
          </Typography>
          <div className={styles.tag_container}>
            <h3 className={styles.tag}>{tag || 'Tag'}</h3>
          </div>
        </CardContent>
        <CardActions className={styles.button_container}>
          <button className={styles.button} onClick={() => handleSubmit(_id)}>
            Ver
          </button>
        </CardActions>
      </Card>
    </>
  )
}
