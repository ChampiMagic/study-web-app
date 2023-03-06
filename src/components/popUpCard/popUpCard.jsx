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

export default function PopUpCard ({ open, setOpen, card, projectId }) {
  const dispatch = useDispatch()
  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    try {
      setOpen(false)
      const config = HeaderConstructor()
      const body = {
        cardId: card._id,
        projectId,
        isCorrect: true
      }

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
            handleSubmit()
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
