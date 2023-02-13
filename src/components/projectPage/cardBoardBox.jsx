// React imports
import * as React from 'react'

// CSS imports
import styles from './cardBoardBox.module.css'

export default function CardBoardBox ({ id, disable, days, getCard }) {
  async function ani (id) {
    document.getElementById(id).className += ' classname'
    getCard(id)

    setTimeout(() => {
      document.getElementById(id).className = 'face top'
    }, '4000')
  }

  return (
    <div className={styles.box} onClick={() => ani(id)}>
      <div className={`${styles.face} ${styles.botton}`} />
      <div className={`${styles.face} ${styles.back}`} />
      <div className={`${styles.face} ${styles.right}`} />
      <div className={`${styles.face} ${styles.left}`}>
        <div className={styles.icons}>
          <div className={styles.umbrella} />
          <div className={styles.orientation}>
            <div className={styles.base} />
          </div>
          <div className={styles.glass} />
        </div>
      </div>
      <div className={`${styles.face} ${styles.front}`}>
        <div className={styles.recycled}>
          <div className={styles.arrow} />
          <div className={styles.arrow} />
          <div className={styles.arrow} />
        </div>
        <div className={styles.label} />
      </div>
      <div className={`${styles.face} ${styles.top}`} id={id}>
        <div className={styles.cover_back} />
        <div className={styles.cover_right} />
        <div className={styles.cover_left} />
        <div className={styles.cover_front} />
      </div>
    </div>
  )
}
