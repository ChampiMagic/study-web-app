import * as React from 'react'
import Box from '@mui/material/Box'

import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { Button, IconButton } from '@mui/material'

import useLogOut from '../../utils/hooks/useLogOut.js'

import { useMediaQuery } from 'react-responsive'

import styles from './drawer.module.css'

import { AccountCircle, Bookmark, Logout, SettingsApplications } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
        <IconButton
          className={styles.btn_user}
          size='small'
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          onClick={handleSettings}
          color='inherit'
          sx={{ fontSize: isMobile ? '2.5em' : '4em' }}
        >
          <AccountCircle fontSize={isMobile ? '2.5em' : '4em'} />
        </IconButton>
        <Button
          variant='text'
          size='small'
          onClick={handleSettings}
          sx={{ color: '#000', fontSize: isMobile ? '.6em' : '1em' }}
        >
          {user.email}
        </Button>
      </Box>
      <Divider />
      <List style={{ height: isMobile ? '80%' : '75%' }}>
        {['Settings', 'Tags'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={index % 2 === 0 ? handleSettings : type ? () => handleTags(true) : handleCards}>
              <ListItemIcon>
                {index % 2 === 0 ? <SettingsApplications /> : <Bookmark />}
              </ListItemIcon>
              <ListItemText primary={text} />
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
