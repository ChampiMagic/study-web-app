import React, { useState } from 'react'
// import styles from "./questionCard.module.css";
import { Card, CardContent, Typography, Button } from '@mui/material'

// mui imports
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty'
import ClearIcon from '@mui/icons-material/Clear'

// axios import
import axios from 'axios'

export default function QuestionCard ({ id, answer, question }) {
  const [flip, setFlip] = useState(false)
  const handleClick = () => {
    setFlip(!flip)
  }

  const handleDelete = async () => {
    try {
      await axios.delete('/delete-card', id)
      return (null)
    } catch (error) {
      console.error('erro al eliminar la carta')
    }
  }

  return (
    <>
      <Card
        className='frontal' sx={{
          maxWidth: 375,
          border: 1,
          p: 2,
          height: 'auto',
          boxShadow: '5px 5px 10px 2px #1C1C1C'
        }}
      >
        <ClearIcon
          sx={{
            marginLeft: '85%',
            ':hover': {
              cursor: 'pointer'
            }
          }}
          onClick={() => handleDelete()}
        />
        <CardContent>
          <Typography variant='h5' component='p'>
            {!flip ? question : answer}
          </Typography>
        </CardContent>
        <Button
          onClick={handleClick}
          size='small'
          variant='contained'
          endIcon={<ThreeSixtyIcon />}
          sx={{
            backgroundColor: '#1c1c1c',
            ':hover': {
              backgroundColor: '#363636'
            }
          }}
        >
          {!flip ? 'Ver respuesta' : 'Ver pregunta'}
        </Button>
      </Card>
    </>
  )
}
