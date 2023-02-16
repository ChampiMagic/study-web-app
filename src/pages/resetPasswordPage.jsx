// React imports
import React from 'react'

// Css imports
import styles from './styles/resetPasswordPage.module.css'

// Others
import { useParams } from 'react-router-dom'
import EmailForm from '../components/resetPasswordPage/emailForm.jsx'
import PasswordForm from '../components/resetPasswordPage/passwordForm.jsx'

export default function ResetPasswordPage () {
  const { token } = useParams()

  return (
    <div className={styles.high_container}>
      <div className={styles.form_container}>
        {token === undefined
          ? <EmailForm />
          : <PasswordForm token={token} />}
      </div>
    </div>
  )
}
