// React imports
import * as React from 'react'

// MUI imports
import Drawer from '@mui/material/Drawer'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

// Components imports
import TagDrawer from './tagDrawer.jsx'
import GeneralDrawer from './generalDrawer.jsx'

export default function TemporaryDrawer ({ type }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [inTag, setInTag] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }

    if (!open) setInTag(false)

    setIsOpen(open)
  }

  const handleTags = (state) => {
    setInTag(state)
  }

  return (
    <>

      <IconButton
        size='large'
        edge='start'
        aria-label='menu'
        sx={{ mr: 3 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon sx={{ color: '#fff' }} />
      </IconButton>

      <Drawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
      >
        {inTag ? <TagDrawer handleTags={handleTags} /> : <GeneralDrawer type={type} handleTags={handleTags} toggleDrawer={toggleDrawer} />}
      </Drawer>

    </>
  )
}
