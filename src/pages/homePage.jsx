// react imports
import React from 'react'

// Components imports
import Navigator from '../components/navigator/navigator'

// Sacar ESTE import a la hora de hacer commit
import ProyectCard from '../components/proyectCard/proyectCard'

// Css imports
import styles from './styles/homePage.module.css'

export default function HomePage () {
  return (
    <div className={styles.high_container}>
      <Navigator dialogType={1} />
      <ProyectCard />
    </div>
  )
}
