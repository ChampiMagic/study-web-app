// react imports
import React, { useState } from 'react'

// Material Ui imports
import { AccountCircle } from '@mui/icons-material'
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

// Components imports
import FormDialogProject from '../formDialogs/project/formDialogProject'
// import FormDialogCard from '../formDialogs/card/formDialogCard'

// Redux imports
import { useDispatch } from 'react-redux'

// Hooks imports
import useLogOut from '../../utils/hooks/useLogOut'

// Css imports
import styles from './navigator.module.css'

export default function Navigator ({ dialogType }) {
  const dispatch = useDispatch()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position='static' className={styles.app_bar} sx={{ bgcolor: 'rgba(0, 0, 0, 0.614)', height: '5em', display: 'flex', justifyContent: 'center' }}>
      <Toolbar>
        <div className={styles.left_container}>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 3 }}
          >
            <MenuIcon />
          </IconButton>

          {/* <FormDialogCard className={styles.btn_popUp} /> */}
          {dialogType ? <FormDialogProject className={styles.btn_popUp} /> : null}

        </div>
        <div>
          <IconButton
            className={styles.btn_user}
            size='large'
            aria-label='account of current user'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'
            sx={{ fontSize: '3em' }}
          >
            <AccountCircle fontSize='3em' />
          </IconButton>
          <Menu
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={() => useLogOut(dispatch)}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}
