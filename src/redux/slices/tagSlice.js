// Redux imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tags: []
}

export const tagController = createSlice({
  name: 'tagController',
  initialState,
  reducers: {
    newTags: (state, action) => {
      state.tags = action.payload.tags
    },
    updateTags: (state, action) => {
      state.tags = [...action.payload.tags, ...state.tags]
    },
    deleteAllTags: (state) => {
      state.tags = []
    }
  }
})

export const { newTags, updateTags, deleteAllTags } = tagController.actions

export default tagController.reducer
