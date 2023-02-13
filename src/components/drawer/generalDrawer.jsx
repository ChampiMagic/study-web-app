// React imports
import * as React from 'react'

// React router imports
import { useNavigate, useParams } from 'react-router-dom'

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
import { AccountCircle, Bookmark, Delete, Home, Logout, SettingsApplications, Visibility } from '@mui/icons-material'

// Components imports
import useLogOut from '../../utils/hooks/useLogOut.js'

// Other imports
import { useMediaQuery } from 'react-responsive'

// CSS imports
import styles from './drawer.module.css'
import HeaderConstructor from '../../utils/constructors/headerConstructor.js'
import axios from 'axios'

export default function GeneralDrawer ({ type, handleTags, toggleDrawer }) {
  const isMobile = useMediaQuery({ query: '(max-width: 760px)' })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { projectId } = useParams()

  const user = useSelector(state => state.userController.user)

  const handleSettings = () => {
    navigate('/profile')
  }

  const handleHome = () => {
    navigate('/home')
  }

  const handleCards = () => {
    navigate(`/cards/${projectId}`)
  }

  const handleDelete = async () => {
    try {
      const config = HeaderConstructor()

      await axios.delete(`/delete-project/${projectId}`, config)
      navigate('/home')
    } catch (e) {
      console.error('[Error en la llamada a deletePrject] ' + e)
    }
  }

  const projectDrawer = () => {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton onClick={handleTags} sx={{ fontSize: isMobile ? '.5em' : '3em' }}>
            <ListItemIcon>
              <Bookmark sx={{ fontSize: isMobile ? '.5em' : '.7em' }} />
            </ListItemIcon>
            <ListItemText primary='Tags' sx={{ fontSize: isMobile ? '.5em' : '3em' }} />
          </ListItemButton>
        </ListItem>
      </>
    )
  }

  const cardDrawer = () => {
    return (
      <>
        <ListItem disablePadding>
          <ListItemButton onClick={handleHome} sx={{ fontSize: isMobile ? '.5em' : '3em' }}>
            <ListItemIcon>
              <Home sx={{ fontSize: isMobile ? '.5em' : '.7em' }} />
            </ListItemIcon>
            <ListItemText primary='Home' sx={{ fontSize: isMobile ? '.5em' : '3em' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleCards} sx={{ fontSize: isMobile ? '.5em' : '3em' }}>
            <ListItemIcon>
              <Visibility sx={{ fontSize: isMobile ? '.5em' : '.7em' }} />
            </ListItemIcon>
            <ListItemText primary='View Cards' sx={{ fontSize: isMobile ? '.5em' : '3em' }} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleDelete} sx={{ fontSize: isMobile ? '.5em' : '3em' }}>
            <ListItemIcon>
              <Delete sx={{ fontSize: isMobile ? '.5em' : '.7em' }} />
            </ListItemIcon>
            <ListItemText primary='Delete Project' sx={{ fontSize: isMobile ? '.5em' : '3em' }} />
          </ListItemButton>
        </ListItem>
      </>
    )
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
        <ListItem disablePadding>
          <ListItemButton onClick={handleSettings} sx={{ fontSize: isMobile ? '.5em' : '3em' }}>
            <ListItemIcon>
              <SettingsApplications sx={{ fontSize: isMobile ? '.5em' : '.7em' }} />
            </ListItemIcon>
            <ListItemText primary='Profile' sx={{ fontSize: isMobile ? '.5em' : '3em' }} />
          </ListItemButton>
        </ListItem>
        {type === 0 && projectDrawer()}
        {(type === 1 || type === 2) && cardDrawer()}
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
