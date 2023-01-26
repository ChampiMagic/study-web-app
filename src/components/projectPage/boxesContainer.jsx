// React imports
import React, { useState, useEffect } from 'react'

// Style import
import styles from './boxesContainer.module.css'

// Axios import
import axios from 'axios'
import HeaderConstructor from '../../utils/constructors/headerConstructor'
import { useParams } from 'react-router-dom'

export default function BoxesContainer () {
  const [actualProject, setProject] = useState({
    name: '',
    tag: '',
    boxes: [0, 1, 2, 3]
  })

  const boxDays = [
    'preguntas para responder cada dia',
    'preguntas para responder cada 5 dias',
    'preguntas para responder cada 15 dias',
    'preguntas para responder cada 30 dias'
  ]

  const projectId = useParams()

  const [actualCard, setCard] = useState({
    question: '',
    answer: ''
  })

  const config = HeaderConstructor()

  async function getProject () {
    try {
      return await axios.get(`/project/${projectId}`, config)
    } catch (e) {
      console.error('[Error en la llamada a getProject] ' + e)
    }
  }

  async function getCard (boxId) {
    try {
      const myRandomCard = await axios.get(`/random-card/projectId=${projectId}&box=${boxId}`, config)
      setCard(myRandomCard)
      return actualCard
      // TODO Retornar el componente card aquí
    } catch (e) {
      console.error('[Error en la llamada a getCard] ' + e)
    }
  }

  useEffect(() => {
    const myStateProject = getProject()
    setProject(myStateProject)
  }, [])

  return (
    <>
      <div className={styles.projectInfo}>
        <h2>Project: {actualProject.name}</h2>
        <h3>Tag: {actualProject.tag}</h3>
      </div>
      <section className={styles.boxContainer}>
        {actualProject.boxes
          ? actualProject.boxes.map((p, id) => {
            return (
              <div
                className={styles.box}
                key={p}
                id={id}
                onClick={() => getCard(id)}
              ><p>{boxDays[p]}</p>
              </div>
            )
          })
          : null}
      </section>
    </>
  )
}
