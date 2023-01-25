// React imports
import * as React from 'react'

// React router imports
import { useNavigate } from 'react-router-dom'

// Redux imports
import { useDispatch, useSelector } from 'react-redux'

// MUI imports
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { AccountCircle, Bookmark, Logout, SettingsApplications } from '@mui/icons-material'

// Components imports
import useLogOut from '../../utils/hooks/useLogOut.js'

// Other imports
import { useMediaQuery } from 'react-responsive'

// CSS imports
import styles from './drawer.module.css'

export default function GeneralDrawer ({ type, handleTags, toggleDrawer }) {
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.userController.user)

  const handleSettings = () => {
    navigate('/profile')
  }

  const handleCards = () => {
    navigate('/cards')
  }

  return (
    <Box
      sx={{ width: isMobile ? 200 : 300, height: '100vh' }}
      role='presentation'
      onKeyDown={toggleDrawer(false)}
    >
      <Box className={styles.account_container}>

        <AccountCircle sx={{ fontSize: isMobile ? '2.5em' : '4em' }} />
        <p>{user.email}</p>

      </Box>
      <Divider />
      <List style={{ height: isMobile ? '80%' : '75%' }}>
        {['Settings', 'Tags'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={index % 2 === 0 ? handleSettings : type ? () => handleTags(true) : handleCards} sx={{ fontSize: isMobile ? '.5em' : '3em' }}>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsApplications sx={{ fontSize: isMobile ? '.5em' : '.7em' }} /> : <Bookmark sx={{ fontSize: isMobile ? '.5em' : '.7em' }} />}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ fontSize: isMobile ? '.5em' : '3em' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List style={{ backgroundColor: '#e3e3e3', padding: isMobile && '4px 8px' }}>
        <ListItem disablePadding>
          <ListItemButton onClick={() => useLogOut(dispatch)}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary='Log Out' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )
}
