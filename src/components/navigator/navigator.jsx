// react imports
import React from 'react'

// Material Ui imports
import { AppBar, Toolbar } from '@mui/material'

// Components imports
import FormDialogProject from '../formDialogs/project/formDialogProject'
import FormDialogCard from '../formDialogs/card/formDialogCard'
import TemporaryDrawer from '../drawer/drawer'
import SearchBar from '../searchBar/SearchBar'
import ProjectFilter from '../filter/projectFilter'

// Css imports
import styles from './navigator.module.css'

export default function Navigator ({ dialogType }) {
  return (
    <AppBar position='static' className={styles.app_bar} sx={{ bgcolor: '#fcb440', display: 'flex', justifyContent: 'center' }}>
      <Toolbar>
        <div className={styles.left_container}>
          <TemporaryDrawer type={dialogType} />

          {dialogType ? <FormDialogProject className={styles.btn_popUp} /> : <FormDialogCard className={styles.btn_popUp} />}
        </div>

        {dialogType ? <ProjectFilter /> : null}

        <SearchBar isProjectSearchBar={dialogType} />
      </Toolbar>
    </AppBar>
  )
}
