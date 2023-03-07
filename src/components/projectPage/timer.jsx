/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

import styles from './timer.module.css'

const Timer = ({ deadTime, getProject }) => {
  if (!deadTime) {
    return null
  }

  const [days, setDays] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const deadline = deadTime

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now()

    setDays(Math.floor(time / (1000 * 60 * 60 * 24)))
    setHours(Math.floor((time / (1000 * 60 * 60)) % 24))
    setMinutes(Math.floor((time / 1000 / 60) % 60))
    setSeconds(Math.floor((time / 1000) % 60))

    setTimeout(() => {
      getProject()
    }, time)
  }

  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={styles.container}>
      <p className={styles.dayState}>Faltan {days} dias con {hours}:{minutes}:{seconds}</p>
    </div>
  )
}

export default Timer
