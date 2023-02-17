// react imports
import React from 'react'
import CardsContainer from '../components/cardsPage/cardsContainer'

// Components imports
import Navigator from '../components/navigator/navigator'

// Css imports
import styles from './styles/projectPage.module.css'

export default function CardsPage () {
  return (
    <div className={styles.high_container}>
      <Navigator type={2} />
      <CardsContainer />
    </div>
  )
}
