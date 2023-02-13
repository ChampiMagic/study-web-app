// react imports
import React from 'react'
import BoxesContainer from '../components/projectPage/boxesContainer'

// Components imports
import Navigator from '../components/navigator/navigator'

// Css imports
import styles from './styles/projectPage.module.css'

export default function ProjectPage () {
  return (
    <div className={styles.high_container}>
      <Navigator type={2} />
      <BoxesContainer />
    </div>
  )
}
