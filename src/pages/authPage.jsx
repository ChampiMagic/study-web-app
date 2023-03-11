// React imports
import React, { useState } from 'react'

// Material UI imports
import { Switch } from '@mui/material'

// Components imports
import Login from '../components/authPage/login.jsx'
import Register from '../components/authPage/register.jsx'

// Css imports
import styles from './styles/authPage.module.css'

export default function AuthPage () {
  // We use this to toggle form rendering (between Login and Register)
  const [switcher, setSwitcher] = useState(true)

  const handleSwitch = () => {
    setSwitcher(!switcher)
  }

  return (
    <div className={styles.high_container}>
      <div className={styles.form_container}>

        <div className={styles.switch_container}>
          <label>{switcher ? 'LOGIN' : 'REGISTER'}</label>
          <Switch checked={switcher} onChange={handleSwitch} />
        </div>

        {switcher
          ? <Login />
          : <Register />}
      </div>
    </div>
  )
}
