// React imports
import * as React from 'react'

// MUI imports
import Button from '@mui/joy/Button'
import Input from '@mui/joy/Input'
import Modal from '@mui/joy/Modal'
import ModalDialog from '@mui/joy/ModalDialog'
import Typography from '@mui/joy/Typography'

// axios import
import HeaderConstructor from '../../utils/constructors/headerConstructor'
import axios from 'axios'

// redux import
import { changeSelectedProject } from '../../redux/slices/projectSlice'
import { useDispatch } from 'react-redux'

// Hooks imports
import { verifyAnswer } from '../../lib/verifyAnswer'

export default function PopUpCard ({ open, setOpen, card, projectId }) {
  const dispatch = useDispatch()

  const [userAnswer, setUserAnswer] = React.useState('')
  const [statusMessage, setStatusMessage] = React.useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleAnswer = async () => {
    try {
      const config = HeaderConstructor()
      // verify if answer is correct
      const { isCorrect, errorMessage } = await verifyAnswer(card.question, userAnswer, config)

      if (errorMessage) {
        setStatusMessage(errorMessage)
        return
      }

      const body = {
        cardId: card._id,
        projectId,
        isCorrect
      }
      console.log('pase')
      // logic for is correct move card
      const response = await axios.put('/move-card', body, config)
      dispatch(changeSelectedProject(response.data.body))

      setStatusMessage('')
      handleClose()
    } catch (e) {
      console.error('[Error en la llamada a move-card] ' + e)
    }
  }

  return (
    <Modal open={open}>
      <ModalDialog
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
          backgroundColor: '#FAFAFA',
          color: '#1c1c1c'
        }}
      >
        <Typography
          component='h2'
          fontSize='1.25em'
          mb='0.25em'
        >
          La pregunta de hoy es:
        </Typography>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleAnswer()
          }}
        >
          <Typography
            component='h2'
            align='center'
            style={{ wordWrap: 'break-word' }}
          >
            {/* En esta parte se muestra la pregunta que pasamos por prop */}
            {card.question}
          </Typography>

          <Input
            aria-label='empty textarea'
            placeholder='Tu respuesta es'
            style={{ minWidth: 300 }}
            onChange={(event) => setUserAnswer(event.target.value)}
          />
          {statusMessage && <p>{statusMessage}</p>}
          <br />
          <Button
            variant='outlined' color='primary' type='submit' sx={{
              transition: 'all 400ms ease',
              ':hover': {
                backgroundColor: 'tomato',
                transition: 'all 400ms ease'
              }
            }}
          >
            Enviar
          </Button>
        </form>
      </ModalDialog>
    </Modal>
  )
}
