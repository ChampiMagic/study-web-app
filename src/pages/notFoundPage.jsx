// React imports
import React from 'react'

// Css imports
import styles from './styles/notFoundPage.module.css'

// Just an static 404 Not Found page
export default function notFoundPage () {
  return (
    <div className={styles.high_container}>
      <div className={styles.title_container}>
        <h1>Not Found 404</h1>
      </div>
    </div>
  )
}
