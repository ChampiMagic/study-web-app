// react imports
import React from 'react'

// MUI imports
import { IconButton } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'

// Redux imports
import { useSelector } from 'react-redux'

// Css imports
import styles from './styles/profilePage.module.css'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage () {
  const user = useSelector((state) => state.userController.user)
  const avatarUrl = 'https://media.istockphoto.com/id/1016744004/vector/profile-placeholder-image-gray-silhouette-no-photo.jpg?s=612x612&w=0&k=20&c=mB6A9idhtEtsFXphs1WVwW_iPBt37S2kJp6VpPhFeoA='
  const navigate = useNavigate()

  return (
    <div className={styles.high_container}>
      <IconButton style={{ marginLeft: '1em', marginTop: '.2em' }} onClick={() => navigate(-1)}>
        <ArrowBack style={{ fontSize: '3em' }} />
      </IconButton>
      <div className={styles.mid_container}>
        <img src={user.avatar ?? avatarUrl} alt={user.username} />
        <div className={styles.content_container}>
          <h3>Username: </h3> <p>{user.username}</p>
          <h3>Email: </h3> <p>{user.email}</p>

          <div>
            <p>Restaurar Contraseña</p>
          </div>

        </div>
      </div>
      <div className={styles.low_container}>
        <h3>Cantidad de proyectos:</h3>
        <div className={styles.counter_container}>
          <h1>{user.projects.length}</h1>
        </div>
      </div>
    </div>
  )
}
