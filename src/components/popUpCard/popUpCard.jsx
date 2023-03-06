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

export default function PopUpCard ({ open, setOpen, question, projectId, id }) {
  const dispatch = useDispatch()

  const [userAnswer, setUserAnswer] = React.useState('')

  const handleClose = () => {
    setOpen(false)
  }

  const handleAnswer = async () => {
    try {
      const config = HeaderConstructor()
      // verify if answer is correct
      const isAnswerCorrect = await verifyAnswer(question, userAnswer)

      const body = {
        cardId: id,
        projectId,
        isCorrect: isAnswerCorrect
      }
      // logic for is correct move card
      console.log(isAnswerCorrect)
      const response = await axios.put('/move-card', body, config)
      dispatch(changeSelectedProject(response.data.body))

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
          onSubmit={() => {
            handleAnswer()
          }}
        >
          <Typography
            component='h2'
            align='center'
            style={{ wordWrap: 'break-word' }}
          >
            {/* En esta parte se muestra la pregunta que pasamos por prop */}
            {question}
          </Typography>

          <Input
            aria-label='empty textarea'
            placeholder='Tu respuesta es'
            style={{ minWidth: 300 }}
            onChange={(event) => setUserAnswer(event.target.value)}
          />
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
