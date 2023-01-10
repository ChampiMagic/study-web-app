// react imports
import React from 'react'

// Redux imports
import { useDispatch } from 'react-redux'

// Hooks imports
import useLogOut from '../utils/hooks/useLogOut'

// Css imports
import styles from './styles/homePage.module.css'

export default function HomePage () {
  const dispatch = useDispatch()

  return (
    <div className={styles.high_container}>
      <button onClick={() => useLogOut(dispatch)}>Log Out</button>
    </div>
  )
}
