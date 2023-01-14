// react imports
import React from 'react'

// Components imports
import Navigator from '../components/navigator/navigator'

// Css imports
import styles from './styles/homePage.module.css'

export default function HomePage () {
  return (
    <div className={styles.high_container}>
      <Navigator dialogType={1} />
    </div>
  )
}
