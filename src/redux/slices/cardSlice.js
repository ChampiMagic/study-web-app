// Redux imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cards: [],
  currentCards: [],
  totalPages: 0
}

export const cardController = createSlice({
  name: 'cardController',
  initialState,
  reducers: {
    newCards: (state, action) => {
      state.cards = action.payload.cards
      state.currentCards = action.payload.cards
      state.totalPages = Math.ceil((state.currentCards.length) / 8)
    },
    addCard: (state, action) => {
      state.cards = [action.payload.cards, ...state.cards]

      state.totalPages = Math.ceil(state.currentCards.length / 8)
    },
    updateCurrentCards: (state, action) => {
      state.currentCards = action.payload.cards

      state.totalPages = Math.ceil(state.currentCards.length / 8)
    },
    deleteCards: (state) => {
      state.cards = []
      state.currentCards = []
      state.totalPages = 0
    },
    deleteCard: (state, action) => {
      const cardId = action.payload.cardId
      state.cards = state.cards.filter((c) => c._id !== cardId)
      state.currentCards = state.currentCards.filter((c) => c._id !== cardId)
      state.totalPages = Math.ceil(state.currentCards.length / 8)
    }
  }
})

export const { newCards, addCard, updateCurrentCards, deleteCards, deleteCard } = cardController.actions

export default cardController.reducer
