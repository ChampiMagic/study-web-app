import React, { useState } from 'react'
// import styles from "./questionCard.module.css";
import { Card, CardContent, Typography, Button } from '@mui/material'

import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty'

export default function QuestionCard ({ id, answer, question }) {
  const [flip, setFlip] = useState(false)
  const handleClick = () => {
    setFlip(!flip)
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
