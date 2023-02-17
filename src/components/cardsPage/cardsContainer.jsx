// react imports
import React, { useEffect, useState } from 'react'

// Redux imports
import { useDispatch, useSelector } from 'react-redux'
import { newCards } from '../../redux/slices/cardSlice.js'

// Material UI imports
import { Box, Pagination } from '@mui/material'
import { Stack } from '@mui/system'

// Components imports
import QuestionCard from '../questionCard/questionCard'

// Others imports
import HeaderConstructor from '../../utils/constructors/headerConstructor.js'
import axios from 'axios'

// Css imports
import styles from './cardsContainer.module.css'
import { useParams } from 'react-router-dom'

export default function CardsContainer () {
  const [actualPage, setActualPage] = useState(1)

  const dispatch = useDispatch()
  const globalStateCards = useSelector((state) => state.cardController)

  const { projectId } = useParams()

  const getCards = async () => {
    try {
      const config = HeaderConstructor()

      const response = await axios.get(`/card?projectId=${projectId}`, config)

      dispatch(newCards(response.data.body))
    } catch (error) {
      console.error(error)
      // add snackbar
    }
  }

  useEffect(() => {
    getCards()
  }, [])

  return (
    <Box className={styles.high_container}>
      <Box className={styles.mid_container}>

        {globalStateCards.currentCards.length
          ? globalStateCards.currentCards.map((c, i) => {
            if ((i + 1) > ((actualPage - 1) * 8) && (i + 1) < (8 * actualPage)) {
              return <QuestionCard key={c._id} id={c._id} question={c.question} answer={c.answer} />
            }

            return null
          })
          : null}
      </Box>
      {!globalStateCards.currentCards.length ? <h1 className={styles.notFound}>Not Found</h1> : null}
      <Stack spacing={2} className={styles.pagination_container}>
        <Pagination count={globalStateCards.totalPages} onChange={(e, p) => setActualPage(p)} variant='outlined' />
      </Stack>
    </Box>
  )
}
