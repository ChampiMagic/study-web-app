// Redux imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tags: []
}

export const tagController = createSlice({
  name: 'tagController',
  initialState,
  reducers: {
    addTags: (state, action) => {
      state.tags = [...action.payload.tags, ...state.tags]
    },
    deleteAllTags: (state) => {
      state.tags = []
    }
  }
})

export const { addTags, deleteAllTags } = tagController.actions

export default tagController.reducer
