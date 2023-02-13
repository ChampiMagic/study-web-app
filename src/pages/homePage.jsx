// react imports
import React from 'react'
import ProjectsContainer from '../components/homePage/projectsContainer'

// Components imports
import Navigator from '../components/navigator/navigator'

// Css imports
import styles from './styles/homePage.module.css'

export default function HomePage () {
  return (
    <div className={styles.high_container}>
      <Navigator type={0} />
      <ProjectsContainer />
    </div>
  )
}
