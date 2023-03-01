/* eslint-disable react/jsx-key */
// React imports
import React, { useState, useEffect } from 'react'

// MUI imports
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'

// Components imports
import CardBoardBox from './cardBoardBox'

// Style import
import styles from './boxesContainer.module.css'

// Axios import
import axios from 'axios'
import HeaderConstructor from '../../utils/constructors/headerConstructor'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeSelectedProject } from '../../redux/slices/projectSlice'
import { verifyAnswer } from '../../lib/verifyAnswer'

export default function BoxesContainer () {
  const actualProject = useSelector(state => state.projectController.selectedProject)
  let currentTotalCards = 0
  let totalCards = actualProject.completeBox?.length ?? 0

  actualProject.boxes?.forEach(b => {
    totalCards += b.cards.length
    currentTotalCards += b.cards.length
  })

  const dispatch = useDispatch()

  const boxDays = [
    'preguntas para responder cada dia',
    'preguntas para responder cada 5 dias',
    'preguntas para responder cada 15 dias',
    'preguntas para responder cada 30 dias'
  ]

  const { projectId } = useParams()

  const [actualCard, setCard] = useState({})

  const [userAnswer, setUserAnswer] = useState('')

  const [open, setOpen] = useState(false)

  const getProject = async () => {
    try {
      const config = HeaderConstructor()

      const response = await axios.get(`/project/${projectId}`, config)

      dispatch(changeSelectedProject(response.data.body))
    } catch (e) {
      console.error('[Error en la llamada a getProject] ' + e)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  async function getCard (boxId) {
    try {
      const config = HeaderConstructor()
      const response = await axios.get(`/random-card?projectId=${projectId}&box=${boxId}`, config)

      console.log(response.data.body)
      setCard(response.data.body.card)

      setOpen(true)
    } catch (e) {
      console.error('[Error en la llamada a getCard] ' + e)
    }
  }

  const handleAnswer = async () => {
    try {
      const config = HeaderConstructor()
      // verify if answer is correct
      const isAnswerCorrect = await verifyAnswer(actualCard.question, userAnswer)
      const body = {
        cardId: actualCard._id,
        projectId,
        isCorrect: isAnswerCorrect
      }
      console.log(isAnswerCorrect)
      const response = await axios.put('/move-card', body, config)
      dispatch(changeSelectedProject(response.data.body))

      handleClose()
    } catch (e) {
      console.error('[Error en la llamada a move-card] ' + e)
    }
  }

  useEffect(() => {
    getProject()
  }, [])

  return (
    <Box className={styles.high_container}>
      <Box className={styles.projectInfo}>
        <h2>Project: {actualProject.name ?? null}</h2>
        <h3>Tag: {actualProject.tag ? actualProject.tag.name : null}</h3>
        <h3>Tarjetas en uso: {currentTotalCards}</h3>
        <h3>Total de tarjetas: {totalCards}</h3>
      </Box>
      <section className={styles.boxContainer}>
        {actualProject.boxes
          ? actualProject.boxes.map((b, i) => {
            return (
              <CardBoardBox key={b._id} id={i} getCard={getCard} days={boxDays[i]} open={open} disable={b.isEmpty} />
            )
          })
          : null}
      </section>
      {/* CHANGE THIS DIALOG FOR THE REAL ONE */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Question</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {actualCard.question}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Answer'
            type='answer'
            fullWidth
            variant='standard'
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAnswer}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
